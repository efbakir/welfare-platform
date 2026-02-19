import { Link, useParams } from "react-router-dom";
import PageHeader from "../components/layout/PageHeader";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import { Card, CardBody } from "../components/ui/Card";

const requestDetails = {
  rq1: { title: "Little Stars Daycare", status: "In Review", amount: 200, eta: "2-3 days", policy: "Family Support", docs: "ID + child enrollment" },
  rq2: { title: "Team Cooking Class", status: "Approved", amount: 70, eta: "Confirmed", policy: "Community", docs: "None" },
  rq3: { title: "Language Classes", status: "Completed", amount: 90, eta: "Done", policy: "Learning", docs: "Invoice" },
  rq4: { title: "Gym Membership", status: "Pending", amount: 50, eta: "3 days", policy: "Wellbeing", docs: "Membership proof" },
};

const statusTone = {
  "In Review": "blue",
  Pending: "blue",
  Approved: "green",
  Completed: "neutral",
};

export default function RequestDetail() {
  const { requestId } = useParams();
  const detail = requestDetails[requestId] ?? requestDetails.rq1;

  return (
    <div className="mx-auto w-full max-w-[1080px] space-y-5">
      <PageHeader
        title={detail.title}
        subtitle="Status, policy context, and next actions in one view."
        actions={
          <Link to="/welfare/requests">
            <Button variant="outline" size="sm">Back to requests</Button>
          </Link>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
        <Card>
          <CardBody className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant={statusTone[detail.status] || "neutral"}>{detail.status}</Badge>
              <Badge variant="neutral">{detail.policy}</Badge>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="ui-panel-tint bg-violet-tint p-4">
                <p className="text-xs font-medium text-text-muted">Requested credits</p>
                <p className="mt-2 text-[28px] font-semibold leading-none tracking-[-0.02em] text-text-primary">{detail.amount}</p>
                <p className="mt-1 text-xs text-text-secondary">points</p>
              </div>
              <div className="ui-panel-tint bg-cyan-tint p-4">
                <p className="text-xs font-medium text-text-muted">Estimated timeline</p>
                <p className="mt-2 text-[28px] font-semibold leading-none tracking-[-0.02em] text-text-primary">{detail.eta}</p>
                <p className="mt-1 text-xs text-text-secondary">business status</p>
              </div>
              <div className="ui-panel-tint bg-green-tint p-4">
                <p className="text-xs font-medium text-text-muted">Required docs</p>
                <p className="mt-2 text-sm font-semibold text-text-primary">{detail.docs}</p>
              </div>
            </div>

            <div className="ui-panel p-4">
              <p className="text-sm font-semibold text-text-primary">Next step</p>
              <p className="mt-1 text-sm text-text-secondary">No immediate action required. You will be notified once review is finalized.</p>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="space-y-3">
            <p className="text-lg font-semibold text-text-primary">Transparency panel</p>
            <div className="ui-panel ui-interactive p-3">
              <p className="text-xs font-medium text-text-muted">Policy reference</p>
              <p className="mt-1 text-sm font-semibold text-blue">Open policy for {detail.policy}</p>
            </div>
            <div className="ui-panel p-3">
              <p className="text-xs font-medium text-text-muted">Checklist status</p>
              <p className="mt-1 text-sm font-semibold text-text-primary">Documents complete</p>
            </div>
            <Button className="w-full">Contact support</Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
