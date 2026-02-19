/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { CUSTOM_PROFILE_ID, povOrder, povProfiles } from "../data/povData";
import { CUSTOM_PROFILE_KEY } from "../constants/onboarding";

const PovContext = createContext(null);
const STORAGE_KEY = "welfare_pov_id";

function readCustomProfile() {
  try {
    const raw = localStorage.getItem(CUSTOM_PROFILE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

export function PovProvider({ children }) {
  const [customProfile, setCustomProfileState] = useState(() => readCustomProfile());
  const [povId, setPovId] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === CUSTOM_PROFILE_ID && readCustomProfile()) return CUSTOM_PROFILE_ID;
    return saved && povProfiles[saved] ? saved : povOrder[0];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, povId);
  }, [povId]);

  const value = useMemo(() => {
    const presetProfiles = povOrder.map((id) => povProfiles[id]);
    const profilesById = customProfile
      ? { ...povProfiles, [CUSTOM_PROFILE_ID]: customProfile }
      : povProfiles;
    const activePovId = povId === CUSTOM_PROFILE_ID && !customProfile ? povOrder[0] : povId;
    const profile = profilesById[activePovId] ?? povProfiles[povOrder[0]];

    const setCustomProfile = (nextProfile) => {
      setCustomProfileState(nextProfile);
      localStorage.setItem(CUSTOM_PROFILE_KEY, JSON.stringify(nextProfile));
    };

    const setActivePovId = (nextPovId) => {
      if (nextPovId === CUSTOM_PROFILE_ID && !customProfile) return;
      setPovId(nextPovId);
    };

    return {
      povId: activePovId,
      setPovId: setActivePovId,
      profile,
      profiles: presetProfiles,
      customProfile,
      hasCustomProfile: Boolean(customProfile),
      setCustomProfile,
    };
  }, [customProfile, povId]);

  return <PovContext.Provider value={value}>{children}</PovContext.Provider>;
}

export function usePov() {
  const ctx = useContext(PovContext);
  if (!ctx) {
    throw new Error("usePov must be used inside PovProvider");
  }
  return ctx;
}
