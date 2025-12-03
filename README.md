# Atlas 3+3 - Sustainable Development Projects Platform

A curated atlas of sustainable development projects managed by the UIA (Union of International Architects), featuring project submission, review workflow, and interactive global dashboard.

## 🎯 Purpose

Atlas 3+3 enables:
1. **Public Dashboard**: Interactive map, analytics, and searchable database of approved sustainable development projects
2. **Submission Pipeline**: Partners submit projects → UIA reviews → Published to dashboard

## 🏗️ Tech Stack

### Frontend
- **React** 18+ with TypeScript
- **Vite** (build tool)
- **Tailwind CSS** (styling)
- **Recharts** (analytics charts)
- **Leaflet** + OpenStreetMap (interactive maps)
- **React Router** (navigation)
- **Axios** (API calls)

### Backend
- **FastAPI** (Python 3.11+)
- **SQLAlchemy** (ORM)
- **Pydantic** (validation)
- **Alembic** (migrations)
- **python-jose** (JWT auth)
- **Passlib** (password hashing)

### Database
- **PostgreSQL** 15+ (Supabase)
- **PostGIS** extension (geospatial queries)

### Hosting (Free Tier)
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: Supabase
- **Email**: SendGrid or Resend

## 📁 Project Structure

```
ATLAS_3_3/
├── frontend/                 # React + Vite application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service layer
│   │   ├── hooks/           # Custom React hooks
│   │   ├── utils/           # Helper functions
│   │   ├── types/           # TypeScript types
│   │   └── App.tsx
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                  # FastAPI application
│   ├── app/
│   │   ├── api/             # API routes
│   │   ├── models/          # SQLAlchemy models
│   │   ├── schemas/         # Pydantic schemas
│   │   ├── services/        # Business logic
│   │   ├── core/            # Config, security, deps
│   │   └── main.py
│   ├── alembic/             # Database migrations
│   ├── requirements.txt
│   └── .env.example
│
├── docs/                     # Documentation
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.11+
- PostgreSQL 15+ (or Supabase account)

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your backend API URL
npm run dev
```

Frontend runs on `http://localhost:5173`

### Backend Setup

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env
# Edit .env with database credentials

# Run migrations
alembic upgrade head

# Start server
uvicorn app.main:app --reload
```

Backend runs on `http://localhost:8000`

## 🗄️ Database Schema

### Core Tables
- **users**: Admin/reviewer accounts (email/password auth)
- **projects**: Main project data
- **project_sdgs**: Many-to-many SDG links
- **project_typologies**: Many-to-many typology links
- **project_requirements**: Many-to-many requirement links
- **project_images**: Image URLs for each project
- **audit_logs**: Moderation action history

### Project Workflow States
- `submitted`: New submission
- `in_review`: Admin reviewing
- `approved`: Published to dashboard
- `rejected`: Not published
- `changes_requested`: Sent back to submitter

## 🔑 Key Features

### Public Dashboard
- Interactive Leaflet map with clustered markers
- Real-time KPIs: Total Projects, Cities, Countries, Funding
- Global filters: Region, SDG, City, Funded By
- Analytics charts (SDG distribution, regional analysis, typology breakdown)
- Searchable/sortable project table
- Export to CSV/XLSX
- Project detail slide-over drawer

### Submission Form
- Multi-section project submission
- Image URL validation
- Coordinate validation (lat/long)
- SDG multi-select (1-17)
- Project typology checkboxes
- Key requirements selection
- Email verification

### Review Workflow (Admin)
- Pending submissions queue
- Approve/Reject/Request Changes
- Email notifications to submitters
- Edit capabilities
- Audit logging

## 🔒 Security

- JWT-based authentication
- Password hashing (bcrypt)
- CORS configuration
- Input validation (Pydantic)
- SQL injection protection (SQLAlchemy ORM)
- Rate limiting
- reCAPTCHA v3 (planned)

## 📧 Email Notifications

- On submission → UIA admin
- On approval/rejection → submitter
- On changes requested → submitter with edit link

## 🌍 Deployment

### Vercel (Frontend)
1. Connect GitHub repo
2. Set root directory: `frontend`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variable: `VITE_API_URL`

### Render (Backend)
1. Create new Web Service
2. Root directory: `backend`
3. Build command: `pip install -r requirements.txt`
4. Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables (see `.env.example`)

### Supabase (Database)
1. Create new project
2. Enable PostGIS extension
3. Copy connection string to backend `.env`
4. Run migrations via local Alembic

## 📝 Environment Variables

### Frontend `.env`
```
VITE_API_URL=http://localhost:8000
VITE_RECAPTCHA_SITE_KEY=your_key
```

### Backend `.env`
```
DATABASE_URL=postgresql://user:pass@host:5432/atlas33
SECRET_KEY=your-secret-key-min-32-chars
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=your-sendgrid-api-key
ADMIN_EMAIL=admin@uia.org
FRONTEND_URL=http://localhost:5173
```

## 🧪 Testing

```bash
# Frontend
cd frontend
npm run test

# Backend
cd backend
pytest
```

## 📄 License

MIT License - see LICENSE file

## 🤝 Contributing

This is a UIA-managed project. For contributions, contact the project maintainers.

## 📞 Contact

UIA Key Person: admin@uia.org

---

Generated for Atlas 3+3 - A platform for sustainable urban development projects worldwide.
