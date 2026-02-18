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
  const [goalWeight, setGoalWeight] = useState(60);
  const [communityStyle, setCommunityStyle] = useState("Group");
  const [expandedId, setExpandedId] = useState(null);
  const [trendScope, setTrendScope] = useState("similar");

  const primaryGoal = profile.profileAnswers.focus;
  const fitScore = Math.max(72, Math.min(97, 80 + (workMode === profile.workMode ? 5 : 0) + (goalWeight > 55 ? 4 : 1)));

  const personalizedRecs = useMemo(() => {
    const seeds = [
      ...profile.recommended.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.reason,
        kind: "Benefit",
      })),
      ...profile.dashboard.together.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        kind: "Experience",
      })),
    ];

    const scored = seeds.map((item, idx) => {
      let score = 90 - idx * 5;
      if (workMode === profile.workMode) score += 4;
      if (communityStyle === "Group" && item.kind === "Experience") score += 4;
      if (communityStyle === "Solo" && item.kind === "Experience") score -= 4;
      if (goalWeight >= 55 && item.title.toLowerCase().includes(primaryGoal.toLowerCase().split(" ")[0])) score += 6;

      return {
        ...item,
        score: Math.max(62, Math.min(98, score)),
      };
    });

    return scored.sort((a, b) => b.score - a.score);
  }, [communityStyle, goalWeight, primaryGoal, profile, workMode]);

  const getFeedMeta = (item) => {
    if (item.actor === "System") return { icon: "spark", tone: "bg-blue-tint text-blue" };
    if (item.actor === "HR") return { icon: "calendar", tone: "bg-violet-tint text-blue" };
    return { icon: "users", tone: "bg-green-tint text-green" };
  };

  return (
    <>
      <PageHeader
        eyebrow="Continuous touchpoint"
        title="Welfare Dashboard"
        subtitle="Personalized recommendations based on your profile signals and work context"
        actions={
          <>
            <Link to="/welfare/inbox"><Button variant="outline" size="sm">Open inbox</Button></Link>
            <Link to="/welfare/marketplace"><Button variant="primary" size="sm">Explore benefits</Button></Link>
          </>
        }
      />

      <section className="grid gap-6 xl:grid-cols-[1.45fr_0.85fr]">
        <Card>
          <CardBody className="space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-blue">Personalized for {profile.name}</p>
                <h2 className="text-2xl font-bold tracking-tight text-text-primary">{personalizedRecs[0]?.title}</h2>
                <p className="mt-1 text-sm text-text-secondary">Because you are {profile.lifeStage.toLowerCase()}, work {workMode.toLowerCase()}, and prioritize {primaryGoal.toLowerCase()}.</p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-green-tint px-3 py-1 text-xs font-semibold text-green">
                <Icon name="spark" className="h-3.5 w-3.5" />
                Fit score {fitScore}%
              </span>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-xl bg-blue-tint p-3">
                <p className="text-xs font-semibold text-text-muted">Top match now</p>
                <p className="mt-1 text-sm font-semibold text-text-primary">{personalizedRecs[0]?.title}</p>
              </div>
              <div className="rounded-xl bg-violet-tint p-3">
                <p className="text-xs font-semibold text-text-muted">Credits at risk</p>
                <p className="mt-1 text-sm font-semibold text-text-primary">{Math.max(35, Math.round((100 - goalWeight) * 1.3))} pts expiring in 14 days</p>
              </div>
              <div className="rounded-xl bg-cyan-tint p-3">
                <p className="text-xs font-semibold text-text-muted">Last refresh</p>
                <p className="mt-1 text-sm font-semibold text-text-primary">{profile.dashboard.feed[0]?.time ?? "recently"}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button size="sm">Review recommendations</Button>
              <Link to="/welfare/profile"><Button variant="outline" size="sm">Adjust profile signals</Button></Link>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="space-y-3">
            <h2 className="text-lg font-semibold text-text-primary">Recommendation controls</h2>
            <p className="text-xs text-text-muted">Preview how recommendations adapt before updating your profile.</p>
            <div>
              <p className="mb-2 text-xs font-semibold text-text-muted">Work mode</p>
              <div className="flex gap-2">
                {["Remote", "Hybrid", "On-site"].map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setWorkMode(mode)}
                    className={`px-3 py-1.5 text-xs font-semibold ${workMode === mode ? "bg-blue text-white" : "bg-[#edf2f7] text-text-secondary"}`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-1 text-xs font-semibold text-text-muted">Goal emphasis</p>
              <input
                type="range"
                min={0}
                max={100}
                value={goalWeight}
                onChange={(e) => setGoalWeight(Number(e.target.value))}
                className="w-full accent-blue"
                aria-label="Goal emphasis"
              />
              <div className="mt-1 flex justify-between text-[11px] text-text-muted">
                <span>Stability</span>
                <span>Growth</span>
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold text-text-muted">Community preference</p>
              <div className="flex gap-2">
                {["Solo", "Group"].map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setCommunityStyle(mode)}
                    className={`px-3 py-1.5 text-xs font-semibold ${communityStyle === mode ? "bg-blue text-white" : "bg-[#edf2f7] text-text-secondary"}`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-text-primary">Recommended for you</h2>
          <span className="text-xs text-text-muted">Recommendations based on profile + work mode</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {personalizedRecs.map((item) => (
            <Card key={item.id}>
              <CardBody className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-lg font-semibold text-text-primary">{item.title}</p>
                    <p className="text-sm text-text-secondary">{item.description}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 bg-blue-tint px-2.5 py-1 text-xs font-semibold text-blue">
                    <Icon name={item.kind === "Experience" ? "users" : "spark"} className="h-3.5 w-3.5" />
                    {item.score}% fit
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 text-xs">
                  <span className="bg-violet-tint px-2 py-1 text-text-secondary">{profile.lifeStage}</span>
                  <span className="bg-cyan-tint px-2 py-1 text-text-secondary">{workMode}</span>
                  <span className="bg-green-tint px-2 py-1 text-green">{item.kind}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setExpandedId((prev) => (prev === item.id ? null : item.id))}
                  className="text-xs font-semibold text-blue"
                >
                  {expandedId === item.id ? "Hide reasoning" : "Why this is recommended"}
                </button>
                {expandedId === item.id && (
                  <div className="space-y-1 bg-[#f8fafc] p-3 text-xs text-text-secondary">
                    <p><span className="font-semibold text-text-primary">Because you:</span> are {profile.lifeStage.toLowerCase()} and work {workMode.toLowerCase()}.</p>
                    <p><span className="font-semibold text-text-primary">Also relevant because:</span> your priority is {primaryGoal.toLowerCase()}.</p>
                    <p><span className="font-semibold text-text-primary">What changed:</span> {profile.dashboard.feed[0]?.text}</p>
                  </div>
                )}
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardBody className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight text-text-primary">Trending in your organization</h2>
              <div className="flex gap-1 bg-[#edf2f7] p-1">
                {["similar", "company"].map((scope) => (
                  <button
                    key={scope}
                    type="button"
                    onClick={() => setTrendScope(scope)}
                    className={`px-2 py-1 text-[11px] font-semibold capitalize ${trendScope === scope ? "bg-white text-text-primary" : "text-text-muted"}`}
                  >
                    {scope === "similar" ? "People like you" : "Company-wide"}
                  </button>
                ))}
              </div>
            </div>
            {profile.dashboard.trending.map((t) => {
              const value = trendScope === "similar" ? Math.round(t.value * 0.65) : t.value;
              return (
                <div key={t.label} className="bg-blue-tint p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-3xl font-bold tracking-tight text-text-primary">{value}</p>
                    <span className="inline-flex h-9 w-9 items-center justify-center bg-white text-blue">
                      <Icon name={t.label.toLowerCase().includes("family") ? "family" : "wellness"} className="h-4.5 w-4.5" />
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary">{t.label}</p>
                  <p className="mt-1 inline-flex bg-secondary-tint px-2.5 py-1 text-xs font-semibold text-secondary">{t.spots} spots left</p>
                </div>
              );
            })}
          </CardBody>
        </Card>

        <Card>
          <CardBody className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight text-text-primary">Social activity feed</h2>
              <span className="text-xs text-text-muted">Secondary signal</span>
            </div>
            {profile.dashboard.feed.map((item, index) => (
              <article key={`${item.actor}-${index}`} className="flex items-start gap-3 bg-[#f8fafc] p-4">
                <div className={`flex h-11 w-11 items-center justify-center text-xs font-semibold ${getFeedMeta(item).tone}`}>
                  <Icon name={getFeedMeta(item).icon} className="h-4.5 w-4.5" />
                </div>
                <div className="flex h-11 w-11 items-center justify-center bg-blue text-xs font-semibold text-white">
                  {item.actor.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-text-primary">
                    <strong>{item.actor}</strong> <strong>{item.action}</strong>
                  </p>
                  <p className="mt-1 text-sm text-text-secondary">{item.text}</p>
                </div>
                <span className="bg-white px-2.5 py-1 text-xs font-medium text-text-muted">{item.time}</span>
              </article>
            ))}
          </CardBody>
        </Card>
      </section>
    </>
  );
}
