import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/layout/PageHeader";
import { Card, CardBody } from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Icon from "../components/ui/Icon";
import { usePov } from "../context/PovContext";

function SummaryStat({ label, value, sub }) {
  return (
    <div className="rounded-xl bg-white/80 p-4 shadow-[var(--shadow-xs)]">
      <p className="text-xs font-medium text-text-muted">{label}</p>
      <p className="mt-2 text-[30px] font-semibold leading-none tracking-[-0.02em] text-text-primary">{value}</p>
      {sub ? <p className="mt-1 text-xs text-text-secondary">{sub}</p> : null}
    </div>
  );
}

function RecommendationGrid({ profile }) {
  const gridClass =
    profile.layoutVariant === "list-first"
      ? "grid-cols-1"
      : profile.layoutVariant === "plan-first"
        ? "grid-cols-1 md:grid-cols-2"
        : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3";

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight text-text-primary">Top recommendations</h2>
        <p className="text-sm text-text-muted">Why this is recommended</p>
      </div>

      <div className={`grid gap-3 ${gridClass}`}>
        {profile.recommended.slice(0, 5).map((item) => (
          <Card key={item.id}>
            <CardBody className="space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <p className="text-lg font-semibold text-text-primary">{item.title}</p>
                <Badge variant="blue">{item.points} pts</Badge>
              </div>
              <p className="text-sm text-text-secondary">{item.reason}</p>
              <div className="flex flex-wrap gap-1.5">
                {(item.chips || []).slice(0, 3).map((chip) => (
                  <span key={`${item.id}-${chip}`} className="rounded-sm bg-violet-tint px-2 py-1 text-[11px] font-medium text-text-secondary">
                    Because you said: {chip}
                  </span>
                ))}
              </div>
              {item.policyFit ? (
                <p className="rounded-sm bg-green-tint px-2 py-1 text-[11px] font-semibold text-green">{item.policyFit}</p>
              ) : null}
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { profile } = usePov();
  const [quietMode, setQuietMode] = useState(
    profile.communityPreference === "Solo" && profile.constraints?.privacyLevel === "High"
  );

  const moduleMap = useMemo(
    () => ({
      timeSavers: {
        title: "Time-savers for you",
        body: "Reduce weekly friction with quick-support benefits and one-click redemptions.",
        chip: "Primary",
      },
      valuePicks: {
        title: "Best value picks",
        body: "Optimized for on-site cost pressure and practical daily support.",
        chip: "Primary",
      },
      growthPlan: {
        title: "Growth plan for this quarter",
        body: "Structured support for leadership outcomes and sustainable pace.",
        chip: "Primary",
      },
      credits: {
        title: "Credit health",
        body: `${profile.budget.remaining} pts remaining from ${profile.budget.total}.`,
      },
      expiringCredits: {
        title: "Credits expiring soon",
        body: `${Math.max(20, Math.round(profile.budget.total * 0.18))} pts should be used before month-end.`,
      },
      supportRequests: {
        title: "Support requests",
        body: "Care bundles and practical support requests are prioritized for faster review.",
      },
      localMoments: {
        title: "Near your workplace",
        body: "Shift-fit, local opportunities are prioritized in your feed.",
      },
      teamView: {
        title: "Team view",
        body: "Track team wellbeing and learning trendlines alongside your own plan.",
      },
      wellbeing: {
        title: "Wellbeing focus",
        body: "Recovery-oriented options are elevated based on workload and horizon.",
      },
      community: {
        title: "Community module",
        body: "Displayed according to your collaboration preference.",
      },
    }),
    [profile.budget.remaining, profile.budget.total]
  );

  const orderedModules = profile.dashboardModules
    .map((key) => ({ key, ...moduleMap[key] }))
    .filter((item) => item.title);

  return (
    <div className="mx-auto w-full max-w-[1240px] space-y-5">
      <PageHeader
        eyebrow="Personalized Welfare"
        title={profile.hero?.title || "Decision Dashboard"}
        subtitle={profile.hero?.subtitle || "Recommendations based on your context."}
        actions={(
          <>
            <Button variant="outline" onClick={() => navigate("/welfare/requests")}>
              Open requests
            </Button>
            <Button onClick={() => navigate("/welfare/marketplace")}>Explore benefits</Button>
          </>
        )}
      />

      <Card>
        <CardBody className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="blue">{profile.workMode}</Badge>
            <Badge variant="neutral">{profile.roleReality === "manager" ? "Manager" : "IC"}</Badge>
            <Badge variant="green">{profile.lifeEvents?.[0] || "Context-based"}</Badge>
            <Badge variant="neutral">{profile.constraints?.budgetComfort} budget comfort</Badge>
            <Badge variant="neutral">{profile.constraints?.privacyLevel} privacy</Badge>
            <Badge variant="neutral">Default filter: {profile.defaultFilters?.location}</Badge>
          </div>

          {(profile.communityPreference === "Solo" && profile.constraints?.privacyLevel === "High") ? (
            <div className="flex items-center justify-between rounded-xl bg-violet-tint p-3">
              <div>
                <p className="text-sm font-semibold text-text-primary">Quiet mode</p>
                <p className="text-xs text-text-secondary">Minimizes social modules and keeps recommendations calm.</p>
              </div>
              <button
                type="button"
                onClick={() => setQuietMode((prev) => !prev)}
                className={`relative h-7 w-12 rounded-md transition ${quietMode ? "bg-blue" : "bg-[#dfe3f3]"}`}
              >
                <span className={`absolute top-1 h-5 w-5 rounded-sm bg-white shadow transition ${quietMode ? "left-6" : "left-1"}`} />
              </button>
            </div>
          ) : null}

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <SummaryStat label="Available credits" value={`${profile.budget.remaining}`} sub="points ready" />
            <SummaryStat label="Allocated" value={`${profile.budget.allocated}`} sub="this cycle" />
            <SummaryStat label="Goal horizon" value={profile.goalHorizon} sub="planning window" />
            <SummaryStat label="Community mode" value={profile.communityPreference} sub="adaptive visibility" />
          </div>
        </CardBody>
      </Card>

      <RecommendationGrid profile={profile} />

      <section className="space-y-3">
        <h3 className="text-2xl font-semibold tracking-tight text-text-primary">Adaptive modules</h3>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {orderedModules.map((module) => (
            <Card key={module.key}>
              <CardBody className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-lg font-semibold text-text-primary">{module.title}</p>
                  {module.chip ? <Badge variant="blue">{module.chip}</Badge> : null}
                </div>
                <p className="text-sm text-text-secondary">{module.body}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold tracking-tight text-text-primary">Community</h3>
          <Badge variant="neutral">{profile.communityModule}</Badge>
        </div>

        {profile.communityModule === "collapsed" || quietMode ? (
          <Card>
            <CardBody className="rounded-xl bg-violet-tint p-4 text-sm text-text-secondary">
              Community suggestions are minimized based on your preference. Optional groups remain available at the bottom.
            </CardBody>
          </Card>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {profile.dashboard.together.map((item) => (
              <Card key={item.id}>
                <CardBody className="space-y-2">
                  <p className="text-lg font-semibold text-text-primary">{item.title}</p>
                  <p className="text-sm text-text-secondary">{item.description}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="green">{item.spotsLeft} spots left</Badge>
                    <span className="rounded-sm bg-violet-tint px-2 py-1 text-[11px] text-text-secondary">{item.why}</span>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </section>

      <Card>
        <CardBody className="flex flex-wrap items-center justify-between gap-3">
          <p className="inline-flex items-center gap-2 text-sm text-text-secondary">
            <Icon name="spark" className="h-4 w-4 text-blue" />
            Personalization uses life events, work mode, role reality, and constraint levels. No salary or medical records required.
          </p>
          <Button variant="ghost" onClick={() => navigate("/welfare/profile")}>Adjust personalization inputs</Button>
        </CardBody>
      </Card>
    </div>
  );
}
