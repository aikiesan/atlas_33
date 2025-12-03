#!/usr/bin/env python3
"""
Import real-world SDG projects from draft_33_Atlas into Atlas 3+3 database
Converts project data to match our new schema
"""

import sys
import uuid
from datetime import datetime
from pathlib import Path

# Add app directory to path
sys.path.insert(0, str(Path(__file__).parent))

from app.core.database import SessionLocal
from app.models.project import (
    Project, ProjectSDG, ProjectTypology, ProjectRequirement, ProjectImage,
    ProjectStatus, WorkflowStatus, UIARegion
)

# Real-world SDG projects data
PROJECTS_DATA = [
    {
        "project_name": "Barcelona Superblocks: Urban Regeneration for Livable Streets",
        "funding_needed": 12500000,
        "funding_spent": 11200000,
        "uia_region": "Section I - Western Europe",
        "city": "Barcelona",
        "country": "Spain",
        "latitude": 41.3851,
        "longitude": 2.1734,
        "organization_name": "Barcelona City Council - Urban Ecology Agency",
        "contact_person": "Pere Martínez",
        "contact_email": "pmartinez@bcn.cat",
        "brief_description": "Transforming city blocks into pedestrian-priority zones to reduce traffic, improve air quality, and create vibrant community spaces.",
        "detailed_description": "The Barcelona Superblocks (Superilles) initiative reclaims street space from cars and returns it to residents. Each superblock encompasses nine city blocks where through-traffic is restricted, speed limits are reduced to 10-20 km/h, and streets are redesigned as shared spaces with greenery, play areas, and community gathering spots. The project has dramatically reduced air pollution, noise levels, and traffic accidents while increasing walking, cycling, and community interaction. Since implementation began in 2016, the city has created over 6 superblocks with plans for 500+ across Barcelona by 2030.",
        "success_factors": "Strong political leadership from Barcelona City Council; Co-design process with local residents; Phased implementation starting with low-cost tactical interventions; Integration with broader sustainable mobility strategy; Robust data collection showing measurable benefits; International recognition bringing additional funding and technical support.",
        "project_status": "Implemented",
        "sdgs": [11, 13, 3],
        "typologies": ["Public Realm & Urban Landscape", "Infrastructure & Utilities"],
        "funding_requirements": ["Public Funding / Government Grants"],
        "government_requirements": ["Local / Municipal Support & Endorsement", "Favorable Policies or Regulations"],
        "other_requirements": ["Strong Project Leadership & Management"],
        "image_urls": []
    },
    {
        "project_name": "Medellín Urban Acupuncture: Library Parks in Informal Settlements",
        "funding_needed": 8750000,
        "funding_spent": 8200000,
        "uia_region": "Section V - Americas",
        "city": "Medellín",
        "country": "Colombia",
        "latitude": 6.2442,
        "longitude": -75.5812,
        "organization_name": "Municipality of Medellín - Urban Innovation Department",
        "contact_person": "Carlos Restrepo",
        "contact_email": "crestrepo@medellin.gov.co",
        "brief_description": "Strategic placement of world-class library parks in marginalized neighborhoods to catalyze social transformation and urban renewal.",
        "detailed_description": "Medellín's Library Parks (Parques Biblioteca) represent urban acupuncture at its finest - placing exceptional public architecture and programming in the city's most challenged neighborhoods. Each library park combines a state-of-the-art library with community spaces, educational programs, and public realm improvements. The España Library Park, built in a former conflict zone, has become a symbol of urban transformation. These projects have reduced violence, increased educational attainment, and sparked complementary investments in public space, housing, and transportation infrastructure throughout surrounding communities.",
        "success_factors": "Political commitment to equity-focused urban investment; Architectural excellence creating neighborhood pride; Comprehensive programming beyond just books; Strategic location selection in areas of greatest need; Integration with broader urban mobility projects; Strong partnerships with local community organizations; Sustained investment in programming and maintenance.",
        "project_status": "Implemented",
        "sdgs": [4, 10, 11, 16],
        "typologies": ["Educational", "Public Realm & Urban Landscape", "Cultural & Heritage"],
        "funding_requirements": ["Public Funding / Government Grants"],
        "government_requirements": ["Local / Municipal Support & Endorsement"],
        "other_requirements": ["Strong Project Leadership & Management", "Media Coverage & Public Awareness"],
        "image_urls": []
    },
    {
        "project_name": "Copenhagen District Heating: City-Wide Renewable Energy Distribution",
        "funding_needed": 2100000000,
        "funding_spent": 1950000000,
        "uia_region": "Section I - Western Europe",
        "city": "Copenhagen",
        "country": "Denmark",
        "latitude": 55.6761,
        "longitude": 12.5683,
        "organization_name": "Copenhagen District Heating (HOFOR)",
        "contact_person": "Morten Stobbe",
        "contact_email": "mstobbe@hofor.dk",
        "brief_description": "Comprehensive district heating network serving 98% of Copenhagen with renewable energy, eliminating individual heating systems and dramatically reducing carbon emissions.",
        "detailed_description": "Copenhagen operates one of the world's most comprehensive district heating systems, providing space heating and hot water to 98% of the city through an underground network of insulated pipes carrying hot water from centralized renewable energy plants. The system has evolved from waste-to-energy incineration plants to incorporate geothermal, biomass, solar thermal, and heat pumps. This infrastructure eliminates the need for individual heating systems in buildings, creates massive efficiency gains, and has been crucial to Copenhagen's goal of carbon neutrality by 2025.",
        "success_factors": "Long-term municipal ownership and planning (started in 1920s); Gradual expansion and technology evolution; Strong regulatory framework requiring connection; Heat price stability and consumer benefit; Integration with waste management and renewable energy strategy; Continuous innovation in heat sources and efficiency; Replicable model being exported globally.",
        "project_status": "Implemented",
        "sdgs": [7, 11, 13],
        "typologies": ["Infrastructure & Utilities"],
        "funding_requirements": ["Public Funding / Government Grants"],
        "government_requirements": ["National Government Support & Political Will", "Favorable Policies or Regulations"],
        "other_requirements": ["Strong Project Leadership & Management"],
        "image_urls": []
    },
    {
        "project_name": "Singapore Vertical Farming: 30x30 Food Security Initiative",
        "funding_needed": 45000000,
        "funding_spent": 38000000,
        "uia_region": "Section IV - Asia & Pacific",
        "city": "Singapore",
        "country": "Singapore",
        "latitude": 1.3521,
        "longitude": 103.8198,
        "organization_name": "Singapore Food Agency & Sky Greens Pte Ltd",
        "contact_person": "Dr. Lim Wei Ming",
        "contact_email": "wei_ming.lim@sfa.gov.sg",
        "brief_description": "Pioneering vertical farming technologies to achieve 30% domestic food production by 2030 in land-scarce Singapore.",
        "detailed_description": "Singapore's 30x30 initiative aims to produce 30% of the nation's nutritional needs locally by 2030, despite having less than 1% of land available for agriculture. The program focuses on high-tech vertical farming, aquaponics, and controlled environment agriculture. Sky Greens operates the world's first commercial vertical farm, producing vegetables in A-frame aluminum towers that use 95% less water and pesticides than traditional farming.",
        "success_factors": "Government-led strategic planning and financial support; Strong R&D partnerships with universities; Regulatory sandbox for food technology innovation; Focus on high-value crops suited to urban farming; Consumer education and market development; Integration with broader smart city initiatives; Technology transfer and export potential.",
        "project_status": "In Progress",
        "sdgs": [2, 9, 11, 12],
        "typologies": ["Industrial & Logistics", "Infrastructure & Utilities"],
        "funding_requirements": ["Public Funding / Government Grants", "Private Investment / Corporate Sponsorship"],
        "government_requirements": ["National Government Support & Political Will"],
        "other_requirements": ["Strong Project Leadership & Management"],
        "image_urls": []
    },
    {
        "project_name": "Kigali Master Plan: Africa's Model Sustainable City",
        "funding_needed": 3200000000,
        "funding_spent": 1800000000,
        "uia_region": "Section III - Middle East & Africa",
        "city": "Kigali",
        "country": "Rwanda",
        "latitude": -1.9441,
        "longitude": 30.0619,
        "organization_name": "City of Kigali & Rwanda Development Board",
        "contact_person": "Pudence Rubingisa",
        "contact_email": "prubingisa@kigalicity.gov.rw",
        "brief_description": "Comprehensive urban master plan transforming Kigali into a green, inclusive, and resilient model city for Africa.",
        "detailed_description": "Kigali's 2040 Master Plan represents comprehensive urban transformation, building on Rwanda's remarkable post-genocide recovery. The plan emphasizes green building standards, mixed-use development, public transportation, affordable housing, and preservation of the city's unique hillside topography. Key initiatives include: mandatory green building certification, BRT system, wetland conservation, waste-to-energy plants, and affordable housing cooperatives.",
        "success_factors": "Strong national political commitment and governance; Clear vision and long-term planning; Integration of environmental protection with development; Emphasis on citizen participation and transparency; Strategic partnerships with international development organizations; Focus on building local capacity and institutions; Zero tolerance for corruption enabling effective implementation.",
        "project_status": "In Progress",
        "sdgs": [11, 13, 16, 10],
        "typologies": ["Infrastructure & Utilities", "Public Realm & Urban Landscape", "Residential"],
        "funding_requirements": ["Public Funding / Government Grants", "International Aid / Development Grants"],
        "government_requirements": ["National Government Support & Political Will", "Local / Municipal Support & Endorsement"],
        "other_requirements": ["Strong Project Leadership & Management"],
        "image_urls": []
    },
    {
        "project_name": "Vienna Social Housing: 100 Years of Inclusive Urban Development",
        "funding_needed": 850000000,
        "funding_spent": 820000000,
        "uia_region": "Section I - Western Europe",
        "city": "Vienna",
        "country": "Austria",
        "latitude": 48.2082,
        "longitude": 16.3738,
        "organization_name": "Wiener Wohnen (Vienna Housing Authority)",
        "contact_person": "Kathrin Gaál",
        "contact_email": "kathrin.gaal@wien.gv.at",
        "brief_description": "Century-long municipal housing program providing affordable, high-quality homes to 60% of Vienna's population.",
        "detailed_description": "Vienna's social housing program, dating to the 1920s, provides affordable rental housing to approximately 600,000 residents - nearly 60% of the city's population. Unlike public housing in many cities, Vienna's Gemeindebau includes middle-class residents and maintains high architectural and environmental standards. Recent projects emphasize energy efficiency, community facilities, and mixed-income integration.",
        "success_factors": "Century of consistent political commitment across different governments; Sustainable financing through dedicated housing tax; High architectural and construction standards; Mixed-income integration preventing stigmatization; Strong tenant rights and security; Continuous innovation in sustainable building practices.",
        "project_status": "Implemented",
        "sdgs": [11, 10, 1],
        "typologies": ["Residential"],
        "funding_requirements": ["Public Funding / Government Grants"],
        "government_requirements": ["National Government Support & Political Will", "Favorable Policies or Regulations"],
        "other_requirements": ["Strong Project Leadership & Management"],
        "image_urls": []
    },
    {
        "project_name": "Curitiba Bus Rapid Transit: Pioneering Sustainable Urban Mobility",
        "funding_needed": 125000000,
        "funding_spent": 118000000,
        "uia_region": "Section V - Americas",
        "city": "Curitiba",
        "country": "Brazil",
        "latitude": -25.4284,
        "longitude": -49.2733,
        "organization_name": "URBS (Urbanização de Curitiba)",
        "contact_person": "Roberto Gregório",
        "contact_email": "rgregorio@urbs.curitiba.pr.gov.br",
        "brief_description": "World's first Bus Rapid Transit system, serving 85% of commuters and reducing car dependency while spurring sustainable urban development.",
        "detailed_description": "Curitiba pioneered Bus Rapid Transit (BRT) in the 1970s, creating a metro-quality bus system that has become a global model. The system features dedicated bus lanes, metro-style stations, articulated buses, and integrated fare payment. BRT serves 2.3 million passengers daily - 85% of the metropolitan area's public transport users. The system has reduced car dependency, improved air quality, and guided urban development along transit corridors.",
        "success_factors": "Visionary planning leadership (Mayor Jamie Lerner); Integration of transportation with urban development policy; Phased implementation allowing system refinement; Strong political continuity enabling long-term investment; Innovative design making bus travel aspirational rather than stigmatized; Cost-effectiveness compared to rail alternatives.",
        "project_status": "Implemented",
        "sdgs": [11, 13, 9],
        "typologies": ["Infrastructure & Utilities"],
        "funding_requirements": ["Public Funding / Government Grants"],
        "government_requirements": ["Local / Municipal Support & Endorsement"],
        "other_requirements": ["Strong Project Leadership & Management"],
        "image_urls": []
    },
]


