import { useState } from "react";
import PageHeader from "../components/layout/PageHeader";
import Button from "../components/ui/Button";
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

export default function Profile() {
  const { profile } = usePov();
  const [lifeStage, setLifeStage] = useState(profile.profileAnswers.lifeStage);
  const [saved, setSaved] = useState(false);

  return (
    <div className="mx-auto w-full max-w-[1220px] space-y-6">
      <PageHeader
        eyebrow="Life Stage Triggers"
        title="Profile"
        subtitle="We use this to prioritize the right benefits"
        actions={<Button size="sm" onClick={() => setSaved(true)}>Save profile</Button>}
      />

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardBody className="space-y-4">
            <div className="rounded-md bg-violet-tint p-4">
              <p className="inline-flex items-center gap-1 text-lg font-semibold text-text-primary">
                <Icon name="spark" className="h-5 w-5" />
                Has life changed recently?
              </p>
              <p className="mt-1 text-sm text-text-secondary">Tell us so we can find better benefits for you.</p>
              <div className="mt-3">
                <Button variant="outline" size="sm">Update now</Button>
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-text-primary">Life stage</p>
              <div className="flex flex-wrap gap-2">
                {lifeStages.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setLifeStage(item)}
                    className={`px-4 py-2 text-sm font-semibold ${item === lifeStage ? "bg-blue text-white" : "bg-[#f1f5f9] text-text-secondary"}`}
                  >
                    <span className="mr-1.5 inline-flex align-middle">
                      <Icon name={lifeIcons[item]} className="h-4 w-4" />
                    </span>
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-md bg-cyan-tint p-3 text-sm text-text-secondary"><span className="mr-1 inline-flex"><Icon name="calendar" className="h-4 w-4" /></span>Work mode: {profile.profileAnswers.workMode}</div>
              <div className="rounded-md bg-violet-tint p-3 text-sm text-text-secondary"><span className="mr-1 inline-flex"><Icon name="education" className="h-4 w-4" /></span>Primary goal: {profile.profileAnswers.focus}</div>
              <div className="rounded-md bg-green-tint p-3 text-sm text-text-secondary"><span className="mr-1 inline-flex"><Icon name="users" className="h-4 w-4" /></span>Social preference: {profile.profileAnswers.socialStyle}</div>
              <div className="rounded-md bg-blue-tint p-3 text-sm text-text-secondary"><span className="mr-1 inline-flex"><Icon name="user" className="h-4 w-4" /></span>Current POV: {profile.name}</div>
            </div>

            {saved && <p className="text-sm font-semibold text-green">Recommendations refreshed.</p>}
          </CardBody>
        </Card>

        <Card>
          <CardBody className="space-y-3">
            <h3 className="text-lg font-semibold text-text-primary">How personalization works</h3>
            <div className="rounded-md bg-[rgba(255,255,255,0.78)] p-3 text-sm text-text-secondary shadow-[var(--shadow-xs)]">
              We prioritize benefits using your life stage, work mode, and goals.
            </div>
            <div className="rounded-md bg-[rgba(255,255,255,0.78)] p-3 text-sm text-text-secondary shadow-[var(--shadow-xs)]">
              Changes here refresh your recommended list in Dashboard and Marketplace.
            </div>
            <div className="rounded-md bg-[rgba(255,255,255,0.78)] p-3 text-sm text-text-secondary shadow-[var(--shadow-xs)]">
              We avoid sensitive medical data and focus on practical lifestyle signals.
            </div>
          </CardBody>
        </Card>
      </div>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight text-text-primary">Recommended for you</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {profile.recommended.map((item) => (
            <Card key={item.id}>
              <CardBody className="space-y-1.5">
                <span className="inline-flex h-9 w-9 items-center justify-center bg-blue-tint text-blue">
                  <Icon name={item.title.toLowerCase().includes("support") ? "wellness" : "spark"} className="h-4.5 w-4.5" />
                </span>
                <p className="text-lg font-semibold text-text-primary">{item.title}</p>
                <p className="text-sm text-text-secondary">{item.reason}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
