"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";

export function DeleteAccountButton({
  action,
}: {
  action: () => Promise<void>;
}) {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    await action();
    await signOut({ callbackUrl: "/" });
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Are you sure?</span>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="px-3 py-1.5 text-xs font-semibold bg-destructive text-white rounded-lg hover:bg-destructive/90 transition-colors cursor-pointer disabled:opacity-50"
        >
          {loading ? "Deleting..." : "Yes, delete"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="px-3 py-1.5 text-xs font-semibold border border-border rounded-lg hover:bg-muted transition-colors cursor-pointer"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="px-4 py-2 text-sm font-semibold border border-destructive text-destructive rounded-lg hover:bg-destructive hover:text-white transition-colors cursor-pointer"
    >
      Delete Account
    </button>
  );
}
