<div align="center">

# 🏥 Hospital Infection Control System

**A full-stack platform for hospital infection-prevention teams: report infections, run compliance audits, manage policies and generate PDF reports.**

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

</div>

---

## 📖 Overview

Healthcare-associated infections are one of the main patient-safety risks in hospitals. This system gives **Infection Control Officers, doctors, nurses and administrators** one place to:

- report and track infection cases through a verification workflow,
- run **department compliance audits** against hospital policies,
- publish **Standard Operating Procedures (SOPs)** and standards,
- and export professional **PDF reports**.

## ✨ Features

### 🦠 Infection reporting
- Log infection type, department, severity (**Low / Medium / High**) and notes
- Review workflow: **Open → Under Review → Verified → Closed**, recording who verified each case and when

### 📋 Compliance audits & policies
- Department audits with a **0–100 compliance score**, each linked to a policy
- Policy and SOP library, plus an *About → Standards* section
- An *electronic audit* challenge module

### 👥 Role-based access
| Role | Access |
|---|---|
| **Admin** | Full system and user management |
| **Infection Control Officer** | Verifies reports, runs audits, manages policies |
| **Doctor / Nurse** | Submits and follows infection reports |

### 📄 Reporting
- One-click **PDF export** of audits and SOPs with `@react-pdf/renderer`

### 🎨 UX
- Animated landing page with GSAP ScrollTrigger
- Protected routes and JWT session handling

## 🏗️ Architecture

```
Hospital-Infection-Control/
├── client/                 # Next.js (App Router) frontend
│   ├── app/                # Landing, auth, dashboard/{audits,policies,reports,users}, SOPs
│   ├── components/         # PDF documents, ProtectedRoute
│   └── lib/                # API client
└── server/                 # Express REST API
    ├── models/             # User, InfectionReport, Audit, Policy
    ├── controllers/        # auth, users, infection reports, audits, policies
    └── middlewares/        # JWT auth
```

## 🧰 Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | Next.js, React, Tailwind CSS, GSAP, @react-pdf/renderer |
| **Backend** | Node.js, Express, Mongoose, JWT, bcrypt |
| **Database** | MongoDB |

## 🚀 Getting Started

```bash
git clone https://github.com/Mohamedd-Ayyman/Hospital-Infection-Control.git
cd Hospital-Infection-Control

# Backend
cd server
npm install
# create server/config.env  (see below)
npm start

# Frontend (new terminal)
cd ../client
npm install
npm run dev        # http://localhost:3000
```

**`server/config.env`**

```env
PORT_NUMBER=5000
CONN_STRING=<your MongoDB connection string>
SECRET_KEY=<a long random string>
```

> 🔐 Never commit real credentials. Keep `config.env` in `.gitignore`.

## 👤 Author

**Mohamed Ayman**, Frontend / Full-Stack Developer · [GitHub](https://github.com/Mohamedd-Ayyman) · [LinkedIn](https://linkedin.com/in/mohamed-ayman-8787b0269)
