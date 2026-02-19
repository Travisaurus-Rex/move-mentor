import Link from "next/link";
import {
  BarChart2,
  Dumbbell,
  Timer,
  TrendingUp,
  Zap,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";

function RevealCard({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <div
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: "both",
        animation: `fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) both`,
      }}
    >
      {children}
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  delay,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <RevealCard delay={delay}>
      <div className="group rounded-2xl border bg-card p-6 hover:shadow-md transition-shadow duration-300">
        <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="mb-2 text-base font-semibold tracking-tight">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </RevealCard>
  );
}

function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-4xl font-bold tracking-tighter text-white">
        {value}
      </span>
      <span className="text-sm text-white/60 uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section
        className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950"
        style={{
          backgroundImage: "url('/about-banner.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/20" />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-zinc-950" />

        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <div
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white"
            style={{ animation: "fadeUp .6s ease both" }}
          >
            <Zap className="h-3 w-3" /> Your training. Simplified.
          </div>

          <h1
            className="mb-6 text-6xl font-bold tracking-tighter text-white sm:text-7xl"
            style={{ animation: "fadeUp .7s .1s ease both" }}
          >
            Move with
            <br />
            <span
              className="text-primary"
              style={{ textShadow: "0 2px 12px rgba(0,0,0,1)" }}
            >
              intention.
            </span>
          </h1>

          <p
            className="mb-10 text-lg text-white leading-relaxed"
            style={{ animation: "fadeUp .7s .2s ease both" }}
          >
            MoveMentor is a no-nonsense workout tracker built for people who
            care about progress, not clutter. Log sets, track volume, and watch
            your fitness compound over time.
          </p>

          <div
            className="flex flex-wrap items-center justify-center gap-3"
            style={{ animation: "fadeUp .7s .3s ease both" }}
          >
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/workouts/new">Start tracking</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full px-8 border-white/50 bg-white/15 text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/dashboard">View dashboard</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-zinc-900 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            <StatPill value="100%" label="Free" />
            <StatPill value="4" label="Exercise types" />
            <StatPill value="∞" label="Workouts" />
            <StatPill value="0" label="Excuses" />
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="mx-auto max-w-5xl">
          <RevealCard>
            <div className="mb-16 max-w-xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                What you get
              </p>
              <h2 className="text-4xl font-bold tracking-tighter">
                Everything you need.
                <br />
                <span className="text-muted-foreground">
                  Nothing you don&apos;t.
                </span>
              </h2>
            </div>
          </RevealCard>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={Dumbbell}
              title="Strength tracking"
              description="Log every set with weight, reps, and RPE. Track volume over time and see exactly where you're improving."
              delay={0}
            />
            <FeatureCard
              icon={Timer}
              title="Cardio logging"
              description="Record duration and distance for any cardio session. Running, cycling, rowing — if you moved, log it."
              delay={80}
            />
            <FeatureCard
              icon={BarChart2}
              title="Volume dashboard"
              description="See your total weekly training volume at a glance. The numbers don't lie — and neither does the chart."
              delay={160}
            />
            <FeatureCard
              icon={TrendingUp}
              title="Progress over time"
              description="Filter your workout history by week, month, or quarter. Watch the trend line move in the right direction."
              delay={240}
            />
            <FeatureCard
              icon={Target}
              title="Exercise library"
              description="Choose from a growing library of categorized exercises. Strength, cardio, bodyweight — it's all in there."
              delay={320}
            />
            <FeatureCard
              icon={Zap}
              title="Fast by default"
              description="No bloat, no subscriptions, no ads. Just a fast, focused tool that gets out of your way so you can train."
              delay={400}
            />
          </div>
        </div>
      </section>

      <section className="bg-muted/40 py-24 px-6">
        <div className="mx-auto max-w-4xl">
          <RevealCard>
            <div className="mb-16 text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Simple by design
              </p>
              <h2 className="text-4xl font-bold tracking-tighter">
                Three steps. That&apos;s it.
              </h2>
            </div>
          </RevealCard>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "Create a workout",
                body: "Pick a date, add an optional note, and you're in. No setup, no templates required.",
              },
              {
                step: "02",
                title: "Add exercises",
                body: "Select exercises from the library and log each set as you go — weight, reps, duration, distance.",
              },
              {
                step: "03",
                title: "Watch the data grow",
                body: "Your dashboard tracks total volume and cardio minutes automatically. Come back tomorrow and do it again.",
              },
            ].map(({ step, title, body }, i) => (
              <RevealCard key={step} delay={i * 100}>
                <div className="rounded-2xl border bg-card p-8">
                  <p className="mb-4 text-5xl font-bold tracking-tighter text-muted-foreground/30">
                    {step}
                  </p>
                  <h3 className="mb-2 text-base font-semibold">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {body}
                  </p>
                </div>
              </RevealCard>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-zinc-950 py-28 px-6 text-center">
        <RevealCard>
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/30">
            Ready?
          </p>
          <h2 className="mb-6 text-5xl font-bold tracking-tighter text-white">
            Start your first workout.
          </h2>
          <p className="mb-10 text-white/40 max-w-md mx-auto">
            No credit card. No onboarding flow. Just log in and start moving.
          </p>
          <Button asChild size="lg" className="rounded-full px-10">
            <Link href="/workouts/new">Create a workout</Link>
          </Button>
        </RevealCard>
      </section>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
