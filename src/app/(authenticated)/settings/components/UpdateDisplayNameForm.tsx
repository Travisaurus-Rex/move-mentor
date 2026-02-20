"use client";

import { useActionState, useEffect } from "react";
import { updateUserProfile } from "../actions";
import { toast } from "sonner";
import { User, UserProfile } from "@prisma/client";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

type Props = {
  profile: UserProfile | null;
  user: User;
};

export default function UpdateDisplayNameForm({ profile, user }: Props) {
  const [state, action, pending] = useActionState(updateUserProfile, null);

  useEffect(() => {
    if (state?.success) toast.success("Display name successfully updated.");
    if (state?.error) toast.error(state?.error);
  }, [state]);

  return (
    <form action={action} className="space-y-4">
      <div className="space-y-1.5">
        <label
          className="text-sm font-medium text-foreground"
          htmlFor="displayName"
        >
          Display Name
        </label>
        <input
          id="displayName"
          name="displayName"
          type="text"
          defaultValue={profile?.displayName ?? user.name ?? ""}
          placeholder="Your name"
          className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <p className="text-xs text-muted-foreground">
          This is how your name appears across the app.
        </p>
      </div>
      <Button type="submit" disabled={pending}>
        Save Profile
        {pending && <Spinner />}
      </Button>
    </form>
  );
}
