import PageHeader from "../components/layout/PageHeader";
import { Card, CardBody } from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Icon from "../components/ui/Icon";
import { usePov } from "../context/PovContext";

const baseHistory = [
  {
    id: "h1",
    title: "Team cooking class",
    withWho: "Laura, Giulia, +6 colleagues",
    spent: 70,
    cashback: 20,
    impact: "Improved cross-team bonding and social wellbeing.",
    type: "Guild event",
    date: "2 days ago",
  },
  {
    id: "h2",
    title: "Language Classes",
    withWho: "Self-directed",
    spent: 90,
    cashback: 0,
    impact: "Advanced skill progression linked to learning goal.",
    type: "Learning",
    date: "1 week ago",
  },
  {
    id: "h3",
    title: "Wellness day",
    withWho: "Office cohort",
    spent: 50,
    cashback: 15,
    impact: "Reduced stress and increased energy at work.",
    type: "Wellbeing",
    date: "2 weeks ago",
  },
];

export default function Transactions() {
  const { profile } = usePov();

  const summary = {
    spent: baseHistory.reduce((sum, item) => sum + item.spent, 0),
    cashback: baseHistory.reduce((sum, item) => sum + item.cashback, 0),
    socialCount: baseHistory.filter((item) => item.withWho !== "Self-directed").length,
  };

  return (
    <div className="mx-auto w-full max-w-[1220px] space-y-6">
      <PageHeader
        eyebrow="Credit journey"
        title="History"
        subtitle="Where your credits were used, who you joined, and what value you got back."
      />

      <Card>
        <CardBody className="grid gap-3 md:grid-cols-3">
          <div className="rounded-md bg-violet-tint p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Credits spent</p>
            <p className="mt-1 text-2xl font-semibold text-text-primary">{summary.spent} pts</p>
          </div>
          <div className="rounded-md bg-green-tint p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Credits returned</p>
            <p className="mt-1 text-2xl font-semibold text-text-primary">{summary.cashback} pts</p>
          </div>
          <div className="rounded-md bg-cyan-tint p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Social activities</p>
            <p className="mt-1 text-2xl font-semibold text-text-primary">{summary.socialCount}</p>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="space-y-3">
          {baseHistory.map((item) => (
            <article key={item.id} className="rounded-md bg-[rgba(255,255,255,0.78)] p-4 shadow-[var(--shadow-xs)]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold text-text-primary">{item.title}</p>
                  <p className="mt-1 text-sm text-text-secondary">With: {item.withWho}</p>
                </div>
                <Badge variant={item.type === "Guild event" ? "blue" : "green"}>{item.type}</Badge>
              </div>
              <div className="mt-3 grid gap-2 md:grid-cols-3">
                <p className="text-sm text-text-secondary"><Icon name="wallet" className="mr-1 inline h-4 w-4" />Spent: {item.spent} pts</p>
                <p className="text-sm text-green"><Icon name="spark" className="mr-1 inline h-4 w-4" />Returned: {item.cashback} pts</p>
                <p className="text-sm text-text-muted">{item.date}</p>
              </div>
              <p className="mt-2 text-sm text-text-secondary">{item.impact}</p>
            </article>
          ))}
          <p className="text-xs text-text-muted">
            Tip: Guild events return a portion of spent credits when attendance is confirmed.
          </p>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="space-y-2">
          <h3 className="text-lg font-semibold text-text-primary">Personal impact summary</h3>
          <p className="text-sm text-text-secondary">
            Your activity pattern for {profile.name} shows strongest value from collaborative experiences and recurring wellbeing usage.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
