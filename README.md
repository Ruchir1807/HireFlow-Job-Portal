# HireFlow - Job Application Platform

HireFlow is a full-stack job application platform that allows users to browse job opportunities, search and filter listings, view detailed job information, and submit and track job applications.

The project is built using React, Node.js, Express, PostgreSQL, and Prisma.

## Live Demo

Frontend: https://hire-flow-job-portal.vercel.app

Backend API: https://hireflow-job-portal-xoel.onrender.com

---

## Features

### Authentication

- User registration
- User login
- JWT-based authentication
- Password hashing using bcrypt
- Protected application routes
- Logout functionality
- User roles (`USER` / `ADMIN`)

### Job Listings

- View available job listings
- Search jobs by title or company
- Filter jobs by location
- Filter jobs by minimum salary
- Filter jobs by maximum salary
- Pagination
- View individual job details

### Applications

- Apply for jobs through an application form
- Submit:
  - Name
  - Skills
  - Address
  - Resume URL
  - Cover letter
- Prevent duplicate applications for the same job
- View submitted applications
- Track application status
- Application statuses:
  - PENDING
  - REVIEWING
  - ACCEPTED
  - REJECTED

---

## Future Updates

- **Admin Dashboard** – Allow administrators to manage job listings and review applications.
- **Application Management** – Allow admins to view, filter, and manage submitted applications.
- **Application Status Updates** – Allow admins to update applications between `PENDING`, `REVIEWING`, `ACCEPTED`, and `REJECTED`.
- **Resume Uploads** – Support direct PDF/DOCX resume uploads instead of only resume URLs.
- **Job Management UI** – Add an interface for authorized users to create, edit, and delete job listings.
- **Role-Based Access Control** – Restrict admin features based on the user's role.
- **Email Notifications** – Notify applicants when their application status changes.
- **Advanced Job Search** – Add filtering by job type, experience level, skills, and company.
- **Application Analytics** – Provide statistics on job applications and hiring activity.
- **UI/UX Improvements** – Improve responsiveness, accessibility, loading states, and overall visual design.

## Tech Stack

### Frontend

- React
- React Router
- Tailwind CSS
- Axios
- Vite

### Backend

- Node.js
- Express.js
- JWT
- bcrypt
- REST API

### Database

- PostgreSQL
- Prisma ORM

### Deployment

- Vercel - Frontend
- Render - Backend
- Render PostgreSQL - Database

---

## Architecture

```text
                    ┌─────────────────────┐
                    │      React App      │
                    │   Vercel Frontend   │
                    └──────────┬──────────┘
                               │
                             Axios
                               │
                               ▼
                    ┌─────────────────────┐
                    │    Express API      │
                    │   Render Backend    │
                    └──────────┬──────────┘
                               │
                    ┌──────────┴──────────┐
                    │                     │
               JWT Auth              Services
                    │                     │
                    └──────────┬──────────┘
                               │
                             Prisma
                               │
                               ▼
                    ┌─────────────────────┐
                    │     PostgreSQL      │
                    │   Render Database   │
                    └─────────────────────┘
