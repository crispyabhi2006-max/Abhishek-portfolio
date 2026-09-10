# Abhishek S - Full-Stack Personal Portfolio Website

A complete, responsive, full-stack personal portfolio website developed by **Abhishek S** (Computer Science and Engineering student at **Easwari Engineering College**). Built for showcasing engineering projects, technical skills, academic background, internships, and dynamic contact messages, satisfying the requirements for the **Thiranex Personal Portfolio Website Assignment**.

---

## 🚀 Live Preview & Architecture

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons, Glassmorphic UI
- **Backend**: Node.js, Express.js REST API
- **Database**: MongoDB with Mongoose ODM (includes zero-crash in-memory development buffer when MongoDB credentials are not yet configured)
- **Deployment**: Configured for Cloud Run / Vercel / Netlify / Render / Heroku

---

## 📁 Project Structure

```
Abhishek-Portfolio/
├── backend/
│   ├── db.ts                     # MongoDB connection manager with graceful fallback
│   ├── models/
│   │   ├── Project.ts            # Mongoose model for Projects collection
│   │   └── Message.ts            # Mongoose model for Contact Messages
│   ├── routes/
│   │   ├── projects.ts           # REST API endpoints: GET, POST, DELETE /api/projects
│   │   └── messages.ts           # REST API endpoints: POST, GET /api/messages
│   └── seedData.ts               # Default verified project portfolio items
├── public/
│   └── frontend/
│       └── assets/
│           ├── profile.jpg       # Profile photo location (place your photo here)
│           ├── Abhishek_S_Resume.pdf # Resume PDF for instant download
│           └── README.txt        # Assets guidance notes
├── src/
│   ├── components/
│   │   ├── Navbar.tsx            # Sticky responsive navigation with active states & mobile drawer
│   │   ├── Hero.tsx              # Developer hero with photo loading, CTA buttons & socials
│   │   ├── ResumeModal.tsx       # Robust resume download handler & instructions dialog
│   │   ├── About.tsx             # Professional biography, career objective & college info
│   │   ├── Skills.tsx            # Categorized skills cards with icons & animations
│   │   ├── TechGraph3D.tsx       # 3D interactive holographic technology sphere & ecosystem
│   │   ├── Education.tsx         # Academic timeline (B.E. CSE-A, Easwari Engg College)
│   │   ├── Projects.tsx          # Dynamic API-driven project grid with search & filters
│   │   ├── ProjectModal.tsx      # Modal showcasing deep project architectural details
│   │   ├── AddProjectModal.tsx   # Project entry modal for portfolio extension
│   │   ├── Internships.tsx       # Verified internship experiences (1M1B, Tamizhan, CodeAlpha)
│   │   ├── Achievements.tsx      # LeetCode, problem solving & coding challenge milestones
│   │   ├── Languages.tsx         # English, German, Tamil, Telugu linguistic cards
│   │   ├── Contact.tsx           # Validated contact form connected to POST /api/messages
│   │   └── Footer.tsx            # Standard footer with exact student credentials & links
│   ├── types.ts                  # Shared TypeScript interfaces
│   ├── App.tsx                   # Main layout container
│   ├── main.tsx                  # React DOM entry point
│   └── index.css                 # Tailwind CSS directives
├── server.ts                     # Full-stack Express server integrating Vite middleware
├── .env.example                  # Environment configuration template
├── .gitignore                    # Git exclusions (.env, node_modules, dist)
├── metadata.json                 # Project metadata
├── package.json                  # Dependencies & scripts
└── README.md                     # Project documentation & setup instructions
```

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, TypeScript, Tailwind CSS v4, Lucide React Icons |
| **Backend API** | Node.js, Express.js 4, CORS, JSON Body Parser |
| **Database** | MongoDB, Mongoose ODM |
| **Tooling & Bundler** | Vite 6, TSX, ESBuild |
| **Version Control** | Git, GitHub |

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory (based on `.env.example`):

