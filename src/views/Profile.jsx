import { useState } from "react";
import PageHeader from "../components/layout/PageHeader";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import { Card, CardBody } from "../components/ui/Card";
import Icon from "../components/ui/Icon";
import { usePov } from "../context/PovContext";

const lifeStages = ["Single", "Partnered", "Married", "Parent", "Caregiver"];
const lifeIcons = {
  Single: "user",
  Partnered: "users",
  Married: "users",
  Parent: "family",
  Caregiver: "wellness",
};

const workModes = ["Remote", "Hybrid", "On-site"];
const focusGoals = ["Wellbeing", "Learning", "Family", "Community", "Flexibility", "Time savings"];

function ToggleRow({ icon, label, description, enabled, onToggle, actionLabel = "Manage" }) {
  return (
    <div className="ui-panel flex items-center justify-between gap-3 p-3">
      <div className="flex min-w-0 items-start gap-2.5">
        <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-violet-tint text-blue">
          <Icon name={icon} className="h-4 w-4" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-text-primary">{label}</p>
          <p className="text-xs text-text-secondary">{description}</p>
        </div>
      </div>
      <button
        type="button"
        aria-label={`Toggle ${label}`}
        aria-pressed={enabled}
        onClick={onToggle}
        className={`relative h-7 w-12 rounded-full transition ${enabled ? "bg-blue" : "bg-[#dfe3f3]"}`}
      >
        <span
          className={`toggle-thumb absolute top-1 h-5 w-5 rounded-full bg-white shadow ${enabled ? "active left-6" : "left-1"}`}
          aria-hidden="true"
        />
        <span className="sr-only">{actionLabel}</span>
      </button>
    </div>
  );
}

