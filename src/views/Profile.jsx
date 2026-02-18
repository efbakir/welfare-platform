import { useState } from "react";
import PageHeader from "../components/layout/PageHeader";
import Button from "../components/ui/Button";
import { Card, CardBody, CardHeader, CardTitle, CardSubtitle } from "../components/ui/Card";
import ModuleCard from "../components/ui/ModuleCard";
import mockData from "../data/mock.json";

export default function Profile() {
  const { user, suggestedBenefits, profileQuestions } = mockData;
  const [lifeStage, setLifeStage] = useState(user.lifeStage || "");
  const [childrenAnswer, setChildrenAnswer] = useState("");
  const [profileUpdated, setProfileUpdated] = useState(false);

  return (
    <>
      <PageHeader
        eyebrow="Life Stage Triggers"
        title="My Profile"
        subtitle="Keep recommendations synced with your current life stage"
        actions={<Button variant="primary" size="sm" onClick={() => setProfileUpdated(true)}>Save profile</Button>}
      />

      <Card>
        <CardBody className="flex flex-wrap items-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=220&q=80"
            alt="friendly family"
            className="h-20 w-20 rounded-2xl object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="text-lg font-extrabold text-text-primary">Has life changed recently?</p>
            <p className="text-sm font-medium text-text-secondary">Tell us so we can find better benefits for you.</p>
          </div>
          <Button size="sm">Update now</Button>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Life stage & preferences</CardTitle>
            <CardSubtitle>We use this to prioritize the right benefits</CardSubtitle>
          </div>
        </CardHeader>
        <CardBody className="space-y-6">
          {profileQuestions.map((q) => (
            <div key={q.id}>
              <label className="mb-3 block text-sm font-bold text-text-primary">
                {q.question}
                {q.required && " *"}
              </label>
              <div className="flex flex-wrap gap-2.5">
                {q.options.map((opt) => {
                  const isLifeStage = q.id === "pq1";
                  const value = isLifeStage ? lifeStage : childrenAnswer;
                  const setValue = isLifeStage ? setLifeStage : setChildrenAnswer;
                  const selected = value === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setValue(opt)}
                      className={`rounded-full px-5 py-3 text-sm font-bold transition-all duration-200 ${
                        selected
                          ? "bg-blue text-white shadow-[0_8px_24px_rgba(0,87,184,0.25)]"
                          : "bg-[#f1f4f9] text-text-secondary hover:bg-[#e8eef7]"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          {profileUpdated && <p className="text-sm font-semibold text-green">Profile saved. Recommendations refreshed.</p>}
        </CardBody>
      </Card>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-text-primary">Recommended for you</h2>
        <p className="mb-4 text-sm font-medium text-text-secondary">Based on your life stage: <strong className="text-text-primary">{lifeStage || user.lifeStage}</strong></p>
        <div className="grid gap-4 sm:grid-cols-2">
          {suggestedBenefits.map((b) => (
            <ModuleCard
              key={b.id}
              accent="blue"
              icon="🌟"
              title={b.name}
              description={b.reason}
              badge={{ label: b.category, variant: "blue" }}
              ctaLabel="View benefit"
            />
          ))}
        </div>
      </section>
    </>
  );
}
