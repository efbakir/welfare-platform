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
    <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-[0_8px_20px_rgb(0,0,0,0.04)]">
      <label htmlFor="pov-select" className="text-xs font-semibold text-text-muted">
        Viewing as:
      </label>
      <select
        id="pov-select"
        value={povId}
        onChange={(e) => setPovId(e.target.value)}
        className="rounded-full bg-blue-tint px-3 py-1 text-sm font-semibold text-text-primary outline-none"
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
