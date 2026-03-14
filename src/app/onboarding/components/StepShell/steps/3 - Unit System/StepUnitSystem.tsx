// src/app/onboarding/components/steps/StepUnitSystem.tsx
"use client";

import "./StepUnitSystem.css";
import { UnitSystem } from "@prisma/client";
import { useState } from "react";
import { StepProps } from "../../../OnboardingFlow/OnboardingFlow";
import { StepShell } from "../../StepShell";

const OPTIONS: { value: UnitSystem; label: string; description: string }[] = [
  {
    value: UnitSystem.METRIC,
    label: "Metric",
    description: "Kilograms, kilometers, meters",
  },
  {
    value: UnitSystem.IMPERIAL,
    label: "Imperial",
    description: "Pounds, miles, feet",
  },
];

export function StepUnitSystem({
  data,
  onNext,
  onBack,
  isFirst,
  isLast,
  isSubmitting,
}: StepProps) {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>(
    data.unitSystem ?? UnitSystem.METRIC,
  );

  return (
    <StepShell
      heading="Which units do you prefer?"
      subheading="Used throughout the app for weight, distance, and volume."
      onNext={() => onNext({ unitSystem })}
      onBack={onBack}
      isFirst={isFirst}
      isLast={isLast}
      isSubmitting={isSubmitting}
    >
      <div className="unit-options">
        {OPTIONS.map((option) => {
          const isSelected = unitSystem === option.value;
          return (
            <button
              key={option.value}
              type="button"
              className={[
                "unit-card",
                unitSystem === option.value ? "selected" : "",
              ]
                .join(" ")
                .trim()}
              onClick={() => setUnitSystem(option.value)}
              aria-pressed={isSelected}
            >
              <div className="unit-card-text">
                <span className="unit-label">{option.label}</span>
                <span className="unit-description">{option.description}</span>
              </div>
              <div className="unit-check" aria-hidden="true">
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
    </StepShell>
  );
}
