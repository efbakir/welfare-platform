import { useNavigate } from "react-router-dom";
import { usePov } from "../../context/PovContext";
import { ONBOARDING_KEY } from "../../constants/onboarding";

export default function PovSwitcher() {
  const { profiles, povId, setPovId } = usePov();
  const navigate = useNavigate();

  const restartOnboarding = () => {
    localStorage.removeItem(ONBOARDING_KEY);
    navigate("/welfare/onboarding");
  };

  return (
    <div className="flex items-center gap-1.5 rounded-full bg-white px-3 py-2 shadow-[0_8px_20px_rgb(0,0,0,0.04)]">
      <label htmlFor="pov-select" className="shrink-0 text-xs font-semibold text-text-muted">
        Viewing as:
      </label>
      <select
        id="pov-select"
        value={povId}
        onChange={(e) => setPovId(e.target.value)}
        className="mx-0 min-w-0 max-w-[180px] shrink rounded-full bg-blue-tint py-1 pl-2.5 pr-7 text-sm font-semibold text-text-primary outline-none"
        aria-label="Select employee perspective"
      >
        {profiles.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name} — {item.role}
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={restartOnboarding}
        className="rounded-full bg-blue px-3 py-1 text-xs font-semibold text-white transition hover:bg-blue-dark"
        aria-label="Restart onboarding flow"
      >
        Personalize
      </button>
    </div>
  );
}
