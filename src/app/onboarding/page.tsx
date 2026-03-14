import { getUser } from "@/lib/auth/auth";
import { getUserProfile } from "@/lib/queries/user-profile";
import { redirect } from "next/navigation";
import { OnboardingFlow } from "./components/OnboardingFlow/OnboardingFlow";

export const metadata = {
  title: "Get Started | Move Mentor",
};

export default async function OnboardingPage() {
  const user = await getUser();
  const profile = await getUserProfile(user.id);

  if (profile?.onboardingComplete) {
    redirect("/dashboard");
  }

  return <OnboardingFlow />;
}
