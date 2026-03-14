// src/app/onboarding/components/steps/StepFrequency.tsx
"use client";

import { StepProps } from "../../../OnboardingFlow/OnboardingFlow";
import { StepShell } from "../../StepShell";
import "./StepFrequency.css";
import { useState } from "react";

const DAYS = [1, 2, 3, 4, 5, 6, 7] as const;

const DAY_LABELS: Record<number, string> = {
  1: "Once a week",
  2: "Twice a week",
  3: "3 days",
  4: "4 days",
  5: "5 days",
  6: "6 days",
  7: "Every day",
};

const DAY_NOTES: Record<number, string> = {
  1: "Great for beginners or active recovery",
  2: "Good foundation — enough to see consistent progress",
  3: "The sweet spot for most people",
  4: "Solid training volume with recovery time",
  5: "High commitment — make sure to prioritize sleep",
  6: "Elite-level volume — recovery discipline is critical",
  7: "Requires careful programming — no full rest days",
};

export function StepFrequency({
  data,
  onNext,
  onBack,
  isFirst,
  isLast,
  isSubmitting,
}: StepProps) {
  const [target, setTarget] = useState<number>(data.weeklyWorkoutTarget ?? 3);

  const handleNext = () => {
    onNext({ weeklyWorkoutTarget: target });
  };

  return (
    <StepShell
      heading="How often do you want to train?"
      subheading="Set a weekly target. You can always adjust this later."
      onNext={handleNext}
      onBack={onBack}
      isFirst={isFirst}
      isLast={isLast}
      isSubmitting={isSubmitting}
    >
      <div className="frequency-picker">
        {/* Day selector pills */}
        <div
          className="day-pills"
          role="group"
          aria-label="Weekly workout days"
        >
          {DAYS.map((day) => (
            <button
              key={day}
              type="button"
              className={`day-pill ${target === day ? "selected" : ""}`}
              onClick={() => setTarget(day)}
              aria-pressed={target === day}
              aria-label={`${day} day${day > 1 ? "s" : ""} per week`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Visual bar */}
        <div className="frequency-bar" aria-hidden="true">
          {DAYS.map((day) => (
            <div
              key={day}
              className={`bar-segment ${day <= target ? "filled" : ""} ${day === target ? "peak" : ""}`}
              style={{ height: `${20 + day * 12}px` }}
            />
          ))}
        </div>

        {/* Description */}
        <div className="frequency-description">
          <p className="frequency-label">{DAY_LABELS[target]}</p>
          <p className="frequency-note">{DAY_NOTES[target]}</p>
        </div>
      </div>
    </StepShell>
  );
}
