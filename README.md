# Move Mentor

A minimalist workout tracking application built with Next.js. Log workouts, track volume, and visualize progress over time.

🔗 **Live Demo:** [move-mentor-topaz.vercel.app](https://move-mentor-topaz.vercel.app)

---

## Features

- **Workout Logging** - Create workouts with exercises, sets, reps, and weight
- **Strength & Cardio Tracking** - Support for resistance training and cardio sessions
- **Interactive Dashboard** - View total volume, cardio minutes, and workout frequency over customizable time periods
- **Workout History** - Browse all workouts in a filterable table with aggregated stats
- **GitHub OAuth** - Secure authentication with no password management

---

## Tech Stack

**Frontend**

- Next.js 16 (App Router)
- React 19
- TypeScript
- shadcn/ui (Radix + Tailwind CSS)
- Recharts

**Backend**

- Next.js Server Actions
- Prisma ORM
- PostgreSQL (Neon)
- NextAuth.js

**Deployment**

- Vercel (hosting)
- Neon (database)

---

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (local or Neon)
- GitHub OAuth app

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Travisaurus-Rex/move-mentor.git
cd move-mentor
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file:

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/movementor"

# NextAuth
NEXTAUTH_SECRET="your-secret-here"  # Generate with: openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"

# GitHub OAuth (create at github.com/settings/developers)
GITHUB_CLIENT_ID="your-client-id"
GITHUB_CLIENT_SECRET="your-client-secret"
```

4. **Set up the database**

```bash
npx prisma migrate dev
npx prisma db seed  # Optional: seed exercise library
```

5. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Database Schema

```
User ────────< Workout
               │
               └─────< WorkoutExercise >─────┐
                       │                      │
                       └──────< Set          Exercise
```

### Key Entities

- **User** - GitHub OAuth account
- **Workout** - Training session with date and notes
- **Exercise** - Global library (Bench Press, Running, etc.)
- **WorkoutExercise** - Join table linking workouts to exercises
- **Set** - Individual performance record (reps × weight or duration)

### Exercise Categories

```typescript
enum ExerciseCategory {
  STRENGTH   // reps, weight, RPE
  CARDIO     // duration, distance
  BODYWEIGHT // (schema only - not implemented)
  MOBILITY   // (schema only - not implemented)
}
```

---

## Project Structure

```
src/
├── app/
│   ├── about/              # Landing page
│   ├── api/
│   │   ├── auth/           # NextAuth routes
│   │   └── dashboard/      # Dashboard stats API
│   ├── dashboard/          # User dashboard
│   ├── workouts/
│   │   ├── [id]/           # Workout detail + editing
│   │   ├── new/            # Workout creation
│   │   └── actions.ts      # Server actions (CRUD)
│   └── components/         # Shared UI components
├── lib/
│   ├── auth/               # Auth helpers
│   ├── queries/            # Prisma queries
│   └── types/              # TypeScript types
└── components/ui/          # shadcn components
```

---

## Deployment

### Vercel + Neon (Recommended)

1. **Create a Neon database**
   - Sign up at [neon.tech](https://neon.tech)
   - Copy the connection string

2. **Deploy to Vercel**
   - Import your GitHub repo at [vercel.com](https://vercel.com)
   - Add environment variables in project settings
   - Deploy

3. **Run migrations**

```bash
DATABASE_URL="your-neon-url" npx prisma migrate deploy
```

4. **Update GitHub OAuth app**
   - Add Vercel callback URL: `https://your-app.vercel.app/api/auth/callback/github`

---

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npx prisma studio    # Open database GUI
npx prisma migrate dev --name <name>  # Create and apply migration
```

---

## Known Limitations

- No workout templates or copy functionality
- No personal records (max weight) tracking
- No body weight logging
- Exercise dropdown has no search (becomes unwieldy with 50+ exercises)
- No mobile optimization for workout table
- BODYWEIGHT and MOBILITY categories exist in schema but have no UI support

---

## Roadmap

- [ ] Personal records tracking with charts
- [ ] Workout templates and copy functionality
- [ ] Body weight logging and progress tracking
- [ ] Exercise search and filtering
- [ ] Mobile-responsive workout table
- [ ] File uploads (progress photos)
- [ ] Weekly email summaries (AWS Lambda + SES)

---

## Contributing

This is a personal portfolio project, but feedback and suggestions are welcome. Open an issue or submit a pull request.

---

## License

MIT

---

## Author

**Travis Adams**  
[GitHub](https://github.com/Travisaurus-Rex) • [LinkedIn](https://linkedin.com/in/travisaurus-rex)

---

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com) for the component library
- [Neon](https://neon.tech) for serverless PostgreSQL
- [Vercel](https://vercel.com) for hosting