export default function Profile() {
  const { profile } = usePov();
  const [lifeStage, setLifeStage] = useState(profile.profileAnswers.lifeStage);
  const [workMode, setWorkMode] = useState(profile.profileAnswers.workMode);
  const [focus, setFocus] = useState(profile.profileAnswers.focus);
  const [socialStyle, setSocialStyle] = useState(profile.profileAnswers.socialStyle);
  const [contactToggles, setContactToggles] = useState({
    email: true,
    phone: profile.workMode !== "Remote",
    profilePhoto: true,
  });
  const [saved, setSaved] = useState(false);

  return (
    <div className="mx-auto w-full max-w-[1240px] space-y-5">
      <PageHeader
        title="Profile"
        subtitle="Update your context to keep recommendations accurate and explainable."
        actions={<Button size="sm" onClick={() => setSaved(true)}>Save changes</Button>}
      />

      <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <Card>
          <CardBody className="space-y-5">
            <div className="rounded-xl bg-violet-tint p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-blue text-base font-semibold text-white">
                    {profile.avatar}
                  </span>
                  <div>
                    <p className="text-lg font-semibold text-text-primary">{profile.name}</p>
                    <p className="text-sm text-text-secondary">{profile.role} · {profile.tenure} · {profile.workMode}</p>
                  </div>
                </div>
                <Badge variant="blue">Viewing as {profile.lifeStage}</Badge>
              </div>
            </div>

            <div className="ui-panel p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="inline-flex items-center gap-1 text-base font-semibold text-text-primary">
                  <Icon name="spark" className="h-4 w-4" />
                  Has life changed recently?
                </p>
                <Button variant="outline" size="sm">Update now</Button>
              </div>
              <p className="text-sm text-text-secondary">Tell us so we can prioritize better benefits and adjust credit suggestions.</p>
            </div>

            <div className="ui-panel p-4">
              <p className="mb-3 text-sm font-semibold text-text-primary">Life stage</p>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {lifeStages.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setLifeStage(item)}
                    className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition ${
                      item === lifeStage ? "bg-blue text-white" : "bg-[#f3f5ff] text-text-secondary hover:bg-blue-tint"
                    }`}
                  >
                    <Icon name={lifeIcons[item]} className="h-4 w-4" />
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <div className="ui-panel p-4">
                <p className="mb-2 text-xs font-medium text-text-muted">Work mode</p>
                <div className="flex flex-wrap gap-2">
                  {workModes.map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setWorkMode(mode)}
                      className={`rounded-md px-3 py-1.5 text-xs font-semibold ${
                        workMode === mode ? "bg-blue text-white" : "bg-violet-tint text-text-secondary"
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              <div className="ui-panel p-4">
                <p className="mb-2 text-xs font-medium text-text-muted">Primary goal</p>
                <select
                  value={focus}
                  onChange={(e) => setFocus(e.target.value)}
                  className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary outline-none"
                >
                  {focusGoals.map((goal) => (
                    <option key={goal} value={goal}>{goal}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="ui-panel p-4">
              <p className="mb-3 text-sm font-semibold text-text-primary">Visibility & contact preferences</p>
              <div className="space-y-2">
                <ToggleRow
                  icon="user"
                  label="Email visibility"
                  description="Allow colleagues and HR to reach you for relevant welfare updates."
                  enabled={contactToggles.email}
                  onToggle={() => setContactToggles((prev) => ({ ...prev, email: !prev.email }))}
                />
                <ToggleRow
                  icon="calendar"
                  label="Phone visibility"
                  description="Use phone channel for urgent reminders and expiring credit notices."
                  enabled={contactToggles.phone}
                  onToggle={() => setContactToggles((prev) => ({ ...prev, phone: !prev.phone }))}
                />
                <ToggleRow
                  icon="spark"
                  label="Profile photo visibility"
                  description="Helps social features feel more familiar in activity and guild events."
                  enabled={contactToggles.profilePhoto}
                  onToggle={() => setContactToggles((prev) => ({ ...prev, profilePhoto: !prev.profilePhoto }))}
                />
              </div>
            </div>

            <div className="ui-panel-tint bg-cyan-tint p-3">
              <p className="text-xs font-medium text-text-muted">Community style</p>
              <p className="mt-1 text-sm font-semibold text-text-primary">{socialStyle}</p>
              <div className="mt-2 flex gap-2">
                {["Solo", "Small groups", "Team events", "Async experiences", "Family activities"].map((style) => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => setSocialStyle(style)}
                    className={`rounded-md px-2.5 py-1 text-xs font-semibold ${
                      socialStyle === style ? "bg-blue text-white" : "bg-white/80 text-text-secondary"
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {saved && <p className="text-sm font-semibold text-green">Recommendations refreshed.</p>}
          </CardBody>
        </Card>

        <Card>
          <CardBody className="space-y-3">
            <h3 className="text-lg font-semibold text-text-primary">Personalization logic</h3>
            <div className="ui-panel p-3">
              <p className="text-xs font-medium text-text-muted">Because you are</p>
              <p className="mt-1 text-sm font-semibold text-text-primary">{lifeStage} · {workMode}</p>
            </div>
            <div className="ui-panel p-3">
              <p className="text-xs font-medium text-text-muted">Because your focus is</p>
              <p className="mt-1 text-sm font-semibold text-text-primary">{focus}</p>
            </div>
            <div className="ui-panel p-3">
              <p className="text-xs font-medium text-text-muted">Because your community preference is</p>
              <p className="mt-1 text-sm font-semibold text-text-primary">{socialStyle}</p>
            </div>
            <div className="rounded-xl bg-violet-tint p-3 text-sm text-text-secondary">
              We use this to prioritize the right benefits. No sensitive medical data is required.
            </div>
            <div className="rounded-xl bg-cyan-tint p-3 text-sm text-text-secondary">
              Changes here refresh recommendations in Dashboard, Wallet suggestions, and Marketplace sorting.
            </div>
          </CardBody>
        </Card>
      </div>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight text-text-primary">Recommended for you</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {profile.recommended.map((item) => (
            <Card key={item.id}>
              <CardBody className="space-y-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-blue-tint text-blue">
                  <Icon name={item.title.toLowerCase().includes("support") ? "wellness" : "spark"} className="h-4.5 w-4.5" />
                </span>
                <p className="text-lg font-semibold text-text-primary">{item.title}</p>
                <p className="text-sm text-text-secondary">{item.reason}</p>
                <p className="rounded-sm bg-violet-tint px-2 py-1 text-xs text-text-secondary">
                  Because you selected: {focus}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
