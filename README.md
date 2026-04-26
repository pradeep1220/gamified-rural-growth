# 🎓 EduFlow LMS — Enterprise Learning Management System

A full-stack enterprise-grade Learning Management System built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js).

---

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [API Endpoints](#api-endpoints)
- [Demo Accounts](#demo-accounts)

---

## ✨ Features

### 👤 Role-Based System
| Role | Capabilities |
|------|-------------|
| **Admin** | Manage all users, view stats, delete courses |
| **Instructor** | Create/publish courses, add lessons, manage assignments, grade submissions |
| **Learner** | Browse/enroll courses, watch lessons, submit assignments, track progress, earn certificates |

### 🎬 Phase-by-Phase Features
- ✅ **Phase 1** — MERN setup with MVC architecture
- ✅ **Phase 2** — JWT auth + bcrypt + role-based access control
- ✅ **Phase 3** — 7 MongoDB collections (Users, Courses, Lessons, Enrollments, Assignments, Submissions, Progress, Comments, Announcements, Certificates)
- ✅ **Phase 4** — Full course CRUD + publish/unpublish
- ✅ **Phase 5** — YouTube API v3 integration for video search & embed
- ✅ **Phase 6** — Course player with sidebar lessons list + YouTube/PDF viewer
- ✅ **Phase 7** — Enrollment system with progress initialization
- ✅ **Phase 8** — Assignments + Auto-graded MCQ quizzes + Manual grading
- ✅ **Phase 9** — Lesson completion tracking + % calculation
- ✅ **Phase 10** — Student, Instructor & Admin dashboards with stats/charts
- ✅ **Phase 11** — Discussion comments + Course announcements
- ✅ **Phase 12** — Certificate generation (auto on 100%) + Course search & filter + Responsive UI

---

## 🛠 Tech Stack

### Frontend
- React 18 + Vite
- React Router DOM v6
- TailwindCSS
- Axios
- React Toastify
- Recharts (analytics)
- React Icons

### Backend
- Node.js + Express.js (REST API, MVC)
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- Bcryptjs (password hashing)
- Multer (file uploads)
- UUID (certificate IDs)

---

## 📁 Project Structure

```
lms/
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js      # Register, login, profile
│   │   ├── courseController.js    # Course CRUD
│   │   ├── lmsController.js       # Lessons, enrollments, assignments, progress
│   │   └── extraControllers.js   # Comments, announcements, certs, YouTube, admin
│   ├── middleware/
│   │   ├── auth.js                # JWT protect + authorize
│   │   └── upload.js              # Multer file upload
│   ├── models/
│   │   ├── User.js
│   │   ├── Course.js
│   │   ├── Lesson.js
│   │   └── index.js               # Enrollment, Assignment, Submission, Progress, Comment, Announcement, Certificate
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── courseRoutes.js
│   │   ├── lessonRoutes.js
│   │   ├── enrollmentRoutes.js
│   │   ├── assignmentRoutes.js
│   │   ├── submissionRoutes.js
│   │   ├── progressRoutes.js
│   │   ├── commentRoutes.js
│   │   ├── announcementRoutes.js
│   │   ├── certificateRoutes.js
│   │   ├── youtubeRoutes.js
│   │   └── adminRoutes.js
│   ├── utils/
│   │   └── seed.js                # Database seeder
│   ├── .env
│   └── server.js
│
└── frontend/
    └── src/
        ├── components/
        │   └── common/
        │       ├── DashboardLayout.jsx   # Sidebar + top navbar
        │       └── UI.jsx               # Reusable components
        ├── context/
        │   └── AuthContext.jsx
        ├── pages/
        │   ├── auth/          # Login, Register
        │   ├── learner/       # Dashboard, MyCourses, CoursePlayer, Assignments, Certificates, Profile
        │   ├── instructor/    # Dashboard, ManageCourses, CourseBuilder, ManageAssignments, Students
        │   ├── admin/         # Dashboard, Users, Courses
        │   ├── Landing.jsx
        │   ├── CourseDetails.jsx
        │   └── NotFound.jsx
        ├── services/
        │   └── api.js         # All Axios API calls
        └── App.jsx
```

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js v18+
- MongoDB running locally (or MongoDB Atlas URI)
- YouTube Data API v3 key (optional — mock data shown without it)

### 1. Clone & Install

```bash
# Backend
cd lms/backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Configure Environment

```bash
# Edit lms/backend/.env
PORT=5000
MONGO_URI=mongodb://localhost:27017/lms_enterprise
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d
YOUTUBE_API_KEY=your_youtube_api_key_here   # From Google Cloud Console
CLIENT_URL=http://localhost:5173
```

#### Getting YouTube API Key:
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project → Enable **YouTube Data API v3**
3. Create credentials → API Key
4. Paste into `.env`

### 3. Seed the Database

```bash
cd lms/backend
node utils/seed.js
```

### 4. Run the Application

```bash
# Terminal 1 — Backend
cd lms/backend
npm run dev    # Starts on http://localhost:5000

# Terminal 2 — Frontend
cd lms/frontend
npm run dev    # Starts on http://localhost:5173
```

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Register |
| POST | `/api/auth/login` | Public | Login |
| GET | `/api/auth/me` | Protected | Get current user |
| PUT | `/api/auth/profile` | Protected | Update profile |
| PUT | `/api/auth/password` | Protected | Change password |

### Courses
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/courses` | Public | Browse all published courses |
| GET | `/api/courses/:id` | Public | Get course details |
| POST | `/api/courses` | Instructor | Create course |
| PUT | `/api/courses/:id` | Instructor | Update course |
| DELETE | `/api/courses/:id` | Instructor/Admin | Delete course |
| PATCH | `/api/courses/:id/publish` | Instructor | Toggle publish |
| GET | `/api/courses/my-courses` | Instructor | Get own courses |

### Lessons
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/lessons/course/:courseId` | Protected | Get course lessons |
| POST | `/api/lessons` | Instructor | Add lesson |
| PUT | `/api/lessons/:id` | Instructor | Update lesson |
| DELETE | `/api/lessons/:id` | Instructor | Delete lesson |

### Enrollments, Assignments, Submissions, Progress
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/enrollments` | Enroll in course |
| GET | `/api/enrollments/my` | My enrollments |
| GET | `/api/assignments/course/:id` | Get assignments |
| POST | `/api/assignments` | Create assignment |
| POST | `/api/submissions/:assignmentId` | Submit assignment |
| PATCH | `/api/submissions/:id/grade` | Grade submission |
| POST | `/api/progress/complete` | Mark lesson complete |
| GET | `/api/progress/:courseId` | Get progress |

### Communication
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/comments/course/:id` | Get comments |
| POST | `/api/comments` | Add comment |
| GET | `/api/announcements/course/:id` | Get announcements |
| POST | `/api/announcements` | Create announcement |

### Certificates & YouTube
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/certificates/my` | My certificates |
| GET | `/api/certificates/:certId` | Verify certificate |
| GET | `/api/youtube/search?q=query` | Search YouTube |

### Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/stats` | Platform statistics |
| GET | `/api/admin/users` | All users (paginated) |
| PATCH | `/api/admin/users/:id/toggle` | Activate/deactivate |
| PATCH | `/api/admin/users/:id/role` | Change role |

---

## 🔐 Demo Accounts

After seeding, use these accounts:

| Role | Email | Password |
|------|-------|----------|
| 👨‍💼 Admin | admin@lms.com | admin123 |
| 👨‍🏫 Instructor | instructor@lms.com | instructor123 |
| 🎓 Learner | learner@lms.com | learner123 |

Or use the **Quick Demo Access** buttons on the Login page.

---

## 🌟 Optional Enhancements (Future)
- [ ] Video streaming with AWS S3
- [ ] Live classes with WebRTC
- [ ] AI course recommendations
- [ ] Gamification (badges, leaderboard)
- [ ] Mobile app (React Native)
- [ ] Deployment (Vercel + Render)

---

Built with ❤️ using the MERN Stack | Enterprise LMS
