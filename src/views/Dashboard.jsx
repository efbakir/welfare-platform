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
    <div className="rounded-xl bg-white/80 p-4 shadow-[var(--shadow-sm)]">
      <p className="text-xs font-medium text-text-muted">{label}</p>
      <p className="mt-2 text-[30px] font-semibold leading-none tracking-[-0.02em] text-text-primary">{value}</p>
      {sub ? <p className="mt-1 text-xs text-text-secondary">{sub}</p> : null}
    </div>
  );
}

function RecommendationGrid({ profile }) {
  const minCardWidth = profile.layoutVariant === "plan-first" ? 360 : 300;
  const recommendationImages = {
    "Backup Care Credits": "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=1200&q=80",
    "Meal & Grocery Support": "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80",
    "Meal Delivery Subsidy": "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80",
    "Stress Support Sessions": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
    "Therapy & Stress Support": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
    "Hybrid Home Office Support": "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
    "Hybrid Home-Office Support": "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
    "Concierge Errands": "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80",
    "Concierge Errands Service": "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80",
    "Transport & Fuel Support": "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1200&q=80",
    "Transport Pass / Fuel Support": "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1200&q=80",
    "Meal Vouchers Near Workplace": "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1200&q=80",
    "Pharmacy Essentials Credit": "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=1200&q=80",
    "Near-work Gym Access": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
    "Micro-rewards Marketplace": "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1200&q=80",
    "Micro-rewards Gift Cards": "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1200&q=80",
    "Leadership Coaching": "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    "Leadership Coaching Sessions": "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    "Learning Stipend": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
    "Burnout Recovery Program": "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1200&q=80",
    "Remote Team Circles": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    "Volunteering + Donation Match": "https://images.unsplash.com/photo-1469571486292-b53601020fbb?auto=format&fit=crop&w=1200&q=80",
    "Volunteering Day + Donation Match": "https://images.unsplash.com/photo-1469571486292-b53601020fbb?auto=format&fit=crop&w=1200&q=80",
  };
  const fallbackImages = [
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80",
  ];

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight text-text-primary">Top recommendations</h2>
      </div>

      <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(${minCardWidth}px, 1fr))` }}>
        {profile.recommended.slice(0, 5).map((item, index) => (
          <Card key={item.id} className="border-0 shadow-none">
            <div className="aspect-[16/8] w-full overflow-hidden border-b border-border bg-surface-2">
              <img
                src={recommendationImages[item.title] || fallbackImages[index % fallbackImages.length]}
                alt={item.title}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <CardBody className="space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <p className="text-lg font-semibold text-text-primary">{item.title}</p>
                <Badge variant="blue" className="whitespace-nowrap">{item.points} pts</Badge>
              </div>
              <p className="text-sm text-text-secondary">{item.reason}</p>
              {item.chips?.length > 0 ? (
                <p className="text-xs text-text-muted opacity-80">
                  Because you said: {(item.chips || []).slice(0, 3).join(", ")}.
                </p>
              ) : null}
              {item.policyFit ? (
                <p className="w-fit rounded-sm bg-green-tint px-2 py-1 text-[11px] font-semibold text-green">{item.policyFit}</p>
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

  const moduleImages = {
    timeSavers: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=112&h=112&q=80",
    valuePicks: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=112&h=112&q=80",
    growthPlan: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=112&h=112&q=80",
    credits: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=112&h=112&q=80",
    expiringCredits: "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=112&h=112&q=80",
    supportRequests: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=112&h=112&q=80",
    localMoments: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=112&h=112&q=80",
    teamView: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=112&h=112&q=80",
    wellbeing: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=112&h=112&q=80",
    community: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=112&h=112&q=80",
  };

  return (
    <div className="mx-auto w-full max-w-[1240px] space-y-5">
      <PageHeader
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

      <section className="space-y-4 border-b border-border pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-text-primary">About you:</span>
          <Badge variant="blue">{profile.workMode}</Badge>
          <Badge variant="neutral">{profile.roleReality === "manager" ? "Manager" : "IC"}</Badge>
          <Badge variant="green">{profile.lifeEvents?.[0] || "Context-based"}</Badge>
          <Badge variant="neutral">{profile.constraints?.budgetComfort} budget comfort</Badge>
          <Badge variant="neutral">{profile.constraints?.privacyLevel} privacy</Badge>
          <Badge variant="neutral">Default filter: {profile.defaultFilters?.location}</Badge>
          <button
            type="button"
            aria-label="Edit about you"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-text-muted transition hover:bg-surface-2 hover:text-text-primary"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
            </svg>
          </button>
        </div>

        {(profile.communityPreference === "Solo" && profile.constraints?.privacyLevel === "High") ? (
          <div className="flex items-center justify-between rounded-xl bg-surface p-3 shadow-[var(--shadow-sm)]">
            <div>
              <p className="text-sm font-semibold text-text-primary">Quiet mode</p>
              <p className="text-xs text-text-secondary">Minimizes social modules and keeps recommendations calm.</p>
            </div>
            <button
              type="button"
              aria-label="Toggle quiet mode"
              onClick={() => setQuietMode((prev) => !prev)}
              className={`relative h-7 w-12 rounded-full transition ${quietMode ? "bg-blue" : "bg-[#dfe3f3]"}`}
            >
              <span className={`toggle-thumb absolute top-1 h-5 w-5 rounded-full bg-white shadow ${quietMode ? "active left-6" : "left-1"}`} />
            </button>
          </div>
        ) : null}

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryStat label="Available credits" value={`${profile.budget.remaining}`} sub="points ready" />
          <SummaryStat label="Allocated" value={`${profile.budget.allocated}`} sub="this cycle" />
          <SummaryStat label="Goal horizon" value={profile.goalHorizon} sub="planning window" />
          <SummaryStat label="Community mode" value={profile.communityPreference} sub="adaptive visibility" />
        </div>
      </section>

      <RecommendationGrid profile={profile} />

      <section className="space-y-3">
        <h3 className="text-2xl font-semibold tracking-tight text-text-primary">Adaptive modules</h3>
        <div className="space-y-2">
          {orderedModules.map((module) => (
            <div key={module.key} className="flex gap-3 rounded-xl bg-surface p-3 shadow-[var(--shadow-xs)]">
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-surface-2">
                <img
                  src={moduleImages[module.key] || moduleImages.credits}
                  alt=""
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex flex-wrap items-baseline gap-2">
                  <p className="text-sm font-semibold text-text-primary">{module.title}</p>
                  {module.chip ? <Badge variant="blue">{module.chip}</Badge> : null}
                </div>
                <p className="text-sm text-text-secondary">{module.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold tracking-tight text-text-primary">Community</h3>
          {profile.communityModule !== "collapsed" ? (
            <Badge variant="neutral">{profile.communityModule}</Badge>
          ) : null}
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

      <section className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
        <p className="inline-flex items-center gap-2 text-sm text-text-secondary">
          <Icon name="spark" className="h-4 w-4 text-blue" />
          Personalization uses life events, work mode, role reality, and constraint levels. No salary or medical records required.
        </p>
        <Button variant="outline" onClick={() => navigate("/welfare/profile")}>Adjust personalization inputs</Button>
      </section>
    </div>
  );
}
