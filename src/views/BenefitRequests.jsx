import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/layout/PageHeader";
import Button from "../components/ui/Button";
import { Card, CardBody } from "../components/ui/Card";
import Icon from "../components/ui/Icon";
import { usePov } from "../context/PovContext";

const tabs = ["Progress", "Requests", "Work"];

const requests = [
  { id: "rq1", title: "Little Stars Daycare", owner: "Mario Rossi", role: "Family", amount: 200, status: "Progress", due: "Due 29/02" },
  { id: "rq2", title: "Team Cooking Class", owner: "HR Team", role: "Social", amount: 70, status: "Requests", due: "Due 26/02" },
  { id: "rq3", title: "Language Classes", owner: "Learning Hub", role: "Education", amount: 90, status: "Work", due: "Complete" },
  { id: "rq4", title: "Gym Membership", owner: "Wellness Ops", role: "Wellness", amount: 50, status: "Progress", due: "Due 04/03" },
];

export default function BenefitRequests() {
  const { profile } = usePov();
  const [activeTab, setActiveTab] = useState("Progress");
  const filtered = useMemo(() => requests.filter((item) => item.status === activeTab), [activeTab]);
  const availableCredits = profile.budget.remaining;
  const expiringSoon = Math.max(24, Math.round(profile.budget.total * 0.16));
  const caps = [
    { label: "Wellbeing cap", used: Math.min(95, 40 + profile.goals.length * 10), total: 100 },
    { label: "Education cap", used: Math.min(95, profile.profileAnswers.focus === "Learning" ? 80 : 62), total: 100 },
  ];
  const eligibility = [
    `You are eligible for Family Support programs in ${profile.workMode} mode.`,
    `You have reached ${caps[1].used}% of your Learning Budget.`,
  ];
  const suggestions = [
    `Based on your profile, you may also request ${profile.recommended[0]?.title ?? "high-fit support"}.`,
    `People in your role (${profile.role}) often request ${profile.marketplace.featured[0] ?? "wellbeing packages"}.`,
  ];
  const policyLink = "/welfare/profile";
  const checklist = [
    "Manager note (if request exceeds 200 pts)",
    "Eligibility proof for family-related requests",
    "Preferred start date",
  ];

  return (
    <>
      <PageHeader
        eyebrow="Operations"
        title="Benefit Requests"
        subtitle="Operational view for credit, policy, and approval decisions"
        actions={<Button size="sm">Create request</Button>}
      />

      <section className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardBody className="space-y-4 p-5">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center bg-blue-tint text-blue">
                <Icon name="wallet" className="h-4 w-4" />
              </span>
              <h2 className="text-lg font-semibold text-text-primary">Contextual credit status</h2>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              <div className="bg-[#f8fafc] p-3">
                <p className="text-xs font-semibold text-text-muted">Available credits</p>
                <p className="mt-1 text-2xl font-bold text-text-primary">{availableCredits} pts</p>
              </div>
              <div className="bg-violet-tint p-3">
                <p className="text-xs font-semibold text-text-muted">Expiring soon</p>
                <p className="mt-1 text-2xl font-bold text-text-primary">{expiringSoon} pts</p>
              </div>
              <div className="bg-cyan-tint p-3">
                <p className="text-xs font-semibold text-text-muted">Category caps</p>
                <p className="mt-1 text-sm font-semibold text-text-primary">{caps[0].used}% wellbeing · {caps[1].used}% education</p>
              </div>
            </div>
            <div className="space-y-2">
              {caps.map((cap) => (
                <div key={cap.label}>
                  <div className="mb-1 flex items-center justify-between text-xs text-text-muted">
                    <span>{cap.label}</span>
                    <span>{cap.used}%</span>
                  </div>
                  <div className="h-2 bg-[#e6edf6]">
                    <div className="h-full bg-blue" style={{ width: `${cap.used}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="space-y-4 p-5">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center bg-green-tint text-green">
                <Icon name="spark" className="h-4 w-4" />
              </span>
              <h2 className="text-lg font-semibold text-text-primary">Eligibility snapshot</h2>
            </div>
            <div className="space-y-2">
              {eligibility.map((item) => (
                <div key={item} className="bg-[#f8fafc] p-3 text-sm text-text-secondary">
                  <span className="mr-2 inline-flex h-5 w-5 items-center justify-center bg-blue-tint text-[11px] font-semibold text-blue">i</span>
                  {item}
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardBody className="space-y-4 p-5">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center bg-violet-tint text-blue">
                <Icon name="users" className="h-4 w-4" />
              </span>
              <h2 className="text-lg font-semibold text-text-primary">Smart suggestions</h2>
            </div>
            <div className="space-y-2">
              {suggestions.map((item) => (
                <div key={item} className="bg-[#f8fafc] p-3 text-sm text-text-secondary">{item}</div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="space-y-4 p-5">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center bg-orange-tint text-text-secondary">
                <Icon name="calendar" className="h-4 w-4" />
              </span>
              <h2 className="text-lg font-semibold text-text-primary">Transparency layer</h2>
            </div>
            <div className="bg-[#f8fafc] p-3 text-sm text-text-secondary">
              Approval timeline estimate: <span className="font-semibold text-text-primary">2-4 business days</span>
            </div>
            <div className="bg-[#f8fafc] p-3 text-sm">
              <Link to={policyLink} className="font-semibold text-blue hover:underline">Open policy reference</Link>
            </div>
            <div className="space-y-2 bg-[#f8fafc] p-3">
              <p className="text-sm font-semibold text-text-primary">Required documents checklist</p>
              {checklist.map((item) => (
                <p key={item} className="text-sm text-text-secondary">
                  <span className="mr-2 inline-flex h-4 w-4 items-center justify-center bg-[#e2e8f0] text-[10px] font-semibold text-text-muted">✓</span>
                  {item}
                </p>
              ))}
            </div>
          </CardBody>
        </Card>
      </section>

      <Card>
        <CardBody className="space-y-4 p-5">
          <div className="inline-flex bg-[#ececec] p-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium transition ${
                  tab === activeTab ? "bg-blue text-white" : "text-text-secondary"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filtered.map((item) => (
              <Link key={item.id} to={`/welfare/requests/${item.id}`} className="block">
                <div className="bg-white p-4 shadow-[0_6px_18px_rgb(0,0,0,0.04)] transition hover:bg-gray-50">
                  <div className="flex items-start justify-between gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center bg-blue-tint text-blue">
                      <Icon name={item.role === "Education" ? "education" : item.role === "Family" ? "family" : "wellness"} className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xl font-semibold text-text-primary">{item.title}</p>
                      <p className="mt-1 text-sm text-text-muted">for {item.owner} · {item.role}</p>
                    </div>
                    <span className="bg-[#f8f8f8] px-3 py-1 text-xs font-semibold text-text-secondary">
                      {item.due}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between pt-3">
                    <p className="text-sm text-text-muted">{item.status}</p>
                    <p className="text-2xl font-bold text-text-primary">{item.amount} pts</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardBody>
      </Card>
    </>
  );
}
