// src/app/onboarding/components/steps/StepGoals.tsx
"use client";

import "./StepGoals.css";
import { JSX, useState } from "react";
import type { Goal } from "@/lib/types/onboarding";
import { GOAL_LABELS, GOAL_DESCRIPTIONS } from "@/lib/types/onboarding";
import { StepProps } from "../../../OnboardingFlow/OnboardingFlow";
import { StepShell } from "../../StepShell";

// SVG icons for each goal — simple, recognizable shapes
const GOAL_ICONS: Record<Goal, JSX.Element> = {
  LOSE_WEIGHT: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
  BUILD_MUSCLE: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6.5 6.5h11M6.5 17.5h11M4 12h16" />
      <circle cx="4" cy="12" r="2" />
      <circle cx="20" cy="12" r="2" />
      <circle cx="4" cy="6.5" r="1.5" />
      <circle cx="4" cy="17.5" r="1.5" />
      <circle cx="20" cy="6.5" r="1.5" />
      <circle cx="20" cy="17.5" r="1.5" />
    </svg>
  ),
  IMPROVE_ENDURANCE: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  INCREASE_STRENGTH: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 20V10M12 20V4M6 20v-6" />
    </svg>
  ),
};

const ALL_GOALS: Goal[] = [
  "LOSE_WEIGHT",
  "BUILD_MUSCLE",
  "IMPROVE_ENDURANCE",
  "INCREASE_STRENGTH",
];

export function StepGoals({
  data,
  onNext,
  onBack,
  isFirst,
  isLast,
  isSubmitting,
}: StepProps) {
  const [selected, setSelected] = useState<Set<Goal>>(
    new Set(data.goals ?? []),
  );
  const [touched, setTouched] = useState(false);

  const toggle = (goal: Goal) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(goal)) {
        next.delete(goal);
      } else {
        next.add(goal);
      }
      return next;
    });
  };

  const isValid = selected.size > 0;

  const handleNext = () => {
    setTouched(true);
    if (!isValid) return;
    onNext({ goals: Array.from(selected) });
  };

  return (
    <StepShell
      heading="What are your goals?"
      subheading="Select everything that applies. You can have more than one."
      onNext={handleNext}
      onBack={onBack}
      isFirst={isFirst}
      isLast={isLast}
      isSubmitting={isSubmitting}
      nextDisabled={touched && !isValid}
    >
      <div className="goals-grid">
        {ALL_GOALS.map((goal) => {
          const isSelected = selected.has(goal);
          return (
            <button
              key={goal}
              type="button"
              className={`goal-card ${isSelected ? "selected" : ""}`}
              onClick={() => toggle(goal)}
              aria-pressed={isSelected}
            >
              <div className="goal-icon">{GOAL_ICONS[goal]}</div>
              <div className="goal-text">
                <span className="goal-label">{GOAL_LABELS[goal]}</span>
                <span className="goal-description">
                  {GOAL_DESCRIPTIONS[goal]}
                </span>
              </div>
              <div className="goal-check" aria-hidden="true">
                {isSelected && (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M13.5 3.5L6 11 2.5 7.5l-1 1L6 13l8.5-8.5-1-1z" />
                  </svg>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {touched && !isValid && (
        <p className="field-error">Please select at least one goal</p>
      )}
    </StepShell>
  );
}
