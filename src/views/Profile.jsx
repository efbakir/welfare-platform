import { useState } from "react";
import PageHeader from "../components/layout/PageHeader";
import Button from "../components/ui/Button";
import { Card, CardBody } from "../components/ui/Card";
import { usePov } from "../context/PovContext";

const lifeStages = ["Single", "Partnered", "Married", "Parent", "Caregiver"];

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
            <p className="text-lg font-semibold text-text-primary">Has life changed recently?</p>
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
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl bg-[#f8fafc] p-3 text-sm text-text-secondary">Work mode: {profile.profileAnswers.workMode}</div>
            <div className="rounded-2xl bg-[#f8fafc] p-3 text-sm text-text-secondary">Primary goal: {profile.profileAnswers.focus}</div>
            <div className="rounded-2xl bg-[#f8fafc] p-3 text-sm text-text-secondary">Social preference: {profile.profileAnswers.socialStyle}</div>
            <div className="rounded-2xl bg-[#f8fafc] p-3 text-sm text-text-secondary">Current POV: {profile.name}</div>
          </div>

          {saved && <p className="text-sm font-semibold text-green">Recommendations refreshed.</p>}
        </CardBody>
      </Card>

      <section>
        <h2 className="mb-3 text-2xl font-bold tracking-tight text-text-primary">Recommended for you</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {profile.recommended.map((item) => (
            <Card key={item.id}>
              <CardBody>
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
