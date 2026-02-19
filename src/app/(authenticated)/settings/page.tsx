import { getUser } from "@/lib/auth/auth";
import { getUserProfile } from "@/lib/queries/user-profile";
import {
  updateUserProfile,
  deleteAccount,
} from "@/app/(authenticated)/settings/actions";
import { UnitSystem } from "@prisma/client";
import { DeleteAccountButton } from "./components/DeleteAccountButton";

export default async function SettingsPage() {
  const user = await getUser();
  const profile = await getUserProfile(user.id);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-black uppercase tracking-tight text-foreground">
          Settings
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your account preferences.
        </p>
      </div>

      <section className="bg-white border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
          Profile
        </h2>
        <form action={updateUserProfile} className="space-y-4">
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
          <button
            type="submit"
            className="px-4 py-2 text-sm font-semibold bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors cursor-pointer"
          >
            Save Profile
          </button>
        </form>
      </section>

      <section className="bg-white border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
          Preferences
        </h2>
        <form action={updateUserProfile} className="space-y-4">
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
          <button
            type="submit"
            className="px-4 py-2 text-sm font-semibold bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors cursor-pointer"
          >
            Save Preferences
          </button>
        </form>
      </section>

      <section className="bg-white border border-destructive/30 rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-widest text-destructive">
          Danger Zone
        </h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">
              Delete Account
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Permanently delete your account and all workout data. This cannot
              be undone.
            </p>
          </div>
          <DeleteAccountButton action={deleteAccount} />
        </div>
      </section>
    </div>
  );
}
