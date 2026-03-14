// src/app/onboarding/components/steps/StepWeight.tsx
"use client";

import "./StepWeight.css";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StepProps } from "../../../OnboardingFlow/OnboardingFlow";
import { StepShell } from "../../StepShell";
import { UnitSystem } from "@prisma/client";

export function StepWeight({
  data,
  onNext,
  onBack,
  isFirst,
  isLast,
  isSubmitting,
}: StepProps) {
  const imperial = data.unitSystem === UnitSystem.IMPERIAL;
  const unitLabel = imperial ? "lbs" : "kg";

  const [rawValue, setRawValue] = useState("");
  const [touched, setTouched] = useState(false);

  const parsed = parseFloat(rawValue);
  const weightKg = isNaN(parsed) ? null : imperial ? parsed * 0.453592 : parsed;
  const isValid = weightKg !== null && weightKg >= 20 && weightKg <= 500;

  const handleChange = (val: string) => {
    const cleaned = val.replace(/[^\d.]/g, "");
    const parts = cleaned.split(".");
    const result =
      parts.length > 2 ? parts[0] + "." + parts.slice(1).join("") : cleaned;
    setRawValue(result.slice(0, 6));
  };

  const handleNext = () => {
    setTouched(true);
    if (!isValid || weightKg === null) return;
    onNext({ weightKg: Math.round(weightKg * 10) / 10 });
  };

  return (
    <StepShell
      heading="What's your current weight?"
      subheading="Used to calculate training volume relative to your body weight."
      onNext={handleNext}
      onBack={onBack}
      isFirst={isFirst}
      isLast={isLast}
      isSubmitting={isSubmitting}
      nextDisabled={touched && !isValid}
    >
      <div className="weight-field">
        <Label htmlFor="weight" className="sr-only">
          Weight in {unitLabel}
        </Label>
        <div className="weight-input-row">
          <Input
            id="weight"
            type="text"
            inputMode="decimal"
            autoFocus
            placeholder={imperial ? "165" : "75"}
            value={rawValue}
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleNext()}
            className={`weight-input ${touched && !isValid ? "border-destructive" : ""}`}
            maxLength={6}
            aria-describedby="weight-unit-label"
          />
          <span id="weight-unit-label" className="weight-unit">
            {unitLabel}
          </span>
        </div>

        {touched && !isValid && (
          <p className="field-error">Please enter a valid weight</p>
        )}
      </div>
    </StepShell>
  );
}
