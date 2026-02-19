import { useNavigate } from "react-router-dom";
import PageHeader from "../components/layout/PageHeader";
import { Card, CardBody, CardHeader, CardTitle } from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Icon from "../components/ui/Icon";
import { usePov } from "../context/PovContext";

const togetherImages = {
  "Career sprint workshop": "photo-1552664730-d307ca884978",
  "After-hours climbing": "photo-1522163182402-834f871fd851",
  "Team cooking class": "photo-1556910103-1c02745aae4d",
  "Wellness day": "photo-1517838277536-f5f99be501cd",
  "Family wellness day": "photo-1511895426328-dc8714191300",
  "Parent support group": "photo-1529156069898-49953e39b3ac",
  "Async mindfulness cohort": "photo-1506126613408-eca07ce68773",
  "Caregiver circle": "photo-1516307365426-bea591f05011",
};

const feedGradients = [
  "from-blue-500 to-indigo-500",
  "from-violet-500 to-purple-500",
  "from-cyan-500 to-blue-500",
  "from-emerald-500 to-teal-500",
];

const chartSeriesByPov = {
  mario: [18, 24, 28, 26, 32, 36, 41],
  laura: [22, 26, 35, 33, 40, 47, 52],
  giulia: [31, 34, 38, 44, 48, 55, 61],
  ahmed: [27, 29, 34, 37, 42, 46, 53],
};

function initials(text = "") {
  return text
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((token) => token[0]?.toUpperCase())
    .join("");
}

