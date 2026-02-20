import { getUser } from "@/lib/auth/auth";
import { getUserProfile } from "@/lib/queries/user-profile";
import { deleteAccount } from "@/app/(authenticated)/settings/actions";
import { DeleteAccountButton } from "./components/DeleteAccountButton";
import UpdateDisplayNameForm from "./components/UpdateDisplayNameForm";
import UpdateUnitSystemForm from "./components/UpdateUnitSystemForm";

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
        <UpdateDisplayNameForm user={user} profile={profile} />
      </section>

      <section className="bg-white border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
          Preferences
        </h2>
        <UpdateUnitSystemForm profile={profile} />
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
