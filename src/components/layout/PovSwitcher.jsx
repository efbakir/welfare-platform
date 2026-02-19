import { useId } from "react";
import { useNavigate } from "react-router-dom";
import { usePov } from "../../context/PovContext";
import { ONBOARDING_KEY } from "../../constants/onboarding";
import { CUSTOM_PROFILE_ID } from "../../data/povData";

export default function PovSwitcher({ compact = false, showPersonalize = true }) {
  const { profiles, povId, setPovId, hasCustomProfile } = usePov();
  const navigate = useNavigate();
  const selectId = useId();

  const restartOnboarding = () => {
    localStorage.removeItem(ONBOARDING_KEY);
    navigate("/welfare/onboarding");
  };

  const handleSwitch = (nextValue) => {
    if (nextValue === CUSTOM_PROFILE_ID && !hasCustomProfile) {
      restartOnboarding();
      return;
    }
    setPovId(nextValue);
  };

  return (
    <div className={`flex items-center gap-1.5 ${compact ? "w-full" : ""}`}>
      {!compact ? (
        <label htmlFor={selectId} className="shrink-0 text-xs font-semibold text-text-muted">
          Switch user:
        </label>
      ) : null}
      <select
        id={selectId}
        value={povId}
        onChange={(e) => handleSwitch(e.target.value)}
        className={`mx-0 min-w-0 shrink rounded-md border border-border bg-surface py-1.5 pl-2.5 pr-8 text-sm font-semibold text-text-primary outline-none ${
          compact ? "w-full max-w-none" : "max-w-[220px]"
        }`}
        aria-label="Select employee perspective"
      >
        {profiles.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name} — {item.role}
          </option>
        ))}
        <option value={CUSTOM_PROFILE_ID}>
          {hasCustomProfile ? "Custom profile — Personalized" : "Custom profile — Run onboarding"}
        </option>
      </select>
      {showPersonalize ? (
        <button
          type="button"
          onClick={restartOnboarding}
          className="rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-text-primary transition hover:bg-surface-2"
          aria-label="Restart onboarding flow"
        >
          Personalize
        </button>
      ) : null}
    </div>
  );
}
