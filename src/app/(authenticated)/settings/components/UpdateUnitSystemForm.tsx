"use client";

import { useActionState, useEffect } from "react";
import { updateUserProfile } from "../actions";
import { toast } from "sonner";
import { UnitSystem, UserProfile } from "@prisma/client";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

type Props = {
  profile: UserProfile | null;
};

export default function UpdateUnitSystemForm({ profile }: Props) {
  const [state, action, pending] = useActionState(updateUserProfile, null);

  useEffect(() => {
    if (state?.success)
      toast.success("Unit system preferences successfully updated.");
    if (state?.error) toast.error(state.error);
  }, [state]);

  return (
    <form action={action} className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">
          Unit System
        </label>
        <div className="flex gap-3">
          {[UnitSystem.METRIC, UnitSystem.IMPERIAL].map((unit) => (
            <label
              key={unit}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="unitSystem"
                value={unit}
                defaultChecked={
                  (profile?.unitSystem ?? UnitSystem.METRIC) === unit
                }
                className="accent-primary"
              />
              <span className="text-sm font-medium text-foreground">
                {unit === UnitSystem.METRIC
                  ? "Metric (kg, km)"
                  : "Imperial (lbs, mi)"}
              </span>
            </label>
          ))}
        </div>
      </div>
      <Button type="submit" disabled={pending}>
        Save Preferences
        {pending && <Spinner />}
      </Button>
    </form>
  );
}
