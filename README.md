# 🏋️‍♂️ MoveMentor

**MoveMentor** is a full-stack fitness and wellness tracking app built with **Next.js**, **Tailwind CSS**, and **Prisma**.  
It helps users track workouts, nutrition, and goals through a personalized, bento-style dashboard.

---

## 🚀 Features

- 💪 Track and manage workouts  
- 🥗 Log meals and monitor nutrition  
- 🎯 Set and follow fitness goals  
- 📊 View progress with interactive charts  
- 🔒 Secure authentication with JWT & bcrypt  
- ⚙️ API routes powered by Prisma ORM  
- 🧩 Bento-style responsive dashboard  

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | Next.js (App Router), Tailwind CSS |
| **Backend** | Node.js, Prisma ORM |
| **Database** | PostgreSQL (configurable) |
| **Auth** | bcrypt + JSON Web Tokens (JWT) |
| **Language** | TypeScript |

---

## 📂 Project Structure

```
movementor/
│
├── app/
│   ├── page.tsx              # Landing page (SSG)
│   ├── about/page.tsx        # About page (SSG)
│   ├── login/page.tsx        # Login page
│   ├── register/page.tsx     # Signup page
│   ├── dashboard/            # Authenticated user area
│   │   ├── page.tsx          # Dashboard home (bento layout)
│   │   ├── workouts/[id]/page.tsx
│   │   ├── nutrition/[id]/page.tsx
│   │   ├── goals/page.tsx
│   │   └── analytics/page.tsx
│
├── components/               # Reusable UI components
├── lib/                      # Prisma, auth, utilities
├── prisma/                   # Database schema
├── middleware.ts             # Auth checks for protected routes
└── tailwind.config.js
```

---

## ⚡ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/movementor.git
cd movementor
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the project root:
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/movementor"
JWT_SECRET="yoursecretkey"
```

### 4. Set up Prisma
```bash
npx prisma migrate dev --name init
```

### 5. Run the development server
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000)

---

## 🔐 Authentication Flow

- User registers → password hashed with `bcrypt`
- On login → user verified → signed JWT stored in cookies
- Protected routes use middleware to validate session tokens

---

## 🎨 UI Overview

The MoveMentor dashboard features a **bento-style grid layout**:
- Top: Greeting + overview
- Center: Workouts, Nutrition, Goals
- Right: Weekly trend charts
- Bottom: Quick actions and insights

---

## 🧑‍💻 Development Notes

- Built for **Next.js App Router** (v13+)
- Uses **fetch()** for all API requests (no Axios)
- Tailwind utility classes for all styling
- Fully responsive and mobile-friendly

---

## 📜 License

This project is licensed under the **MIT License**.  
Feel free to fork and modify as needed.

---

**MoveMentor** — your digital training partner for building strength, balance, and momentum.
