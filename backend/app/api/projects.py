from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Optional
from uuid import UUID
from ..core.database import get_db
from ..models.project import (
    Project, ProjectSDG, ProjectTypology,
    ProjectRequirement, ProjectImage, WorkflowStatus
)
from ..schemas.project import ProjectCreate, ProjectResponse

router = APIRouter()


@router.post("/submit", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
async def submit_project(project_data: ProjectCreate, db: Session = Depends(get_db)):
    """Submit a new project (public endpoint)"""

    # Create main project
    new_project = Project(
        organization_name=project_data.organization_name,
        contact_person=project_data.contact_person,
        contact_email=project_data.contact_email,
        project_name=project_data.project_name,
        project_status=project_data.project_status,
        workflow_status=WorkflowStatus.SUBMITTED,
        funding_needed=project_data.funding_needed,
        uia_region=project_data.uia_region,
        city=project_data.city,
        country=project_data.country,
        latitude=project_data.latitude,
        longitude=project_data.longitude,
        brief_description=project_data.brief_description,
        detailed_description=project_data.detailed_description,
        success_factors=project_data.success_factors,
        other_requirement_text=project_data.other_requirement_text,
    )

    # Coordinates are stored as latitude/longitude floats
    # (PostGIS Geography column removed for SQLite compatibility)

    db.add(new_project)
    db.flush()  # Get the project ID

    # Add SDGs
    for sdg_number in project_data.sdgs:
        sdg = ProjectSDG(project_id=new_project.id, sdg_number=sdg_number)
        db.add(sdg)

    # Add typologies
    for typology in project_data.typologies:
        typ = ProjectTypology(project_id=new_project.id, typology=typology)
        db.add(typ)

    # Add funding requirements
    for req in project_data.funding_requirements:
        requirement = ProjectRequirement(
            project_id=new_project.id,
            requirement_type='funding',
            requirement=req
        )
        db.add(requirement)

    # Add government requirements
    for req in project_data.government_requirements:
        requirement = ProjectRequirement(
            project_id=new_project.id,
            requirement_type='government',
            requirement=req
        )
        db.add(requirement)

    # Add other requirements
    for req in project_data.other_requirements:
        requirement = ProjectRequirement(
            project_id=new_project.id,
            requirement_type='other',
            requirement=req
        )
        db.add(requirement)

    # Add images
    for idx, image_url in enumerate(project_data.image_urls):
        image = ProjectImage(
            project_id=new_project.id,
            image_url=image_url,
            display_order=idx
        )
        db.add(image)

    db.commit()
    db.refresh(new_project)

    # TODO: Send email notification to admin

    return _format_project_response(new_project)


@router.get("/{project_id}", response_model=ProjectResponse)
async def get_project(project_id: UUID, db: Session = Depends(get_db)):
    """Get a single project by ID (public if approved)"""
    project = db.query(Project).filter(Project.id == project_id).first()

    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )

    # Only return approved projects to public
    if project.workflow_status != WorkflowStatus.APPROVED:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )

    return _format_project_response(project)


def _format_project_response(project: Project) -> dict:
    """Helper to format project with related data"""
    return {
        "id": project.id,
        "project_name": project.project_name,
        "organization_name": project.organization_name,
        "contact_person": project.contact_person,
        "contact_email": project.contact_email,
        "project_status": project.project_status.value,
        "workflow_status": project.workflow_status.value,
        "funding_needed": project.funding_needed,
        "funding_spent": project.funding_spent,
        "uia_region": project.uia_region.value,
        "city": project.city,
        "country": project.country,
        "latitude": project.latitude,
        "longitude": project.longitude,
        "brief_description": project.brief_description,
        "detailed_description": project.detailed_description,
        "success_factors": project.success_factors,
        "typologies": [t.typology for t in project.typologies],
        "funding_requirements": [
            r.requirement for r in project.requirements if r.requirement_type == 'funding'
        ],
        "government_requirements": [
            r.requirement for r in project.requirements if r.requirement_type == 'government'
        ],
        "other_requirements": [
            r.requirement for r in project.requirements if r.requirement_type == 'other'
        ],
        "other_requirement_text": project.other_requirement_text,
        "sdgs": [s.sdg_number for s in project.sdgs],
        "image_urls": [img.image_url for img in sorted(project.images, key=lambda x: x.display_order)],
        "rejection_reason": project.rejection_reason,
        "reviewer_notes": project.reviewer_notes,
        "created_at": project.created_at,
        "updated_at": project.updated_at,
    }
