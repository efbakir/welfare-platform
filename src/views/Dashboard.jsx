import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/layout/PageHeader";
import Button from "../components/ui/Button";
import { Card, CardBody } from "../components/ui/Card";
import Icon from "../components/ui/Icon";
import { usePov } from "../context/PovContext";

export default function Dashboard() {
  const { profile } = usePov();
  const [workMode, setWorkMode] = useState(profile.workMode);
  const [goalWeight, setGoalWeight] = useState(58);
  const [communityStyle, setCommunityStyle] = useState("Balanced");
  const [trendScope, setTrendScope] = useState("similar");

  const primaryGoal = profile.profileAnswers.focus;

  const recs = useMemo(() => {
    const base = [
      ...profile.recommended.map((item, idx) => ({
        ...item,
        kind: "Benefit",
        score: 92 - idx * 5,
      })),
      ...profile.dashboard.together.map((item, idx) => ({
        id: item.id,
        title: item.title,
        reason: item.why,
        kind: "Experience",
        score: 86 - idx * 5,
      })),
    ];

    return base
      .map((item) => {
        let score = item.score;
        if (workMode === profile.workMode) score += 3;
        if (communityStyle === "Social" && item.kind === "Experience") score += 4;
        if (communityStyle === "Focused" && item.kind === "Experience") score -= 3;
        if (goalWeight >= 55 && item.title.toLowerCase().includes(primaryGoal.toLowerCase().split(" ")[0])) score += 4;
        return { ...item, score: Math.max(64, Math.min(98, score)) };
      })
      .sort((a, b) => b.score - a.score);
  }, [communityStyle, goalWeight, primaryGoal, profile, workMode]);

  const fitScore = Math.round(recs.reduce((acc, i) => acc + i.score, 0) / recs.length);
  const creditsRisk = Math.max(24, Math.round((100 - goalWeight) * 1.4));

  return (
    <div className="mx-auto w-full max-w-[1220px] space-y-6">
      <PageHeader
        eyebrow="Personalized Welfare"
        title="Welfare Dashboard"
        subtitle="Clean operational view with explainable recommendations for each employee POV."
        actions={
          <>
            <Link to="/welfare/inbox"><Button variant="outline" size="sm">Open inbox</Button></Link>
            <Link to="/welfare/marketplace"><Button variant="primary" size="sm">Explore benefits</Button></Link>
          </>
        }
      />

      <Card className="overflow-hidden">
        <CardBody className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 rounded-md bg-blue-tint px-2.5 py-1 text-[11px] font-semibold text-blue">
              <Icon name="spark" className="h-3.5 w-3.5" />
              Tailored for {profile.name}
            </div>
            <h2 className="text-[32px] font-semibold leading-[1.15] tracking-[-0.02em] text-text-primary">{recs[0]?.title}</h2>
            <p className="max-w-2xl text-[15px] text-text-secondary">
              Because you are {profile.lifeStage.toLowerCase()}, work {workMode.toLowerCase()}, and currently prioritize {primaryGoal.toLowerCase()}.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button size="sm">Review recommendation set</Button>
              <Link to="/welfare/profile"><Button variant="outline" size="sm">Update profile signals</Button></Link>
            </div>
          </div>

          <div className="grid gap-2.5 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-md bg-violet-tint p-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">Fit score</p>
              <p className="mt-1 text-2xl font-semibold text-text-primary">{fitScore}%</p>
            </div>
            <div className="rounded-md bg-cyan-tint p-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">Credits at risk</p>
              <p className="mt-1 text-2xl font-semibold text-text-primary">{creditsRisk} pts</p>
            </div>
            <div className="rounded-md bg-green-tint p-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">Last refresh</p>
              <p className="mt-1 text-base font-semibold text-text-primary">{profile.dashboard.feed[0]?.time ?? "recently"}</p>
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1.45fr_0.85fr]">
        <Card>
          <CardBody className="space-y-3.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-text-primary">Recommended for you</h3>
              <span className="text-xs text-text-muted">Explainable ranking</span>
            </div>
            {recs.map((item) => (
              <article key={item.id} className="rounded-md bg-[rgba(255,255,255,0.76)] p-4 shadow-[var(--shadow-xs)]">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-base font-semibold text-text-primary">{item.title}</p>
                    <p className="mt-1 text-sm text-text-secondary">{item.reason}</p>
                  </div>
                  <span className="rounded-sm bg-blue-tint px-2 py-1 text-[11px] font-semibold text-blue">{item.score}% fit</span>
                </div>
                <p className="mt-2 text-xs text-text-muted">
                  Because you: {profile.lifeStage} · {workMode} · Goal: {primaryGoal}
                </p>
              </article>
            ))}
          </CardBody>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardBody className="space-y-3">
              <h3 className="text-lg font-semibold text-text-primary">Tuning controls</h3>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-text-muted">Work mode</p>
                <div className="flex gap-2">
                  {["Remote", "Hybrid", "On-site"].map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setWorkMode(mode)}
                      className={`px-3 py-1.5 text-xs font-semibold ${workMode === mode ? "bg-blue text-white" : "bg-violet-tint text-text-secondary"}`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-text-muted">Goal emphasis</p>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={goalWeight}
                  onChange={(e) => setGoalWeight(Number(e.target.value))}
                  className="w-full accent-blue"
                  aria-label="Goal emphasis"
                />
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-text-muted">Experience style</p>
                <div className="flex gap-2">
                  {["Focused", "Balanced", "Social"].map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setCommunityStyle(mode)}
                      className={`px-3 py-1.5 text-xs font-semibold ${communityStyle === mode ? "bg-blue text-white" : "bg-violet-tint text-text-secondary"}`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-text-primary">Trending</h3>
                <div className="flex gap-1 bg-violet-tint p-1">
                  {["similar", "company"].map((scope) => (
                    <button
                      key={scope}
                      type="button"
                      onClick={() => setTrendScope(scope)}
                      className={`px-2 py-1 text-[11px] font-semibold ${trendScope === scope ? "bg-white text-text-primary" : "text-text-muted"}`}
                    >
                      {scope === "similar" ? "Like you" : "Company"}
                    </button>
                  ))}
                </div>
              </div>
              {profile.dashboard.trending.map((item) => {
                const value = trendScope === "similar" ? Math.round(item.value * 0.64) : item.value;
                return (
                  <div key={item.label} className="rounded-md bg-violet-tint p-3">
                    <p className="text-2xl font-semibold text-text-primary">{value}</p>
                    <p className="text-sm text-text-secondary">{item.label}</p>
                    <p className="mt-1 text-xs font-semibold text-red">{item.spots} spots left</p>
                  </div>
                );
              })}
            </CardBody>
          </Card>
        </div>
      </div>

      <Card>
        <CardBody className="space-y-3">
          <h3 className="text-lg font-semibold text-text-primary">Activity feed</h3>
          <div className="grid gap-2.5 md:grid-cols-3">
            {profile.dashboard.feed.map((item, i) => (
              <article key={`${item.actor}-${i}`} className="rounded-md bg-[rgba(255,255,255,0.76)] p-3 shadow-[var(--shadow-xs)]">
                <p className="text-sm font-semibold text-text-primary">{item.actor} {item.action}</p>
                <p className="mt-1 text-xs text-text-secondary">{item.text}</p>
                <p className="mt-2 text-[11px] text-text-muted">{item.time}</p>
              </article>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
