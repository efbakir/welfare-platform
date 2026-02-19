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
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=96&h=96&q=80",
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
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=96&h=96&q=80",
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
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=96&h=96&q=80",
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
        title="History"
      />

      <div className="grid gap-3 md:grid-cols-3">
        <div className="ui-panel p-4">
          <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-text-muted">
            <Icon name="wallet" className="h-4 w-4 shrink-0" />
            Credits spent
          </p>
          <p className="mt-1 text-2xl font-semibold text-text-primary">{summary.spent} pts</p>
        </div>
        <div className="ui-panel p-4">
          <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-text-muted">
            <Icon name="spark" className="h-4 w-4 shrink-0" />
            Credits returned
          </p>
          <p className="mt-1 text-2xl font-semibold text-text-primary">{summary.cashback} pts</p>
        </div>
        <div className="ui-panel p-4">
          <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-text-muted">
            <Icon name="users" className="h-4 w-4 shrink-0" />
            Social activities
          </p>
          <p className="mt-1 text-2xl font-semibold text-text-primary">{summary.socialCount}</p>
        </div>
      </div>

      <Card>
        <CardBody className="space-y-3">
          {baseHistory.map((item) => (
            <article key={item.id} className="ui-panel ui-interactive space-y-4 border border-border p-4">
              <header className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">{item.title}</h3>
                  <p className="mt-1 text-sm text-text-muted">With {item.withWho}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={item.type === "Guild event" ? "blue" : "green"}>{item.type}</Badge>
                  <span className="text-xs text-text-muted">{item.date}</span>
                </div>
              </header>
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
                <span className="inline-flex items-center gap-1.5 text-text-secondary">
                  <Icon name="wallet" className="h-4 w-4 text-text-muted" />
                  Spent {item.spent} pts
                </span>
                <span className="inline-flex items-center gap-1.5 text-green">
                  <Icon name="spark" className="h-4 w-4" />
                  Returned {item.cashback} pts
                </span>
              </div>
              <p className="text-sm text-text-secondary border-l-2 border-border pl-3">{item.impact}</p>
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
