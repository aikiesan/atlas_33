# Atlas 3+3 - Quick Start Guide

Get the Atlas 3+3 platform running locally in under 10 minutes.

## Prerequisites

Ensure you have installed:
- **Node.js** 18+ and npm ([nodejs.org](https://nodejs.org))
- **Python** 3.11+ ([python.org](https://python.org))
- **PostgreSQL** 15+ ([postgresql.org](https://postgresql.org)) OR use Supabase cloud

---

## Step 1: Clone and Setup

```bash
cd ATLAS_3_3
```

---

## Step 2: Database Setup

### Option A: Local PostgreSQL

```bash
# Create database
createdb atlas33

# Enable PostGIS extension
psql atlas33 -c "CREATE EXTENSION postgis;"
```

### Option B: Supabase (Cloud)

1. Go to [supabase.com](https://supabase.com) and create project
2. Enable PostGIS extension in dashboard
3. Copy connection string from Settings → Database

---

## Step 3: Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
```

### Edit `backend/.env`:

```env
# For local PostgreSQL:
DATABASE_URL=postgresql://username:password@localhost:5432/atlas33

# For Supabase:
DATABASE_URL=postgresql://postgres:[password]@[host]:5432/postgres

SECRET_KEY=your-secret-key-minimum-32-characters-long
ADMIN_EMAIL=admin@example.com
FRONTEND_URL=http://localhost:5173
CORS_ORIGINS=http://localhost:5173
```

### Run migrations:

```bash
alembic upgrade head
```

### Create admin user:

```bash
python -c "
from app.core.database import SessionLocal
from app.core.security import get_password_hash
from app.models.user import User, UserRole
import uuid

db = SessionLocal()
admin = User(
    id=uuid.uuid4(),
    email='admin@uia.org',
    hashed_password=get_password_hash('admin123'),
    role=UserRole.ADMIN
)
db.add(admin)
db.commit()
print('✅ Admin user created: admin@uia.org / admin123')
"
```

### Start backend:

```bash
uvicorn app.main:app --reload
```

Backend runs at: **http://localhost:8000**

API docs at: **http://localhost:8000/docs**

---

## Step 4: Frontend Setup

Open a **new terminal**:

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs at: **http://localhost:5173**

---

## Step 5: Test the Application

### Test Public Dashboard

1. Open browser: `http://localhost:5173`
2. You should see the landing page
3. Click "Dashboard" - it will be empty initially

### Test Project Submission

1. Click "Submit Project"
2. Fill out the form with test data
3. Submit
4. Project will be in "submitted" status

### Test Admin Review

1. Login at: `http://localhost:5173/admin/login`
   - Email: `admin@uia.org`
   - Password: `admin123`
2. View pending projects
3. Approve the test project
4. Return to dashboard - project now appears!

---

## Project Structure

```
ATLAS_3_3/
├── backend/                    # FastAPI backend
│   ├── alembic/               # Database migrations
│   ├── app/
│   │   ├── api/               # API endpoints
│   │   │   ├── auth.py        # Authentication routes
│   │   │   ├── projects.py    # Public project submission
│   │   │   ├── dashboard.py   # Dashboard data/analytics
│   │   │   └── admin.py       # Admin review workflow
│   │   ├── core/              # Core functionality
│   │   │   ├── config.py      # Settings
│   │   │   ├── database.py    # DB connection
│   │   │   ├── security.py    # Auth/passwords
│   │   │   └── deps.py        # Dependencies
│   │   ├── models/            # SQLAlchemy models
│   │   │   ├── user.py
│   │   │   └── project.py
│   │   ├── schemas/           # Pydantic schemas
│   │   │   ├── user.py
│   │   │   └── project.py
│   │   └── main.py            # FastAPI app
│   ├── requirements.txt
│   └── .env
│
├── frontend/                   # React + Vite frontend
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── common/        # Buttons, inputs, etc.
│   │   │   ├── dashboard/     # Map, charts, filters
│   │   │   ├── forms/         # Project submission form
│   │   │   └── layout/        # Header, sidebar, footer
│   │   ├── pages/             # Page components
│   │   │   ├── public/        # Landing, dashboard
│   │   │   └── admin/         # Review queue, project edit
│   │   ├── services/          # API calls
│   │   ├── types/             # TypeScript types
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── .env
│
├── README.md                   # Project overview
├── DEPLOYMENT.md              # Production deployment guide
└── QUICKSTART.md              # This file
```

---

## Common Commands

### Backend

```bash
# Start server
uvicorn app.main:app --reload

# Create migration
alembic revision --autogenerate -m "description"

# Run migrations
alembic upgrade head

# Rollback migration
alembic downgrade -1

# Run tests
pytest
```

### Frontend

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

---

## API Endpoints Overview

### Public Endpoints

- `POST /api/projects/submit` - Submit new project
- `GET /api/projects/{id}` - Get approved project
- `GET /api/dashboard/kpis` - Dashboard metrics
- `GET /api/dashboard/projects` - List approved projects
- `GET /api/dashboard/map-markers` - Map markers
- `GET /api/dashboard/analytics/*` - Various analytics

### Admin Endpoints (Require Auth)

- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Create admin user
- `GET /api/admin/pending-projects` - Review queue
- `GET /api/admin/projects/{id}` - Get any project
- `PATCH /api/admin/projects/{id}` - Edit project
- `POST /api/admin/projects/{id}/approve` - Approve
- `POST /api/admin/projects/{id}/reject` - Reject
- `POST /api/admin/projects/{id}/request-changes` - Request changes

Full API documentation: **http://localhost:8000/docs**

---

## Database Schema

### Tables

- **users** - Admin/reviewer accounts
- **projects** - Main project data
- **project_sdgs** - SDG associations
- **project_typologies** - Typology associations
- **project_requirements** - Requirement associations
- **project_images** - Image URLs

---

## Next Steps

1. **Customize UI**: Edit components in `frontend/src/components/`
2. **Add Features**: Extend API in `backend/app/api/`
3. **Configure Email**: Set up SendGrid/Resend for notifications
4. **Deploy**: Follow `DEPLOYMENT.md` for production deployment
5. **Add Content**: Update landing page content
6. **Custom Domain**: Configure your domain in Vercel/Render

---

## Troubleshooting

### Backend Issues

**Database connection error**
- Verify DATABASE_URL in `.env`
- Ensure PostgreSQL is running
- Check database exists and PostGIS is enabled

**ModuleNotFoundError**
- Activate virtual environment
- Run `pip install -r requirements.txt`

**Alembic errors**
- Delete `alembic/versions/*.py` files and regenerate
- Check database connection

### Frontend Issues

**Module not found**
- Run `npm install` again
- Delete `node_modules` and reinstall

**API connection error**
- Verify backend is running
- Check `VITE_API_URL` in `.env`
- Check browser console for CORS errors

**Blank page**
- Check browser console for errors
- Verify Vite is running properly
- Try clearing browser cache

---

## Development Tips

1. **Hot Reload**: Both frontend and backend auto-reload on code changes
2. **API Testing**: Use FastAPI docs at `/docs` for quick API testing
3. **Database Inspection**: Use tools like pgAdmin or DBeaver
4. **React DevTools**: Install browser extension for debugging
5. **Logging**: Check terminal output for errors and logs

---

## Sample Test Data

Use this data for testing project submission:

**Project Name**: Solar-Powered Community Center
**Organization**: Green Cities Initiative
**Contact**: John Smith
**Email**: john@greencities.org
**Status**: In Progress
**Funding Needed**: 500000
**Region**: Section I - Western Europe
**City**: Amsterdam
**Country**: Netherlands
**Latitude**: 52.3676
**Longitude**: 4.9041
**SDGs**: 7, 11, 13
**Typology**: Civic & Government

---

## Support

- **Issues**: Check terminal logs and browser console
- **Documentation**: See README.md and DEPLOYMENT.md
- **API Reference**: http://localhost:8000/docs
- **Database**: Use pgAdmin or similar tool to inspect

---

**You're all set! 🚀**

The application should now be running locally. Start by submitting a test project, then log in as admin to review and approve it!
