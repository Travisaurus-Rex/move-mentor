"use client";

import { UnitSystem } from "@prisma/client";
import { createContext, useContext } from "react";

type UserPreferences = {
  unitSystem: UnitSystem;
};

const UserPreferencesContext = createContext<UserPreferences>({
  unitSystem: UnitSystem.METRIC,
});

export function UserPreferencesProvider({
  children,
  preferences,
}: {
  children: React.ReactNode;
  preferences: UserPreferences;
}) {
  return (
    <UserPreferencesContext.Provider value={preferences}>
      {children}
    </UserPreferencesContext.Provider>
  );
}

export function useUserPreferences() {
  const { unitSystem } = useContext(UserPreferencesContext);
  const [weightUnit, distanceUnit] =
    unitSystem === UnitSystem.METRIC ? ["kg", "km"] : ["lbs", "mi"];
  return { unitSystem, weightUnit, distanceUnit };
}
