import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Badge from "../components/ui/Badge";
import { Card, CardBody } from "../components/ui/Card";
import { usePov } from "../context/PovContext";
import { ONBOARDING_ANSWERS_KEY, ONBOARDING_KEY } from "../constants/onboarding";
import { createCustomProfileFromAnswers, CUSTOM_PROFILE_ID } from "../data/povData";

const countries = ["Italy", "Spain", "France", "Germany", "Portugal"];
const locationModes = ["Remote hub", "Office city"];
const workModes = ["Remote", "Hybrid", "On-site"];
const roleModes = [
  { id: "ic", label: "Individual contributor" },
  { id: "manager", label: "Manager" },
];
const pressureModes = ["Low", "Medium", "High"];
const goalHorizons = ["This month", "This quarter"];
const lifeEvents = ["Caregiving", "Parenthood", "Relocation", "Burnout risk", "Heavy commute", "None right now"];
const recognitionPreferences = ["Private appreciation", "Tangible rewards", "Growth opportunities"];
const communityPreferences = ["Solo", "Small groups", "Open community"];
const privacyPreferences = ["High", "Medium", "Low"];

const followUpByLifeEvent = {
  Caregiving: {
    question: "Where is support most urgent?",
    options: ["Childcare", "Eldercare", "Household load"],
  },
  Parenthood: {
    question: "Where is support most urgent?",
    options: ["Childcare", "Eldercare", "Household load"],
  },
  Relocation: {
    question: "What is hardest currently?",
    options: ["Housing setup", "Transport", "Admin/paperwork"],
  },
  "Burnout risk": {
    question: "What would help first?",
    options: ["Counseling", "Schedule recovery", "Manager coaching"],
  },
  "Heavy commute": {
    question: "Main pain point?",
    options: ["Cost", "Time", "Shift-fit options"],
  },
};

