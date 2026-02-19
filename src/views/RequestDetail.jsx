import { Link, useParams } from "react-router-dom";
import PageHeader from "../components/layout/PageHeader";
import Button from "../components/ui/Button";
import { Card, CardBody } from "../components/ui/Card";

const requestDetails = {
  rq1: { title: "Little Stars Daycare", status: "In Review", amount: 200, eta: "2-3 days" },
  rq2: { title: "Team Cooking Class", status: "Approved", amount: 70, eta: "Confirmed" },
  rq3: { title: "Language Classes", status: "Completed", amount: 90, eta: "Done" },
  rq4: { title: "Gym Membership", status: "Pending", amount: 50, eta: "3 days" },
};

export default function RequestDetail() {
  const { requestId } = useParams();
  const detail = requestDetails[requestId] ?? requestDetails.rq1;

  return (
    <div className="mx-auto w-full max-w-[980px] space-y-6">
      <PageHeader
        eyebrow="Request"
        title={detail.title}
        subtitle="Simple status and next action"
        actions={
          <Link to="/welfare/requests">
            <Button variant="outline" size="sm">Back</Button>
          </Link>
        }
      />

      <Card>
        <CardBody className="grid gap-3 md:grid-cols-3">
          <div className="rounded-md bg-violet-tint p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Status</p>
            <p className="mt-1 text-lg font-semibold text-text-primary">{detail.status}</p>
          </div>
          <div className="rounded-md bg-cyan-tint p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Requested credits</p>
            <p className="mt-1 text-lg font-semibold text-text-primary">{detail.amount} pts</p>
          </div>
          <div className="rounded-md bg-green-tint p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Estimated time</p>
            <p className="mt-1 text-lg font-semibold text-text-primary">{detail.eta}</p>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="space-y-2">
          <p className="text-sm text-text-secondary">Next step: We will notify you once this request is finalized. No additional action is required now.</p>
          <Button size="sm">Contact support</Button>
        </CardBody>
      </Card>
    </div>
  );
}
