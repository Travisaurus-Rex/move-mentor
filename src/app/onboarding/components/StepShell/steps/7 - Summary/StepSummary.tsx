// src/app/onboarding/components/steps/StepSummary.tsx
"use client";

import "./StepSummary.css";
import { StepProps } from "../../../OnboardingFlow/OnboardingFlow";
import { StepShell } from "../../StepShell";
import { GOAL_LABELS } from "@/lib/types/onboarding";

export function StepSummary({
  data,
  onNext,
  onBack,
  isFirst,
  isLast,
  isSubmitting,
}: StepProps) {
  const weightLbs = data.weightKg ? Math.round(data.weightKg / 0.453592) : null;

  return (
    <StepShell
      heading={`You're all set, ${data.displayName}`}
      subheading="Here's what we've got. Hit the button and start tracking."
      onNext={() => onNext({})}
      onBack={onBack}
      isFirst={isFirst}
      isLast={isLast}
      isSubmitting={isSubmitting}
    >
      <div className="summary-cards">
        <SummaryRow label="Name" value={data.displayName ?? "—"} />
        <SummaryRow
          label="Age"
          value={data.age ? `${data.age} years old` : "—"}
        />
        <SummaryRow
          label="Weight"
          value={
            data.weightKg
              ? `${data.weightKg.toFixed(1)} kg  ·  ${weightLbs} lbs`
              : "—"
          }
        />
        <SummaryRow
          label="Goals"
          value={
            data.goals && data.goals.length > 0
              ? data.goals.map((g) => GOAL_LABELS[g]).join(", ")
              : "—"
          }
        />
        <SummaryRow
          label="Weekly target"
          value={
            data.weeklyWorkoutTarget
              ? `${data.weeklyWorkoutTarget} workout${data.weeklyWorkoutTarget > 1 ? "s" : ""} per week`
              : "—"
          }
        />
      </div>

      <p className="summary-note">
        Everything here can be updated later from your profile settings.
      </p>
    </StepShell>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="summary-row">
      <span className="summary-row-label">{label}</span>
      <span className="summary-row-value">{value}</span>
    </div>
  );
}
