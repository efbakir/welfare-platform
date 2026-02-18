import { Link, useParams } from "react-router-dom";
import PageHeader from "../components/layout/PageHeader";
import Button from "../components/ui/Button";
import { Card, CardBody } from "../components/ui/Card";

const requestDetails = {
  rq1: {
    title: "Little Stars Daycare",
    owner: "Mario Rossi",
    status: "In Review",
    amount: 200,
    timeline: ["Submitted", "Manager approved", "Finance review", "Payout scheduled"],
  },
  rq2: {
    title: "Team Cooking Class",
    owner: "HR Team",
    status: "Pending",
    amount: 70,
    timeline: ["Submitted", "Capacity check", "Final confirmation"],
  },
  rq3: {
    title: "Language Classes",
    owner: "Learning Hub",
    status: "Completed",
    amount: 90,
    timeline: ["Submitted", "Eligibility review", "Approved", "Completed"],
  },
  rq4: {
    title: "Gym Membership",
    owner: "Wellness Ops",
    status: "In Progress",
    amount: 50,
    timeline: ["Submitted", "Verification", "Awaiting confirmation"],
  },
};

export default function RequestDetail() {
  const { requestId } = useParams();
  const detail = requestDetails[requestId] ?? requestDetails.rq1;

  return (
    <>
      <PageHeader
        eyebrow="Request detail"
        title={detail.title}
        subtitle={`Owner: ${detail.owner}`}
        actions={
          <Link to="/requests">
            <Button variant="outline" size="sm">Back</Button>
          </Link>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <Card>
          <CardBody className="space-y-4">
            <div className="rounded-2xl border border-gray-200 bg-[#f8f8f8] p-4">
              <p className="text-xs uppercase tracking-wide text-text-muted">Current status</p>
              <p className="mt-1 text-lg font-semibold text-text-primary">{detail.status}</p>
            </div>
            <div>
              <p className="mb-3 text-sm font-semibold text-text-primary">Approval timeline</p>
              <div className="space-y-3">
                {detail.timeline.map((step, idx) => (
                  <div key={step} className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-3">
                    <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${idx < 2 ? "bg-blue text-white" : "bg-gray-200 text-text-secondary"}`}>
                      {idx + 1}
                    </span>
                    <span className="text-sm text-text-primary">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="space-y-3">
            <p className="text-xs uppercase tracking-wide text-text-muted">Summary</p>
            <div className="rounded-2xl border border-gray-200 bg-[#f8f8f8] p-4">
              <p className="text-sm text-text-muted">Requested points</p>
              <p className="text-xl font-bold text-text-primary">{detail.amount} pts</p>
            </div>
            <Button className="w-full" size="sm">Escalate request</Button>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
