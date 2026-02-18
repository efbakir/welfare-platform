import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/layout/PageHeader";
import Button from "../components/ui/Button";
import { Card, CardBody } from "../components/ui/Card";

const tabs = ["Progress", "Requests", "Work"];

const requests = [
  { id: "rq1", title: "Little Stars Daycare", owner: "Mario Rossi", role: "Family", amount: 200, status: "Progress", due: "Due 29/02" },
  { id: "rq2", title: "Team Cooking Class", owner: "HR Team", role: "Social", amount: 70, status: "Requests", due: "Due 26/02" },
  { id: "rq3", title: "Language Classes", owner: "Learning Hub", role: "Education", amount: 90, status: "Work", due: "Complete" },
  { id: "rq4", title: "Gym Membership", owner: "Wellness Ops", role: "Wellness", amount: 50, status: "Progress", due: "Due 04/03" },
];

export default function BenefitRequests() {
  const [activeTab, setActiveTab] = useState("Progress");
  const filtered = useMemo(() => requests.filter((item) => item.status === activeTab), [activeTab]);

  return (
    <>
      <PageHeader
        eyebrow="Operations"
        title="Benefit Requests"
        subtitle="Track work-in-progress and approvals"
        actions={<Button size="sm">Create request</Button>}
      />

      <Card>
        <CardBody className="space-y-4 p-4">
          <div className="rounded-2xl bg-[#f8f8f8] p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Total income</p>
            <p className="mt-1 text-4xl font-bold text-text-primary">$12,500.00</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button className="rounded-full bg-blue px-4 py-2.5 text-sm font-semibold text-white">Withdraw</button>
              <Link to="/transactions" className="rounded-full bg-white px-4 py-2.5 text-center text-sm font-semibold text-text-secondary shadow-[0_6px_18px_rgb(0,0,0,0.04)]">Transaction</Link>
            </div>
          </div>

          <div className="inline-flex rounded-full bg-[#ececec] p-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  tab === activeTab ? "bg-blue text-white" : "text-text-secondary"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filtered.map((item) => (
              <Link key={item.id} to={`/requests/${item.id}`} className="block">
                <div className="rounded-2xl bg-white p-4 shadow-[0_6px_18px_rgb(0,0,0,0.04)] transition hover:bg-gray-50">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-[28px] leading-[1] text-text-primary">•</p>
                    <div className="min-w-0 flex-1">
                      <p className="text-xl font-semibold text-text-primary">{item.title}</p>
                      <p className="mt-1 text-sm text-text-muted">for {item.owner} · {item.role}</p>
                    </div>
                    <span className="rounded-full bg-[#f8f8f8] px-3 py-1 text-xs font-semibold text-text-secondary">
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
