import { usePov } from "../../context/PovContext";

export default function PovSwitcher() {
  const { profile, profiles, povId, setPovId } = usePov();

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
      >
        {profiles.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      <span className="text-xs text-text-muted">{profile.role}</span>
    </div>
  );
}
