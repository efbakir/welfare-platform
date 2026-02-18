/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { povOrder, povProfiles } from "../data/povData";

const PovContext = createContext(null);
const STORAGE_KEY = "welfare_pov_id";

export function PovProvider({ children }) {
  const [povId, setPovId] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved && povProfiles[saved] ? saved : povOrder[0];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, povId);
  }, [povId]);

  const value = useMemo(() => {
    const profile = povProfiles[povId];
    return {
      povId,
      setPovId,
      profile,
      profiles: povOrder.map((id) => povProfiles[id]),
    };
  }, [povId]);

  return <PovContext.Provider value={value}>{children}</PovContext.Provider>;
}

export function usePov() {
  const ctx = useContext(PovContext);
  if (!ctx) {
    throw new Error("usePov must be used inside PovProvider");
  }
  return ctx;
}
