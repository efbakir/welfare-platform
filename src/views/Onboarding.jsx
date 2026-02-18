import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { Card, CardBody } from "../components/ui/Card";
import { usePov } from "../context/PovContext";
import { ONBOARDING_KEY } from "../constants/onboarding";

const lifeContexts = ["Parenting", "Caregiving", "Relocation", "Financial planning", "High workload", "None"];
const interests = ["Fitness", "Cooking", "Reading", "Gaming", "Volunteering", "Travel", "Music", "Learning"];
const strengths = ["Mentoring", "Problem-solving", "Empathy", "Execution", "Creativity", "Leadership"];
const recognitionStyles = ["Private note", "Team shoutout", "Tangible rewards", "Growth opportunities"];
const motivations = ["Learning", "Wellbeing", "Social", "Financial", "Impact"];

function PillMulti({ options, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((item) => {
        const active = value.includes(item);
        return (
          <button
            key={item}
            type="button"
            onClick={() => {
              onChange(active ? value.filter((v) => v !== item) : [...value, item]);
            }}
            className={`rounded-full px-3 py-2 text-sm font-medium transition ${active ? "bg-blue text-white" : "bg-[#eef2f7] text-text-secondary"}`}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}

export default function Onboarding() {
  const { profile } = usePov();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    preferredName: profile.name,
    department: "",
    location: "",
    advanced: true,
    workMode: profile.workMode,
    flexibility: 50,
    lifeContext: [],
    household: "",
    mobility: "",
    interests: [],
    strengths: [],
    recognition: [],
    motivation: [],
    community: "",
    privacy: 60,
    aiConsent: true,
    budgetComfort: 50,
    goalHorizon: "This quarter",
    rewardMix: 50,
  });

  const totalSteps = 8;
  const progress = Math.round(((step + 1) / totalSteps) * 100);

  const stepTitle = useMemo(() => {
    const titles = [
      "Welcome",
      "Basic identity",
      "Work context",
      "Life context",
      "Interests & strengths",
      "Recognition & motivation",
      "Community & privacy",
      "Your personalized preview",
    ];
    return titles[step];
  }, [step]);

  const next = () => setStep((s) => Math.min(totalSteps - 1, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  const finish = () => {
    localStorage.setItem(ONBOARDING_KEY, "1");
    localStorage.setItem("welfare_onboarding_answers", JSON.stringify(form));
    navigate("/welfare/dashboard", { replace: true });
  };

  return (
    <div className="mx-auto max-w-3xl">
      <Card>
        <CardBody className="space-y-5">
          <div>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-text-muted">Step {step + 1} / {totalSteps}</p>
              <p className="text-sm font-semibold text-text-muted">~5-7 min</p>
            </div>
            <div className="h-2 rounded-full bg-[#e6ebf2]">
              <div className="h-full rounded-full bg-blue transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-text-primary">{stepTitle}</h1>
            <p className="mt-1 text-sm text-text-secondary">A quick setup to make welfare feel personally relevant from day one.</p>
          </div>

          {step === 0 && (
            <div className="space-y-4">
              <div className="rounded-2xl bg-[#f8fafc] p-4">
                <p className="text-sm text-text-secondary">We will only ask what improves recommendations. You can edit everything later.</p>
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-text-primary">What should we call you?</label>
                <input
                  value={form.preferredName}
                  onChange={(e) => setForm((f) => ({ ...f, preferredName: e.target.value }))}
                  className="w-full rounded-2xl bg-[#f1f5f9] px-4 py-2.5 outline-none"
                />
              </div>
              <div className="rounded-2xl bg-[#f8fafc] p-4">
                <p className="mb-2 text-sm font-semibold text-text-primary">Advanced personalization</p>
                <div className="flex gap-2">
                  <button type="button" onClick={() => setForm((f) => ({ ...f, advanced: false }))} className={`rounded-full px-4 py-2 text-sm ${!form.advanced ? "bg-blue text-white" : "bg-[#eef2f7] text-text-secondary"}`}>Basic setup</button>
                  <button type="button" onClick={() => setForm((f) => ({ ...f, advanced: true }))} className={`rounded-full px-4 py-2 text-sm ${form.advanced ? "bg-blue text-white" : "bg-[#eef2f7] text-text-secondary"}`}>Advanced personalization</button>
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-semibold text-text-primary">Team / department</label>
                <input value={form.department} onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))} className="w-full rounded-2xl bg-[#f1f5f9] px-4 py-2.5 outline-none" placeholder="e.g. Product" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-text-primary">Location</label>
                <input value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} className="w-full rounded-2xl bg-[#f1f5f9] px-4 py-2.5 outline-none" placeholder="City or Remote hub" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <p className="mb-2 text-sm font-semibold text-text-primary">How do you usually work?</p>
                <div className="flex gap-2">
                  {["Remote", "Hybrid", "On-site"].map((mode) => (
                    <button key={mode} type="button" onClick={() => setForm((f) => ({ ...f, workMode: mode }))} className={`rounded-full px-4 py-2 text-sm ${form.workMode === mode ? "bg-blue text-white" : "bg-[#eef2f7] text-text-secondary"}`}>{mode}</button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-1 text-sm font-semibold text-text-primary">How much flexibility do you need this quarter?</p>
                <input type="range" min={0} max={100} value={form.flexibility} onChange={(e) => setForm((f) => ({ ...f, flexibility: Number(e.target.value) }))} className="w-full accent-[#0057b8]" />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <p className="mb-2 text-sm font-semibold text-text-primary">Which situations are relevant right now?</p>
                <PillMulti options={lifeContexts} value={form.lifeContext} onChange={(nextValue) => setForm((f) => ({ ...f, lifeContext: nextValue }))} />
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <input value={form.household} onChange={(e) => setForm((f) => ({ ...f, household: e.target.value }))} className="rounded-2xl bg-[#f1f5f9] px-4 py-2.5 outline-none" placeholder="Household setup" />
                <input value={form.mobility} onChange={(e) => setForm((f) => ({ ...f, mobility: e.target.value }))} className="rounded-2xl bg-[#f1f5f9] px-4 py-2.5 outline-none" placeholder="Mobility preference" />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div>
                <p className="mb-2 text-sm font-semibold text-text-primary">Interests and hobbies</p>
                <PillMulti options={interests} value={form.interests} onChange={(nextValue) => setForm((f) => ({ ...f, interests: nextValue }))} />
              </div>
              <div>
                <p className="mb-2 text-sm font-semibold text-text-primary">Skills and strengths</p>
                <PillMulti options={strengths} value={form.strengths} onChange={(nextValue) => setForm((f) => ({ ...f, strengths: nextValue }))} />
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <div>
                <p className="mb-2 text-sm font-semibold text-text-primary">How do you like to be recognized?</p>
                <PillMulti options={recognitionStyles} value={form.recognition} onChange={(nextValue) => setForm((f) => ({ ...f, recognition: nextValue }))} />
              </div>
              <div>
                <p className="mb-2 text-sm font-semibold text-text-primary">What motivates you most?</p>
                <PillMulti options={motivations} value={form.motivation} onChange={(nextValue) => setForm((f) => ({ ...f, motivation: nextValue }))} />
              </div>
              {form.advanced && (
                <div className="rounded-2xl bg-secondary-tint p-4">
                  <p className="text-sm font-semibold text-secondary">Advanced personalization</p>
                  <div className="mt-2 space-y-3">
                    <div>
                      <p className="text-sm text-text-secondary">Budget comfort</p>
                      <input type="range" min={0} max={100} value={form.budgetComfort} onChange={(e) => setForm((f) => ({ ...f, budgetComfort: Number(e.target.value) }))} className="w-full accent-[#c00b6c]" />
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary">Goal horizon</p>
                      <div className="flex gap-2">
                        {["This month", "This quarter", "This year"].map((h) => (
                          <button key={h} type="button" onClick={() => setForm((f) => ({ ...f, goalHorizon: h }))} className={`rounded-full px-3 py-1.5 text-xs ${form.goalHorizon === h ? "bg-secondary text-white" : "bg-white text-text-secondary"}`}>{h}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 6 && (
            <div className="space-y-4">
              <div>
                <p className="mb-2 text-sm font-semibold text-text-primary">Community preference</p>
                <div className="flex gap-2">
                  {["Solo", "Small groups", "Open community"].map((c) => (
                    <button key={c} type="button" onClick={() => setForm((f) => ({ ...f, community: c }))} className={`rounded-full px-4 py-2 text-sm ${form.community === c ? "bg-blue text-white" : "bg-[#eef2f7] text-text-secondary"}`}>{c}</button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-1 text-sm font-semibold text-text-primary">Privacy comfort level</p>
                <input type="range" min={0} max={100} value={form.privacy} onChange={(e) => setForm((f) => ({ ...f, privacy: Number(e.target.value) }))} className="w-full accent-[#0057b8]" />
              </div>
              <label className="flex items-center gap-2 text-sm text-text-secondary">
                <input type="checkbox" checked={form.aiConsent} onChange={(e) => setForm((f) => ({ ...f, aiConsent: e.target.checked }))} />
                AI can suggest opportunities based on my profile
              </label>
            </div>
          )}

          {step === 7 && (
            <div className="space-y-4">
              <p className="text-sm text-text-secondary">Here’s what your welfare experience will look like.</p>
              <div className="grid gap-3 md:grid-cols-2">
                {profile.recommended.slice(0, 2).map((rec) => (
                  <div key={rec.id} className="rounded-2xl bg-[#f8fafc] p-4">
                    <p className="text-sm font-semibold text-text-primary">{rec.title}</p>
                    <p className="text-xs text-text-muted">{rec.reason}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl bg-blue-tint p-4 text-sm text-text-secondary">
                Based on your inputs: {form.workMode}, {form.lifeContext.slice(0, 2).join(", ") || "general context"}, and {form.motivation.slice(0, 2).join(", ") || "your goals"}.
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <button type="button" onClick={back} disabled={step === 0} className="rounded-full px-4 py-2 text-sm text-text-secondary disabled:opacity-40">Back</button>
            <div className="flex gap-2">
              {step < totalSteps - 1 && (
                <button type="button" onClick={next} className="rounded-full bg-blue px-4 py-2 text-sm font-semibold text-white">Continue</button>
              )}
              {step === totalSteps - 1 && (
                <button type="button" onClick={finish} className="rounded-full bg-blue px-4 py-2 text-sm font-semibold text-white">Start my experience</button>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
