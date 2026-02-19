import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/layout/PageHeader";
import Button from "../components/ui/Button";
import { Card, CardBody } from "../components/ui/Card";
import Icon from "../components/ui/Icon";
import { usePov } from "../context/PovContext";

const tabs = ["Pending", "Approved", "Completed"];

const requests = [
  { id: "rq1", title: "Little Stars Daycare", category: "Family", amount: 200, status: "Pending", eta: "2 days" },
  { id: "rq2", title: "Team Cooking Class", category: "Guild event", amount: 70, status: "Approved", eta: "Confirmed" },
  { id: "rq3", title: "Language Classes", category: "Education", amount: 90, status: "Completed", eta: "Done" },
  { id: "rq4", title: "Gym Membership", category: "Wellness", amount: 50, status: "Pending", eta: "3 days" },
];

export default function BenefitRequests() {
  const { profile } = usePov();
  const [activeTab, setActiveTab] = useState("Pending");

  const filtered = useMemo(() => requests.filter((item) => item.status === activeTab), [activeTab]);
  const pendingCount = requests.filter((item) => item.status === "Pending").length;

  return (
    <div className="mx-auto w-full max-w-[1220px] space-y-6">
      <PageHeader
        eyebrow="Requests"
        title="Benefit Requests"
        subtitle="Simple request tracking and next actions."
        actions={<Button size="sm">Create request</Button>}
      />

      <Card>
        <CardBody className="grid gap-3 md:grid-cols-3">
          <div className="rounded-md bg-violet-tint p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Available credits</p>
            <p className="mt-1 text-2xl font-semibold text-text-primary">{profile.budget.remaining} pts</p>
          </div>
          <div className="rounded-md bg-cyan-tint p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Pending requests</p>
            <p className="mt-1 text-2xl font-semibold text-text-primary">{pendingCount}</p>
          </div>
          <div className="rounded-md bg-green-tint p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Typical approval time</p>
            <p className="mt-1 text-2xl font-semibold text-text-primary">2-4 days</p>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="space-y-4">
          <div className="inline-flex bg-violet-tint p-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-semibold ${tab === activeTab ? "bg-blue text-white" : "text-text-secondary"}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filtered.map((item) => (
              <Link key={item.id} to={`/welfare/requests/${item.id}`} className="block">
                <article className="rounded-md bg-[rgba(255,255,255,0.78)] p-4 shadow-[var(--shadow-xs)] transition hover:bg-white">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-lg font-semibold text-text-primary">{item.title}</p>
                      <p className="mt-1 text-sm text-text-secondary">{item.category}</p>
                    </div>
                    <span className="text-sm font-semibold text-blue">{item.amount} pts</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm text-text-muted">
                    <span className="inline-flex items-center gap-1"><Icon name="calendar" className="h-4 w-4" /> {item.eta}</span>
                    <span>{item.status}</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