function ChoiceGroup({ options, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((item) => {
        const label = typeof item === "string" ? item : item.label;
        const id = typeof item === "string" ? item : item.id;
        const active = value === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={`rounded-md px-3 py-2 text-sm font-semibold transition ${active ? "bg-blue text-white" : "bg-violet-tint text-text-secondary"}`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

function LifeEventSelector({ value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {lifeEvents.map((event) => {
        const active = value.includes(event);
        return (
          <button
            key={event}
            type="button"
            onClick={() => {
              if (event === "None right now") {
                onChange(active ? [] : ["None right now"]);
                return;
              }

              const base = value.filter((item) => item !== "None right now");
              const next = active ? base.filter((item) => item !== event) : [...base, event].slice(0, 2);
              onChange(next);
            }}
            className={`rounded-md px-3 py-2 text-sm font-semibold transition ${active ? "bg-blue text-white" : "bg-violet-tint text-text-secondary"}`}
          >
            {event}
          </button>
        );
      })}
    </div>
  );
}

export default function Onboarding() {
  const navigate = useNavigate();
  const { setCustomProfile, setPovId } = usePov();

  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    preferredName: "",
    country: "Italy",
    locationMode: "Remote hub",
    city: "Milan",
    workMode: "Hybrid",
    roleReality: "ic",
    timePressure: "Medium",
    goalHorizon: "This month",
    lifeEvents: ["None right now"],
    budgetComfort: 50,
    lifeEventFollowUp: "",
    recognitionPreference: "Growth opportunities",
    communityPreference: "Solo",
    privacyComfort: "Medium",
    aiConsent: true,
  });

  const totalSteps = 5;
  const progress = Math.round(((step + 1) / totalSteps) * 100);

  const primaryLifeEvent = form.lifeEvents.find((item) => item !== "None right now") || null;
  const followUpConfig = primaryLifeEvent ? followUpByLifeEvent[primaryLifeEvent] : null;

  const previewProfile = useMemo(() => createCustomProfileFromAnswers(form), [form]);

  const stepMeta = [
    {
      title: "Set up your welfare in ~3-5 min",
      helper: "We ask only what improves relevance. You can edit anytime.",
    },
    {
      title: "How does work actually look for you?",
      helper: "This helps us match benefits to your weekly constraints.",
    },
    {
      title: "What is most relevant right now?",
      helper: "Choose up to 2. We only use this for better benefit matching.",
    },
    {
      title: "How should this experience feel?",
      helper: "Choose your comfort level and collaboration style.",
    },
    {
      title: "Here's your welfare setup",
      helper: "Based on your profile and current constraints.",
    },
  ][step];

  const canContinue = useMemo(() => {
    if (step === 0) {
      return form.preferredName.trim().length > 1 && form.country && form.locationMode;
    }
    if (step === 2) {
      if (form.lifeEvents.length === 0) return false;
      if (followUpConfig) return Boolean(form.lifeEventFollowUp);
      return true;
    }
    if (step === 3) {
      return Boolean(form.recognitionPreference && form.communityPreference && form.privacyComfort);
    }
    return true;
  }, [form, followUpConfig, step]);

  const next = () => {
    if (!canContinue) return;
    setStep((current) => Math.min(totalSteps - 1, current + 1));
  };

  const back = () => setStep((current) => Math.max(0, current - 1));

  const finish = () => {
    const customProfile = createCustomProfileFromAnswers(form);
    localStorage.setItem(ONBOARDING_KEY, "1");
    localStorage.setItem(ONBOARDING_ANSWERS_KEY, JSON.stringify(form));
    setCustomProfile(customProfile);
    setPovId(CUSTOM_PROFILE_ID);
    navigate("/welfare/dashboard", { replace: true });
  };

  return (
    <div className="mx-auto max-w-4xl">
      <Card>
        <CardBody className="flex min-h-[740px] flex-col gap-5">
          <div>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-text-muted">Step {step + 1} / {totalSteps}</p>
              <p className="text-sm font-semibold text-text-muted">~3-5 min</p>
            </div>
            <div className="h-2 rounded-sm bg-[#e6ebf2]" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} aria-label="Onboarding progress">
              <div className="h-full rounded-sm bg-blue transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-text-primary">{stepMeta.title}</h1>
            <p className="mt-1 text-sm text-text-secondary">{stepMeta.helper}</p>
          </div>

          <div className="flex-1 space-y-4">
            {step === 0 && (
              <>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-text-primary">Preferred name</label>
                  <input
                    value={form.preferredName}
                    onChange={(e) => setForm((prev) => ({ ...prev, preferredName: e.target.value }))}
                    className="w-full rounded-md bg-[#f1f5f9] px-4 py-2.5 text-sm outline-none"
                    placeholder="e.g. Elena"
                  />
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-text-primary">Work country</label>
                    <select
                      value={form.country}
                      onChange={(e) => setForm((prev) => ({ ...prev, country: e.target.value }))}
                      className="w-full rounded-md bg-[#f1f5f9] px-4 py-2.5 text-sm outline-none"
                    >
                      {countries.map((country) => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-semibold text-text-primary">Location mode</label>
                    <ChoiceGroup
                      options={locationModes}
                      value={form.locationMode}
                      onChange={(locationMode) => setForm((prev) => ({ ...prev, locationMode }))}
                    />
                  </div>
                </div>

                {form.locationMode === "Office city" && (
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-text-primary">Office city</label>
                    <input
                      value={form.city}
                      onChange={(e) => setForm((prev) => ({ ...prev, city: e.target.value }))}
                      className="w-full rounded-md bg-[#f1f5f9] px-4 py-2.5 text-sm outline-none"
                      placeholder="e.g. Milan"
                    />
                  </div>
                )}
              </>
            )}

            {step === 1 && (
              <>
                <div>
                  <p className="mb-1 text-sm font-semibold text-text-primary">Work mode</p>
                  <ChoiceGroup
                    options={workModes}
                    value={form.workMode}
                    onChange={(workMode) => setForm((prev) => ({ ...prev, workMode }))}
                  />
                </div>

                <div>
                  <p className="mb-1 text-sm font-semibold text-text-primary">Role reality</p>
                  <ChoiceGroup
                    options={roleModes}
                    value={form.roleReality}
                    onChange={(roleReality) => setForm((prev) => ({ ...prev, roleReality }))}
                  />
                </div>

                <div>
                  <p className="mb-1 text-sm font-semibold text-text-primary">Time pressure</p>
                  <ChoiceGroup
                    options={pressureModes}
                    value={form.timePressure}
                    onChange={(timePressure) => setForm((prev) => ({ ...prev, timePressure }))}
                  />
                </div>

                <div>
                  <p className="mb-1 text-sm font-semibold text-text-primary">Goal horizon</p>
                  <ChoiceGroup
                    options={goalHorizons}
                    value={form.goalHorizon}
                    onChange={(goalHorizon) => setForm((prev) => ({ ...prev, goalHorizon }))}
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <p className="mb-1 text-sm font-semibold text-text-primary">Life events (max 2)</p>
                  <LifeEventSelector
                    value={form.lifeEvents}
                    onChange={(nextLifeEvents) =>
                      setForm((prev) => ({
                        ...prev,
                        lifeEvents: nextLifeEvents,
                        lifeEventFollowUp: "",
                      }))
                    }
                  />
                </div>

                <div className="rounded-xl bg-violet-tint p-4">
                  <p className="text-sm font-semibold text-text-primary">Budget comfort</p>
                  <p className="text-xs text-text-secondary">Need tangible support now / Can optimize for long-term value</p>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={form.budgetComfort}
                    onChange={(e) => setForm((prev) => ({ ...prev, budgetComfort: Number(e.target.value) }))}
                    className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-sm"
                    style={{ background: `linear-gradient(90deg, var(--color-blue) 0%, var(--color-blue-mid) ${form.budgetComfort}%, #e8eaf7 ${form.budgetComfort}%, #e8eaf7 100%)` }}
                  />
                </div>

                {followUpConfig && (
                  <div className="rounded-xl bg-cyan-tint p-4">
                    <p className="mb-2 text-sm font-semibold text-text-primary">{followUpConfig.question}</p>
                    <ChoiceGroup
                      options={followUpConfig.options}
                      value={form.lifeEventFollowUp}
                      onChange={(lifeEventFollowUp) => setForm((prev) => ({ ...prev, lifeEventFollowUp }))}
                    />
                  </div>
                )}
              </>
            )}

            {step === 3 && (
              <>
                <div>
                  <p className="mb-1 text-sm font-semibold text-text-primary">Recognition preference</p>
                  <ChoiceGroup
                    options={recognitionPreferences}
                    value={form.recognitionPreference}
                    onChange={(recognitionPreference) => setForm((prev) => ({ ...prev, recognitionPreference }))}
                  />
                </div>

                <div>
                  <p className="mb-1 text-sm font-semibold text-text-primary">Community preference</p>
                  <ChoiceGroup
                    options={communityPreferences}
                    value={form.communityPreference}
                    onChange={(communityPreference) => setForm((prev) => ({ ...prev, communityPreference }))}
                  />
                </div>

                <div>
                  <p className="mb-1 text-sm font-semibold text-text-primary">Privacy comfort</p>
                  <ChoiceGroup
                    options={privacyPreferences}
                    value={form.privacyComfort}
                    onChange={(privacyComfort) => setForm((prev) => ({ ...prev, privacyComfort }))}
                  />
                </div>

                <div className="rounded-xl bg-white/80 p-4 shadow-[var(--shadow-xs)]">
                  <label className="flex items-center justify-between gap-3">
                    <span>
                      <p className="text-sm font-semibold text-text-primary">AI suggestions consent</p>
                      <p className="text-xs text-text-secondary">Use my profile + work context to suggest benefits.</p>
                    </span>
                    <button
                      type="button"
                      aria-pressed={form.aiConsent}
                      onClick={() => setForm((prev) => ({ ...prev, aiConsent: !prev.aiConsent }))}
                      className={`relative h-7 w-12 rounded-md transition ${form.aiConsent ? "bg-blue" : "bg-[#dfe3f3]"}`}
                    >
                      <span className={`absolute top-1 h-5 w-5 rounded-sm bg-white shadow transition ${form.aiConsent ? "left-6" : "left-1"}`} />
                    </button>
                  </label>
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="blue">{form.workMode}</Badge>
                  <Badge variant="green">{form.roleReality === "manager" ? "Manager" : "IC"}</Badge>
                  <Badge variant="neutral">{form.lifeEvents[0] || "None right now"}</Badge>
                  <Badge variant="neutral">Budget comfort {form.budgetComfort}</Badge>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  {previewProfile.recommended.slice(0, 5).map((item) => (
                    <div key={item.id} className="rounded-xl bg-white/80 p-4 shadow-[var(--shadow-xs)]">
                      <p className="text-base font-semibold text-text-primary">{item.title}</p>
                      <p className="mt-1 text-sm text-text-secondary">{item.reason}</p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {(item.chips || []).slice(0, 3).map((chip) => (
                          <span key={`${item.id}-${chip}`} className="rounded-sm bg-violet-tint px-2 py-1 text-[11px] font-medium text-text-secondary">
                            Because you said: {chip}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {form.communityPreference === "Small groups" || form.communityPreference === "Open community" ? (
                  <div className="rounded-xl bg-cyan-tint p-4 text-sm text-text-secondary">
                    Community suggestion enabled: we will show curated social options aligned with {form.communityPreference.toLowerCase()}.
                  </div>
                ) : (
                  <div className="rounded-xl bg-violet-tint p-4 text-sm text-text-secondary">
                    Community suggestions minimized based on your preference.
                  </div>
                )}
              </>
            )}
          </div>

          <div className="sticky bottom-0 grid w-full grid-cols-[1fr_220px] items-center gap-4 border-t border-[#e8edf3] bg-white pt-4">
            <div>
              <button
                type="button"
                onClick={back}
                disabled={step === 0}
                className="rounded-md px-4 py-2 text-sm text-text-secondary disabled:opacity-40"
              >
                Back
              </button>
            </div>

            <div className="flex justify-end">
              {step < totalSteps - 1 ? (
                <button
                  type="button"
                  onClick={next}
                  disabled={!canContinue}
                  className="w-full min-w-[220px] max-w-[220px] rounded-md bg-blue px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="button"
                  onClick={finish}
                  className="w-full min-w-[220px] max-w-[220px] rounded-md bg-blue px-4 py-2 text-sm font-semibold text-white"
                >
                  Start with this setup
                </button>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
