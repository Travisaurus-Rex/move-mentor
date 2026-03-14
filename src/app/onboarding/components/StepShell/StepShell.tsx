// src/app/onboarding/components/StepShell.tsx
//
// Shared layout wrapper for each onboarding step.
// Handles the staggered content entrance animation and
// back/next button layout so individual steps stay clean.

"use client";

import "./StepShell.css";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface StepShellProps {
  heading: string;
  subheading?: string;
  children: ReactNode;
  onNext: () => void;
  onBack: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  isFirst: boolean;
  isLast: boolean;
  isSubmitting?: boolean;
}

export function StepShell({
  heading,
  subheading,
  children,
  onNext,
  onBack,
  nextLabel = "Continue",
  nextDisabled = false,
  isFirst,
  isLast,
  isSubmitting = false,
}: StepShellProps) {
  return (
    <div className="step-shell">
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="step-header">
        <h1 className="step-heading">{heading}</h1>
        {subheading && <p className="step-subheading">{subheading}</p>}
      </div>

      {/* ── Content ────────────────────────────────────────── */}
      <div className="step-content">{children}</div>

      {/* ── Navigation ─────────────────────────────────────── */}
      <div className="step-nav">
        {!isFirst && (
          <Button
            variant="ghost"
            onClick={onBack}
            disabled={isSubmitting}
            className="step-back-btn"
          >
            ← Back
          </Button>
        )}
        <Button
          onClick={onNext}
          disabled={nextDisabled || isSubmitting}
          className={`step-next-btn ${isFirst ? "full-width" : ""}`}
        >
          {isSubmitting ? (
            <span className="submitting">
              <span className="spinner" />
              Saving...
            </span>
          ) : isLast ? (
            "Let's go →"
          ) : (
            nextLabel
          )}
        </Button>
      </div>
    </div>
  );
}
