// src/app/onboarding/components/steps/StepAge.tsx
"use client";

import "./StepAge.css";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StepProps } from "../../../OnboardingFlow/OnboardingFlow";
import { StepShell } from "../../StepShell";

export function StepAge({
  data,
  onNext,
  onBack,
  isFirst,
  isLast,
  isSubmitting,
}: StepProps) {
  const [age, setAge] = useState(data.age?.toString() ?? "");
  const [touched, setTouched] = useState(false);

  const parsed = parseInt(age, 10);
  const isValid = !isNaN(parsed) && parsed >= 13 && parsed <= 120;

  const handleNext = () => {
    setTouched(true);
    if (!isValid) return;
    onNext({ age: parsed });
  };

  const handleChange = (val: string) => {
    // Only allow digits
    setAge(val.replace(/\D/g, "").slice(0, 3));
  };

  return (
    <StepShell
      heading="How old are you?"
      subheading="Age helps us calibrate recommendations and track relative progress."
      onNext={handleNext}
      onBack={onBack}
      isFirst={isFirst}
      isLast={isLast}
      isSubmitting={isSubmitting}
      nextDisabled={!isValid}
    >
      <div className="age-field">
        <Label htmlFor="age" className="sr-only">
          Age
        </Label>
        <div className="age-input-row">
          <Input
            id="age"
            type="text"
            inputMode="numeric"
            autoFocus
            placeholder="25"
            value={age}
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleNext()}
            className={`age-input ${touched && !isValid ? "border-destructive" : ""}`}
            maxLength={3}
            aria-describedby="age-unit"
          />
          <span id="age-unit" className="age-unit">
            years old
          </span>
        </div>
        {touched && !isValid && (
          <p className="field-error">
            {age === ""
              ? "Please enter your age"
              : parsed < 13
                ? "You must be at least 13 to use Move Mentor"
                : "Please enter a valid age"}
          </p>
        )}
      </div>
    </StepShell>
  );
}
