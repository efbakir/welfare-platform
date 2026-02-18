import { Link, useParams } from "react-router-dom";
import PageHeader from "../components/layout/PageHeader";
import Button from "../components/ui/Button";
import { Card, CardBody } from "../components/ui/Card";

const details = {
  t1: { label: "Sales landing page", amount: 1500, status: "Complete", ref: "TXN-458921" },
  t2: { label: "Payment landing page", amount: -2000, status: "Canceled", ref: "TXN-458630" },
  t3: { label: "Marketing landing page", amount: 900, status: "Complete", ref: "TXN-457112" },
};

export default function TransactionDetail() {
  const { transactionId } = useParams();
  const detail = details[transactionId] ?? details.t1;

  return (
    <>
      <PageHeader
        eyebrow="Transaction detail"
        title={detail.label}
        subtitle={detail.ref}
        actions={
          <Link to="/welfare/transactions">
            <Button variant="outline" size="sm">Back</Button>
          </Link>
        }
      />

      <Card>
        <CardBody className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-[#f8f8f8] p-4">
            <p className="text-xs uppercase tracking-wide text-text-muted">Amount</p>
            <p className={`mt-1 text-2xl font-bold ${detail.amount < 0 ? "text-text-primary" : "text-green"}`}>
              {detail.amount < 0 ? "" : "+"}
              {detail.amount} pts
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-[#f8f8f8] p-4">
            <p className="text-xs uppercase tracking-wide text-text-muted">Status</p>
            <p className="mt-1 text-lg font-semibold text-text-primary">{detail.status}</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-[#f8f8f8] p-4">
            <p className="text-xs uppercase tracking-wide text-text-muted">Payment method</p>
            <p className="mt-1 text-sm font-semibold text-text-primary">Benefit Wallet Ledger</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-[#f8f8f8] p-4">
            <p className="text-xs uppercase tracking-wide text-text-muted">Recorded</p>
            <p className="mt-1 text-sm font-semibold text-text-primary">February 17, 2026</p>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
