import { Link } from "react-router-dom";
import PageHeader from "../components/layout/PageHeader";
import Button from "../components/ui/Button";
import { Card, CardBody } from "../components/ui/Card";

const transactions = [
  { id: "t1", label: "Sales landing page", at: "from Danny · Framer", note: "Payment from Danny", amount: 1500, status: "Complete" },
  { id: "t2", label: "Payment landing page", at: "for Barbara · Framer", note: "Refund to Barbara", amount: -2000, status: "Canceled" },
  { id: "t3", label: "Marketing landing page", at: "from Zain · Webflow", note: "Payment from Zain", amount: 900, status: "Complete" },
];

const statusStyle = {
  Complete: "bg-green-tint text-green border-green/25",
  Canceled: "bg-red-tint text-red border-red/20",
};

export default function Transactions() {
  return (
    <>
      <PageHeader
        eyebrow="Wallet ledger"
        title="Transactions"
        subtitle="Detailed payout and refund tracking"
        actions={<Button variant="outline" size="sm">Export CSV</Button>}
      />

      <Card>
        <CardBody className="space-y-3 p-4">
          {transactions.map((transaction) => (
            <Link key={transaction.id} to={`/transactions/${transaction.id}`} className="block rounded-2xl bg-white p-4 shadow-[0_6px_18px_rgb(0,0,0,0.04)] transition hover:bg-gray-50">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-2xl font-semibold text-text-primary">{transaction.label}</p>
                  <p className="mt-1 text-sm text-text-muted">{transaction.at}</p>
                </div>
                <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyle[transaction.status]}`}>
                  {transaction.status}
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between pt-3">
                <p className="text-sm text-text-muted">{transaction.note}</p>
                <p className="text-4xl font-bold text-text-primary">${Math.abs(transaction.amount).toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </CardBody>
      </Card>
    </>
  );
}
