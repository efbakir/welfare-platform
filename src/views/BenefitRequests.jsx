import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/layout/PageHeader";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import { Card, CardBody } from "../components/ui/Card";
import Icon from "../components/ui/Icon";
import { usePov } from "../context/PovContext";

const tabs = ["Pending", "Approved", "Completed"];

const requests = [
  { id: "rq1", title: "Little Stars Daycare", category: "Family", amount: 200, status: "Pending", eta: "2 days", policy: "Family Support", docs: "ID + child enrollment" },
  { id: "rq2", title: "Team Cooking Class", category: "Guild event", amount: 70, status: "Approved", eta: "Confirmed", policy: "Community", docs: "None" },
  { id: "rq3", title: "Language Classes", category: "Education", amount: 90, status: "Completed", eta: "Done", policy: "Learning", docs: "Course invoice" },
  { id: "rq4", title: "Gym Membership", category: "Wellness", amount: 50, status: "Pending", eta: "3 days", policy: "Wellbeing", docs: "Membership proof" },
];

const statusTone = {
  Pending: "blue",
  Approved: "green",
  Completed: "neutral",
};

export default function BenefitRequests() {
  const { profile } = usePov();
  const [activeTab, setActiveTab] = useState("Pending");

  const filtered = useMemo(() => requests.filter((item) => item.status === activeTab), [activeTab]);
  const pendingCount = requests.filter((item) => item.status === "Pending").length;
  const approvedCount = requests.filter((item) => item.status === "Approved").length;
  const expiringSoon = Math.max(20, Math.round(profile.budget.total * 0.18));
  const learningUsage = Math.min(95, 52 + Math.round((profile.budget.allocated / Math.max(profile.budget.total, 1)) * 34));

  return (
    <div className="mx-auto w-full max-w-[1240px] space-y-5">
      <PageHeader
        title="Requests"
        subtitle="Simplified approvals with clearer eligibility, timing, and required documents."
        actions={<Button size="sm">Create request</Button>}
      />

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <Card>
            <CardBody className="rounded-xl bg-violet-tint p-4">
              <p className="text-xs font-medium text-text-muted">{profile.requestsEmphasis?.title || "Request emphasis"}</p>
              <p className="mt-1 text-sm font-semibold text-text-primary">{profile.requestsEmphasis?.copy || "Requests adapt to your profile context."}</p>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl bg-violet-tint p-4">
                <p className="text-xs font-medium text-text-muted">Available credits</p>
                <p className="mt-2 text-[30px] font-semibold leading-none tracking-[-0.02em] text-text-primary">{profile.budget.remaining}</p>
                <p className="mt-1 text-xs text-text-secondary">points available</p>
              </div>
              <div className="rounded-xl bg-cyan-tint p-4">
                <p className="text-xs font-medium text-text-muted">Expiring soon</p>
                <p className="mt-2 text-[30px] font-semibold leading-none tracking-[-0.02em] text-text-primary">{expiringSoon}</p>
                <p className="mt-1 text-xs text-text-secondary">next 30 days</p>
              </div>
              <div className="rounded-xl bg-green-tint p-4">
                <p className="text-xs font-medium text-text-muted">Pending approvals</p>
                <p className="mt-2 text-[30px] font-semibold leading-none tracking-[-0.02em] text-text-primary">{pendingCount}</p>
                <p className="mt-1 text-xs text-text-secondary">active queue</p>
              </div>
              <div className="rounded-xl bg-white/80 p-4 shadow-[var(--shadow-xs)]">
                <p className="text-xs font-medium text-text-muted">Avg. timeline</p>
                <p className="mt-2 text-[30px] font-semibold leading-none tracking-[-0.02em] text-text-primary">2-4</p>
                <p className="mt-1 text-xs text-text-secondary">business days</p>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-md px-4 py-2 text-sm font-semibold ${tab === activeTab ? "bg-blue text-white" : "bg-violet-tint text-text-secondary"}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="space-y-2.5">
                {filtered.map((item) => (
                  <Link key={item.id} to={`/welfare/requests/${item.id}`} className="block">
                    <article className="rounded-xl bg-white/80 p-4 shadow-[var(--shadow-xs)] transition hover:bg-white">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-lg font-semibold text-text-primary">{item.title}</p>
                          <div className="mt-1 flex flex-wrap items-center gap-2">
                            <Badge variant="neutral">{item.category}</Badge>
                            <Badge variant={statusTone[item.status] || "neutral"}>{item.status}</Badge>
                          </div>
                        </div>
                        <p className="text-base font-semibold text-blue">{item.amount} pts</p>
                      </div>

                      <div className="mt-3 grid gap-2 text-sm text-text-secondary sm:grid-cols-3">
                        <p className="inline-flex items-center gap-1"><Icon name="calendar" className="h-4 w-4" /> {item.eta}</p>
                        <p className="truncate">Policy: {item.policy}</p>
                        <p className="truncate">Docs: {item.docs}</p>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardBody className="space-y-3">
              <p className="text-lg font-semibold text-text-primary">Eligibility snapshot</p>
              <div className="rounded-xl bg-violet-tint p-3">
                <p className="text-xs font-medium text-text-muted">Family support</p>
                <p className="mt-1 text-sm font-semibold text-text-primary">
                  {profile.familyEnabled ? "Eligible for Family Support reimbursement" : "Not enabled for this profile"}
                </p>
              </div>
              <div className="rounded-xl bg-cyan-tint p-3">
                <p className="text-xs font-medium text-text-muted">Learning budget usage</p>
                <p className="mt-1 text-sm font-semibold text-text-primary">{learningUsage}% consumed</p>
              </div>
              <div className="rounded-xl bg-green-tint p-3">
                <p className="text-xs font-medium text-text-muted">Approval readiness</p>
                <p className="mt-1 text-sm font-semibold text-text-primary">{approvedCount} requests are ready for fulfillment</p>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="space-y-3">
              <p className="text-lg font-semibold text-text-primary">Smart suggestions</p>
              <div className="rounded-xl bg-white/80 p-3 shadow-[var(--shadow-xs)] text-sm text-text-secondary">
                Based on your profile, request <span className="font-semibold text-text-primary">{profile.recommended[0]?.title}</span> first to reduce expiry risk.
              </div>
              <div className="rounded-xl bg-white/80 p-3 shadow-[var(--shadow-xs)] text-sm text-text-secondary">
                People in your role often request <span className="font-semibold text-text-primary">{profile.profileAnswers.focus}</span> benefits before month-end.
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="space-y-3">
              <p className="text-lg font-semibold text-text-primary">Transparency</p>
              <div className="rounded-xl bg-white/80 p-3 shadow-[var(--shadow-xs)]">
                <p className="text-xs font-medium text-text-muted">Approval timeline</p>
                <p className="mt-1 text-sm font-semibold text-text-primary">Typical review in 2-4 business days</p>
              </div>
              <div className="rounded-xl bg-white/80 p-3 shadow-[var(--shadow-xs)]">
                <p className="text-xs font-medium text-text-muted">Policy reference</p>
                <p className="mt-1 text-sm font-semibold text-blue">Open benefit policy guide</p>
              </div>
              <div className="rounded-xl bg-white/80 p-3 shadow-[var(--shadow-xs)]">
                <p className="text-xs font-medium text-text-muted">Required documents</p>
                <p className="mt-1 text-sm font-semibold text-text-primary">Invoice, eligibility proof, and optional attendance proof</p>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
