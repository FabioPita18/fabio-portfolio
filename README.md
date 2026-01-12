# Fabio's Portfolio

> A modern, full-stack portfolio website showcasing my development projects and technical skills.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://fabio-portfolio.vercel.app)
[![Backend](https://img.shields.io/badge/backend-Django-092E20?logo=django)](https://github.com/yourusername/fabio-portfolio)
[![Frontend](https://img.shields.io/badge/frontend-React-61DAFB?logo=react)](https://github.com/yourusername/fabio-portfolio)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 📋 Overview

This portfolio website serves as a comprehensive showcase of my full-stack development capabilities, featuring live projects, detailed technical breakdowns, and a collection of my skills and experience. Built with modern technologies and best practices, it demonstrates both my frontend and backend proficiency.

## 🎯 Problem Statement

As a full-stack developer, I need a professional platform to showcase my work to potential employers and clients, highlighting not just completed projects but also my technical expertise, development practices, and ability to build production-ready applications.

## ✨ Solution

A custom-built portfolio website featuring:
- **Dynamic Project Showcase**: Display projects with live demos, GitHub links, and detailed technical documentation
- **Skills Visualization**: Organized display of technical skills by category with proficiency levels
- **Contact Integration**: Functional contact form with email notifications
- **Responsive Design**: Mobile-first approach ensuring great UX across all devices
- **Admin Panel**: Django admin for easy content management without code changes

## 🛠️ Tech Stack

### Backend
- **Framework**: Django 5.0.1 + Django REST Framework
- **Database**: PostgreSQL
- **Authentication**: Session-based (for admin)
- **Deployment**: Railway
- **CI/CD**: GitHub Actions

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Library**: Material-UI (MUI)
- **Routing**: React Router v6
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Deployment**: Vercel

### DevOps
- **Containerization**: Docker & Docker Compose
- **CI/CD**: GitHub Actions (automated testing + deployment)
- **Testing**: pytest (backend), Jest (frontend)
- **Code Quality**: ESLint, Prettier, Black

## 🚀 Key Features

### MVP (Current)
- [x] Landing page with hero section
- [x] Projects showcase (grid/list view)
- [x] Project detail pages with technical breakdowns
- [x] About page with skills and experience
- [x] Contact form with email notifications
- [x] Responsive design (mobile/tablet/desktop)
- [x] SEO optimization
- [x] Django admin panel for content management

### Future Enhancements
- [ ] Dark mode toggle
- [ ] Blog section for technical writing
- [ ] Project filtering by technology
- [ ] Performance analytics dashboard
- [ ] Newsletter integration

## 📸 Screenshots

### Homepage
![Homepage](docs/screenshots/homepage.png)

### Projects Showcase
![Projects](docs/screenshots/projects.png)

### Project Detail
![Project Detail](docs/screenshots/project-detail.png)

## 💻 Local Development

### Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL 15+
- Docker (optional)

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/fabio-portfolio.git
cd fabio-portfolio

# Set up Python virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
cd backend
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run migrations
python manage.py migrate

# Create superuser for admin access
python manage.py createsuperuser

# Load sample data (optional)
python manage.py loaddata sample_data.json

# Run development server
python manage.py runserver
```

Backend will be available at `http://localhost:8000`  
Admin panel at `http://localhost:8000/admin`

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API URL

# Run development server
npm run dev
```

Frontend will be available at `http://localhost:5173`

### Docker Setup (Alternative)
```bash
# From project root
docker-compose up --build

# Run migrations
docker-compose exec backend python manage.py migrate

# Create superuser
docker-compose exec backend python manage.py createsuperuser
```

## 🧪 Running Tests

### Backend Tests
```bash
cd backend
pytest --cov=. --cov-report=html
```

### Frontend Tests
```bash
cd frontend
npm test
npm run test:coverage
```

## 📦 Deployment

### Backend (Railway)
1. Connect GitHub repository to Railway
2. Add PostgreSQL database
3. Set environment variables in Railway dashboard
4. Deploy automatically on push to `main`

### Frontend (Vercel)
1. Connect GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set environment variables (API URL)
4. Deploy automatically on push to `main`

## 🔐 Environment Variables

### Backend (.env)
```bash
DEBUG=False
SECRET_KEY=your-secret-key
ALLOWED_HOSTS=your-domain.com
DATABASE_URL=postgresql://user:pass@host:5432/db
CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
```

### Frontend (.env)
```bash
VITE_API_URL=https://your-backend.railway.app/api
```

## 📁 Project Structure
```
fabio-portfolio/
├── backend/                 # Django backend
│   ├── config/             # Django project settings
│   ├── projects/           # Projects app
│   ├── contact/            # Contact form app
│   ├── manage.py
│   └── requirements.txt
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── types/         # TypeScript types
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
├── docker-compose.yml
└── README.md
```

## 🤝 Contributing

This is a personal portfolio project, but feedback and suggestions are welcome! Feel free to open an issue for any suggestions.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Fabio [Your Last Name]**
- Portfolio: [fabio-portfolio.vercel.app](https://fabio-portfolio.vercel.app)
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

## 🙏 Acknowledgments

- Built with [Django](https://www.djangoproject.com/) and [React](https://react.dev/)
- UI components from [Material-UI](https://mui.com/)
- Deployment on [Railway](https://railway.app/) and [Vercel](https://vercel.com/)

---

**Note**: This portfolio is a living project, continuously updated with new projects and improvements. Last updated: January 2026