def import_projects():
    """Import all projects into the database"""
    db = SessionLocal()

    try:
        print(f"Starting import of {len(PROJECTS_DATA)} projects...")

        for idx, project_data in enumerate(PROJECTS_DATA, 1):
            print(f"\n[{idx}/{len(PROJECTS_DATA)}] Importing: {project_data['project_name']}")

            # Create project
            project = Project(
                organization_name=project_data["organization_name"],
                contact_person=project_data["contact_person"],
                contact_email=project_data["contact_email"],
                project_name=project_data["project_name"],
                project_status=ProjectStatus(project_data["project_status"]),
                workflow_status=WorkflowStatus.APPROVED,  # All are approved
                funding_needed=project_data["funding_needed"],
                funding_spent=project_data["funding_spent"],
                uia_region=UIARegion(project_data["uia_region"]),
                city=project_data["city"],
                country=project_data["country"],
                latitude=project_data["latitude"],
                longitude=project_data["longitude"],
                brief_description=project_data["brief_description"],
                detailed_description=project_data["detailed_description"],
                success_factors=project_data["success_factors"],
            )

            db.add(project)
            db.flush()  # Get the project ID

            # Add SDGs
            for sdg_num in project_data["sdgs"]:
                sdg = ProjectSDG(project_id=project.id, sdg_number=sdg_num)
                db.add(sdg)

            # Add typologies
            for typology in project_data["typologies"]:
                typ = ProjectTypology(project_id=project.id, typology=typology)
                db.add(typ)

            # Add funding requirements
            for req in project_data.get("funding_requirements", []):
                requirement = ProjectRequirement(
                    project_id=project.id,
                    requirement_type='funding',
                    requirement=req
                )
                db.add(requirement)

            # Add government requirements
            for req in project_data.get("government_requirements", []):
                requirement = ProjectRequirement(
                    project_id=project.id,
                    requirement_type='government',
                    requirement=req
                )
                db.add(requirement)

            # Add other requirements
            for req in project_data.get("other_requirements", []):
                requirement = ProjectRequirement(
                    project_id=project.id,
                    requirement_type='other',
                    requirement=req
                )
                db.add(requirement)

            # Add images (if any)
            for idx, image_url in enumerate(project_data.get("image_urls", [])):
                image = ProjectImage(
                    project_id=project.id,
                    image_url=image_url,
                    display_order=idx
                )
                db.add(image)

            print(f"OK - Imported with {len(project_data['sdgs'])} SDGs, {len(project_data['typologies'])} typologies")

        db.commit()
        print(f"\nSuccessfully imported {len(PROJECTS_DATA)} projects!")

        # Print summary
        print("\n" + "="*60)
        print("IMPORT SUMMARY")
        print("="*60)
        total_projects = db.query(Project).count()
        approved_projects = db.query(Project).filter(Project.workflow_status == WorkflowStatus.APPROVED).count()
        print(f"Total projects in database: {total_projects}")
        print(f"Approved projects: {approved_projects}")

        # Show by region
        print("\nProjects by region:")
        for region in UIARegion:
            count = db.query(Project).filter(Project.uia_region == region).count()
            if count > 0:
                print(f"  {region.value}: {count}")

    except Exception as e:
        db.rollback()
        print(f"\nERROR - Error importing projects: {e}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    print("Atlas 3+3 - Project Data Import")
    print("="*60)
    import_projects()
