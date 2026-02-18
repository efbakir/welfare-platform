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
    <>
      <PageHeader
        eyebrow="Life Stage Triggers"
        title="Profile"
        subtitle="We use this to prioritize the right benefits"
        actions={<Button size="sm" onClick={() => setSaved(true)}>Save profile</Button>}
      />

      <Card>
        <CardBody className="flex items-center justify-between gap-4">
          <div>
            <p className="inline-flex items-center gap-1 text-lg font-semibold text-text-primary">
              <Icon name="spark" className="h-5 w-5" />
              Has life changed recently?
            </p>
            <p className="text-sm text-text-secondary">Tell us so we can find better benefits for you.</p>
          </div>
          <Button variant="outline" size="sm">Update now</Button>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="space-y-4">
          <div>
            <p className="mb-2 text-sm font-semibold text-text-primary">Life stage</p>
            <div className="flex flex-wrap gap-2">
              {lifeStages.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setLifeStage(item)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${item === lifeStage ? "bg-blue text-white" : "bg-[#f1f5f9] text-text-secondary"}`}
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
            <div className="rounded-sm bg-cyan-tint p-3 text-sm text-text-secondary"><span className="mr-1 inline-flex"><Icon name="calendar" className="h-4 w-4" /></span>Work mode: {profile.profileAnswers.workMode}</div>
            <div className="rounded-sm bg-violet-tint p-3 text-sm text-text-secondary"><span className="mr-1 inline-flex"><Icon name="education" className="h-4 w-4" /></span>Primary goal: {profile.profileAnswers.focus}</div>
            <div className="rounded-sm bg-green-tint p-3 text-sm text-text-secondary"><span className="mr-1 inline-flex"><Icon name="users" className="h-4 w-4" /></span>Social preference: {profile.profileAnswers.socialStyle}</div>
            <div className="rounded-sm bg-blue-tint p-3 text-sm text-text-secondary"><span className="mr-1 inline-flex"><Icon name="user" className="h-4 w-4" /></span>Current POV: {profile.name}</div>
          </div>

          {saved && <p className="text-sm font-semibold text-green">Recommendations refreshed.</p>}
        </CardBody>
      </Card>

      <section>
        <h2 className="mb-3 text-2xl font-bold tracking-tight text-text-primary">Recommended for you</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {profile.recommended.map((item) => (
            <Card key={item.id}>
              <CardBody className="space-y-1.5">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-sm bg-blue-tint text-blue">
                  <Icon name={item.title.toLowerCase().includes("support") ? "wellness" : "spark"} className="h-4.5 w-4.5" />
                </span>
                <p className="text-lg font-semibold text-text-primary">{item.title}</p>
                <p className="text-sm text-text-secondary">{item.reason}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
