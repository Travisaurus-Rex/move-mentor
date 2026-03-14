// src/app/onboarding/components/steps/StepWelcome.tsx
"use client";

import "./StepWelcome.css";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StepShell } from "../../StepShell";
import { StepProps } from "../../../OnboardingFlow/OnboardingFlow";

export function StepWelcome({
  data,
  onNext,
  onBack,
  isFirst,
  isLast,
  isSubmitting,
}: StepProps) {
  const [displayName, setDisplayName] = useState(data.displayName ?? "");
  const [touched, setTouched] = useState(false);

  const isValid = displayName.trim().length >= 2;

  const handleNext = () => {
    setTouched(true);
    if (!isValid) return;
    onNext({ displayName: displayName.trim() });
  };

  return (
    <StepShell
      heading={
        <span className="font-black text-2xl">
          Welcome to <span className="text-primary">Move</span>Mentor
        </span>
      }
      subheading="Let's get your profile set up. This takes about a minute."
      onNext={handleNext}
      onBack={onBack}
      isFirst={isFirst}
      isLast={isLast}
      isSubmitting={isSubmitting}
      nextDisabled={touched && !isValid}
    >
      <div className="field-group">
        <Label htmlFor="displayName">What should we call you?</Label>
        <Input
          id="displayName"
          autoFocus
          placeholder="Your name or nickname"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleNext()}
          className={touched && !isValid ? "border-destructive" : ""}
          maxLength={40}
        />
        {touched && !isValid && (
          <p className="field-error">Name must be at least 2 characters</p>
        )}
        <p className="field-hint">
          This is how your name will appear throughout the app. You can change
          it later.
        </p>
      </div>
    </StepShell>
  );
}