function SparkBars({ values }) {
  const max = Math.max(...values, 1);

  return (
    <div className="mt-3 flex items-end gap-2">
      {values.map((value, idx) => (
        <div key={`${value}-${idx}`} className="group flex flex-1 flex-col items-center gap-2">
          <div
            className="w-full rounded-sm bg-[linear-gradient(180deg,rgba(138,123,255,0.9)_0%,rgba(91,91,214,0.38)_100%)] transition-opacity group-hover:opacity-100"
            style={{ height: `${Math.max(14, (value / max) * 110)}px`, opacity: idx === values.length - 1 ? 1 : 0.8 }}
            aria-hidden="true"
          />
          <span className="text-[10px] font-medium text-text-muted">W{idx + 1}</span>
        </div>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { povId, profile } = usePov();
  const chartSeries = chartSeriesByPov[povId] ?? chartSeriesByPov.mario;

  const kpis = [
    {
      label: "Available credits",
      value: profile.budget.remaining,
      suffix: "pts",
      delta: "+12%",
      tone: "text-blue",
    },
    {
      label: "Allocated this month",
      value: profile.budget.allocated,
      suffix: "pts",
      delta: `${Math.round((profile.budget.allocated / Math.max(profile.budget.total, 1)) * 100)}% used`,
      tone: "text-secondary",
    },
    {
      label: "Active recommendations",
      value: profile.recommended.length,
      suffix: "items",
      delta: "Personalized",
      tone: "text-green",
    },
    {
      label: "Guild events this month",
      value: profile.dashboard.together.length,
      suffix: "live",
      delta: "Join + earn back",
      tone: "text-orange",
    },
    {
      label: "Community momentum",
      value: profile.dashboard.trending[0]?.value ?? 0,
      suffix: "actions",
      delta: "Org-wide",
      tone: "text-text-secondary",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-[1240px] space-y-5">
      <PageHeader
        eyebrow="Personalized Welfare"
        title="Decision Dashboard"
        subtitle="A clearer view of why these benefits matter for your profile, life stage, and team context."
        actions={(
          <>
            <Button variant="outline" onClick={() => navigate("/welfare/requests")}>
              Create request
            </Button>
            <Button onClick={() => navigate("/welfare/marketplace")}>
              Explore benefits
            </Button>
          </>
        )}
      />

      <Card>
        <CardBody className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="blue">Primary focus: {profile.profileAnswers.focus}</Badge>
            <Badge variant="green">Work mode: {profile.workMode}</Badge>
            <Badge variant="neutral">Life stage: {profile.lifeStage}</Badge>
          </div>
          <div className="grid gap-3 md:grid-cols-5">
            {kpis.map((item) => (
              <div key={item.label} className="rounded-xl bg-white/80 p-4 shadow-[var(--shadow-xs)]">
                <p className="text-xs font-medium text-text-muted">{item.label}</p>
                <p className="mt-2 text-[28px] font-semibold tracking-[-0.02em] text-text-primary">
                  {item.value}
                  <span className="ml-1 text-sm font-medium text-text-secondary">{item.suffix}</span>
                </p>
                <p className={`mt-1 text-xs font-semibold ${item.tone}`}>{item.delta}</p>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <Card>
          <CardHeader>
            <div>
              <CardTitle className="text-xl">Recommendation momentum</CardTitle>
              <p className="mt-1 text-sm text-text-secondary">How engagement changes when benefits are personalized for your context.</p>
            </div>
            <Badge variant="neutral">Last 7 weeks</Badge>
          </CardHeader>
          <CardBody>
            <SparkBars values={chartSeries} />
            <div className="mt-4 grid gap-2 md:grid-cols-3">
              <div className="rounded-xl bg-violet-tint p-3">
                <p className="text-xs font-medium text-text-muted">Top driver</p>
                <p className="mt-1 text-sm font-semibold text-text-primary">{profile.profileAnswers.focus}</p>
              </div>
              <div className="rounded-xl bg-cyan-tint p-3">
                <p className="text-xs font-medium text-text-muted">Best channel</p>
                <p className="mt-1 text-sm font-semibold text-text-primary">{profile.profileAnswers.socialStyle}</p>
              </div>
              <div className="rounded-xl bg-green-tint p-3">
                <p className="text-xs font-medium text-text-muted">Behavior signal</p>
                <p className="mt-1 text-sm font-semibold text-text-primary">{profile.dashboard.feed[2]?.actor} this week</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Guild event economics</CardTitle>
          </CardHeader>
          <CardBody className="space-y-3">
            <div className="rounded-xl bg-violet-tint p-3">
              <p className="text-xs font-medium text-text-muted">When a colleague creates an event</p>
              <p className="mt-1 text-sm font-semibold text-text-primary">Creator earns +20 credits per confirmed participant.</p>
            </div>
            <div className="rounded-xl bg-cyan-tint p-3">
              <p className="text-xs font-medium text-text-muted">When you join a guild event</p>
              <p className="mt-1 text-sm font-semibold text-text-primary">Spend 80 credits and earn 30 credits back after attendance.</p>
            </div>
            <div className="rounded-xl bg-green-tint p-3">
              <p className="text-xs font-medium text-text-muted">Current opportunity</p>
              <p className="mt-1 text-sm font-semibold text-text-primary">{profile.dashboard.together[0]?.spotsLeft ?? 0} subsidized spots left this week.</p>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Social FOMO feed</CardTitle>
          </CardHeader>
          <CardBody className="space-y-2">
            {profile.dashboard.feed.map((item, index) => (
              <div key={`${item.actor}-${item.time}-${index}`} className="flex items-start gap-3 rounded-xl bg-white/80 p-3 shadow-[var(--shadow-xs)]">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-gradient-to-br ${feedGradients[index % feedGradients.length]} text-xs font-semibold text-white`}
                >
                  {initials(item.actor)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm leading-relaxed text-text-primary">
                    <span className="font-semibold">{item.actor}</span> <span className="font-semibold">{item.action}</span>
                  </p>
                  <p className="mt-0.5 text-sm text-text-secondary">{item.text}</p>
                </div>
                <span className="rounded-sm bg-violet-tint px-2 py-1 text-[11px] font-medium text-text-muted">{item.time}</span>
              </div>
            ))}
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Trending (secondary)</CardTitle>
          </CardHeader>
          <CardBody className="space-y-3">
            {profile.dashboard.trending.map((item) => (
              <div key={item.label} className="rounded-xl bg-white/80 p-3 shadow-[var(--shadow-xs)]">
                <p className="text-xs font-medium text-text-muted">{item.label}</p>
                <div className="mt-2 flex items-end justify-between gap-2">
                  <p className="text-[28px] font-semibold leading-none tracking-[-0.02em] text-text-primary">{item.value}</p>
                  <Badge variant="green">{item.spots} spots left</Badge>
                </div>
              </div>
            ))}
            <p className="text-xs text-text-muted">Recommendations and ranking are based on your profile + work mode.</p>
          </CardBody>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {profile.dashboard.together.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="grid gap-0 md:grid-cols-[1.1fr_1fr]">
              <img
                src={`https://images.unsplash.com/${togetherImages[item.title] ?? "photo-1521737604893-d14cc237f11d"}?w=640&h=420&fit=crop&q=80`}
                alt={item.title}
                className="h-48 w-full object-cover md:h-full"
              />
              <CardBody className="space-y-2.5">
                <p className="text-lg font-semibold text-text-primary">{item.title}</p>
                <p className="text-sm text-text-secondary">{item.description}</p>
                <Badge variant="green">{item.spotsLeft} spots left</Badge>
                <p className="rounded-sm bg-violet-tint px-2 py-1 text-xs text-text-secondary">
                  Because you: {item.why}
                </p>
                <Button variant="outline" className="w-full" onClick={() => navigate("/welfare/marketplace")}>
                  View event
                </Button>
              </CardBody>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <CardBody className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-start gap-2">
            <span className="mt-0.5 text-blue">
              <Icon name="spark" className="h-4 w-4" />
            </span>
            <p className="text-sm text-text-secondary">
              Personalization note: recommendations use life stage, work mode, behavior signals, and past redemption patterns.
            </p>
          </div>
          <Button variant="ghost" onClick={() => navigate("/welfare/profile")}>
            Adjust personalization inputs
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