```env
# Application Port (defaults to 3000)
PORT=3000

# MongoDB Connection String (Optional for offline preview, required for persistence)
# Example format:
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/abhishek_portfolio?retryWrites=true&w=majority
```

> **Note on Database Zero-Crash Guarantee:** If `MONGO_URI` is not set, the application continues to run seamlessly in **Development Fallback Mode**, serving the 7 authentic pre-configured projects and buffering contact form submissions in memory. Once you add your `MONGO_URI`, the server connects automatically and seeds the database!

---

## 💻 How to Install and Run

### 1. Prerequisites
- Node.js v18+ or v20+
- npm (Node Package Manager)
- MongoDB Atlas account (free tier) or local MongoDB instance

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/crispyabhi2006-max/Abhishek-Portfolio.git

# Navigate into the project directory
cd Abhishek-Portfolio

# Install dependencies
npm install
```

### 3. Running in Development Mode
To run both the Express backend API and the Vite frontend concurrently:
```bash
npm run dev
```
The application will be accessible at: `http://localhost:3000`

### 4. Building for Production
```bash
npm run build
npm start
```

---

## 🖼️ How to Add Your Profile Photo

1. Prepare your photo in JPG format (named `profile.jpg`).
2. Place the file at:
   ```
   public/frontend/assets/profile.jpg
   ```
3. The hero section will automatically detect and display your photo. If the file is absent, a stylish initials avatar (`AS`) and developer badge are displayed without any broken image boxes.

---

## 📄 How to Add / Update Your Resume

1. Export your resume as a PDF named `Abhishek_S_Resume.pdf`.
2. Place it at:
   ```
   public/frontend/assets/Abhishek_S_Resume.pdf
   ```
3. When visitors click **DOWNLOAD RESUME** in the Hero or Navbar, the PDF is downloaded directly. A valid pre-compiled resume PDF is already included.

---

## 🔌 REST API Endpoints

| Method | Endpoint | Description | Status Code |
|---|---|---|---|
| `GET` | `/api/health` | Checks server health & MongoDB status | `200 OK` |
| `GET` | `/api/projects` | Retrieves all portfolio projects | `200 OK` |
| `POST` | `/api/projects` | Adds a new project (`title`, `description`, `technologies`) | `201 Created` |
| `DELETE` | `/api/projects/:id` | Deletes a project by its unique ID | `200 OK` |
| `POST` | `/api/messages` | Validates and stores a contact message (`name`, `email`, `message`) | `201 Created` |
| `GET` | `/api/messages` | Lists contact messages for verification | `200 OK` |

### Sample Contact Form Payload (`POST /api/messages`)
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "message": "Hello Abhishek, we would love to connect with you regarding a software developer opportunity."
}
```

---

## 🌐 Deployment Instructions

### Deploy to Render / Railway / Heroku
1. Push your repository to GitHub.
2. Link the repository to your hosting provider.
3. Set the build command to: `npm run build`
4. Set the start command to: `npm start`
5. Add the `MONGO_URI` environment variable in the dashboard.

### Deploy to Vercel
1. Install the Vercel CLI or import via the Vercel dashboard.
2. The bundled Express API serves static assets from `dist/` with SPA routing.

---

## 👤 Personal Details & Contact

- **Name**: Abhishek S
- **College**: Easwari Engineering College
- **Degree**: B.E. Computer Science and Engineering (Department: CSE-A, Second Year)
- **Roles**: Full Stack Developer | Java Developer
- **Email**: [crispyabhi2006@gmail.com](mailto:crispyabhi2006@gmail.com)
- **Phone**: [+91 9962853431](tel:+919962853431)
- **GitHub**: [github.com/crispyabhi2006-max](https://github.com/crispyabhi2006-max)
- **LinkedIn**: [linkedin.com/in/abhishek-s-642484381](https://www.linkedin.com/in/abhishek-s-642484381/)

---

© 2026 Abhishek S. All rights reserved.
