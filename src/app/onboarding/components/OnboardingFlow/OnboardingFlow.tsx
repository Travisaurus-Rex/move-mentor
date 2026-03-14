// src/app/onboarding/components/OnboardingFlow.tsx
"use client";

import "./OnboardingFlow.css";
import { useState, useCallback } from "react";
import { completeOnboarding } from "../../actions";
import type { OnboardingData } from "@/lib/types/onboarding";
import { StepWelcome } from "../StepShell/steps/1 - Welcome/StepWelcome";
import { StepAge } from "../StepShell/steps/2 - Age/StepAge";
import { StepUnitSystem } from "../StepShell/steps/3 - Unit System/StepUnitSystem";
import { StepWeight } from "../StepShell/steps/4 - Weight/StepWeight";
import { StepGoals } from "../StepShell/steps/5 - Goals/StepGoals";
import { StepFrequency } from "../StepShell/steps/6 - Frequency/StepFrequency";
import { StepSummary } from "../StepShell/steps/7 - Summary/StepSummary";
import { isRedirectError } from "next/dist/client/components/redirect-error";

// ─── Types ───────────────────────────────────────────────────────────────────

export type StepDirection = "forward" | "backward";

export interface StepProps {
  data: Partial<OnboardingData>;
  onNext: (update: Partial<OnboardingData>) => void;
  onBack: () => void;
  isFirst: boolean;
  isLast: boolean;
  isSubmitting: boolean;
}

const STEPS = [
  StepWelcome,
  StepAge,
  StepUnitSystem,
  StepWeight,
  StepGoals,
  StepFrequency,
  StepSummary,
];

const STEP_LABELS = [
  "Welcome",
  "Age",
  "Units",
  "Weight",
  "Goals",
  "Schedule",
  "Summary",
];

export function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<StepDirection>("forward");
  const [animating, setAnimating] = useState(false);
  const [data, setData] = useState<Partial<OnboardingData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalSteps = STEPS.length;

  const goToStep = useCallback(
    (next: number, dir: StepDirection, update?: Partial<OnboardingData>) => {
      if (animating) return;
      if (update) setData((prev) => ({ ...prev, ...update }));
      setDirection(dir);
      setAnimating(true);
      setTimeout(() => {
        setCurrentStep(next);
        setAnimating(false);
      }, 220);
    },
    [animating],
  );

  const handleNext = useCallback(
    async (update: Partial<OnboardingData>) => {
      const merged = { ...data, ...update };
      setData(merged);

      if (currentStep === totalSteps - 1) {
        setIsSubmitting(true);
        setError(null);
        try {
          await completeOnboarding(merged as OnboardingData);
        } catch (err) {
          if (isRedirectError(err)) throw err;
          setError(err instanceof Error ? err.message : "Something went wrong");
          setIsSubmitting(false);
        }
        return;
      }

      goToStep(currentStep + 1, "forward", update);
    },
    [currentStep, totalSteps, data, goToStep],
  );

  const handleBack = useCallback(() => {
    if (currentStep === 0) return;
    goToStep(currentStep - 1, "backward");
  }, [currentStep, goToStep]);

  const CurrentStepComponent = STEPS[currentStep];

  return (
    <div className="onboarding-page">
      <div className="onboarding-card">
        {/* ── Segmented progress bar ── */}
        <div className="onboarding-progress" aria-label="Onboarding progress">
          {STEP_LABELS.map((label, i) => (
            <div
              key={label}
              className={[
                "onboarding-progress-segment",
                i < currentStep ? "completed" : "",
                i === currentStep ? "active" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-label={label}
            >
              {i === currentStep && (
                <div className="onboarding-progress-fill" />
              )}
            </div>
          ))}
        </div>

        {/* ── Step content ── */}
        <div className="onboarding-body">
          <div
            className={[
              "onboarding-step-wrapper",
              animating ? `animating-${direction}` : "visible",
            ].join(" ")}
          >
            <CurrentStepComponent
              key={currentStep}
              data={data}
              onNext={handleNext}
              onBack={handleBack}
              isFirst={currentStep === 0}
              isLast={currentStep === totalSteps - 1}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>

        {/* ── Error toast ── */}
        {error && (
          <div className="onboarding-error" role="alert">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
