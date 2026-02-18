import { Link } from "react-router-dom";
import PageHeader from "../components/layout/PageHeader";
import Button from "../components/ui/Button";
import { Card, CardBody } from "../components/ui/Card";
import Icon from "../components/ui/Icon";
import { usePov } from "../context/PovContext";

export default function Dashboard() {
  const { profile } = usePov();
  const getFeedMeta = (item) => {
    if (item.actor === "System") return { icon: "spark", tone: "bg-blue-tint text-blue" };
    if (item.actor === "HR") return { icon: "calendar", tone: "bg-violet-tint text-blue" };
    return { icon: "users", tone: "bg-green-tint text-green" };
  };

  return (
    <>
      <PageHeader
        eyebrow="Continuous touchpoint"
        title="Welfare Dashboard"
        subtitle="Recommendations based on your profile + work mode"
        actions={
          <>
            <Link to="/welfare/inbox"><Button variant="outline" size="sm">Open inbox</Button></Link>
            <Link to="/welfare/marketplace"><Button variant="primary" size="sm">Explore benefits</Button></Link>
          </>
        }
      />

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <Card>
          <CardBody className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight text-text-primary">Activity feed</h2>
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-tint px-3 py-1 text-xs font-semibold text-blue">
                <Icon name="spark" className="h-3.5 w-3.5" />
                Personalized
              </span>
            </div>
            {profile.dashboard.feed.map((item, index) => (
              <article key={`${item.actor}-${index}`} className="flex items-start gap-3 rounded-2xl bg-[#f8fafc] p-4">
                <div className={`flex h-11 w-11 items-center justify-center rounded-full text-xs font-semibold ${getFeedMeta(item).tone}`}>
                  <Icon name={getFeedMeta(item).icon} className="h-4.5 w-4.5" />
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue text-xs font-semibold text-white">
                  {item.actor.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-text-primary">
                    <strong>{item.actor}</strong> <strong>{item.action}</strong>
                  </p>
                  <p className="mt-1 text-sm text-text-secondary">{item.text}</p>
                </div>
                <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-text-muted">{item.time}</span>
              </article>
            ))}
          </CardBody>
        </Card>

        <Card>
          <CardBody className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight text-text-primary">Trending</h2>
            {profile.dashboard.trending.map((t) => (
              <div key={t.label} className="rounded-2xl bg-blue-tint p-4">
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-bold tracking-tight text-text-primary">{t.value}</p>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white text-blue">
                    <Icon name={t.label.toLowerCase().includes("family") ? "family" : "wellness"} className="h-4.5 w-4.5" />
                  </span>
                </div>
                <p className="text-sm text-text-secondary">{t.label}</p>
                <p className="mt-1 inline-flex rounded-full bg-secondary-tint px-2.5 py-1 text-xs font-semibold text-secondary">{t.spots} spots left</p>
              </div>
            ))}
          </CardBody>
        </Card>
      </section>

      <section>
        <h2 className="mb-3 text-2xl font-bold tracking-tight text-text-primary">Benefits that bring people together</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {profile.dashboard.together.map((item) => (
            <Card key={item.id}>
              <CardBody className="space-y-2">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-tint text-blue">
                  <Icon name="users" className="h-5 w-5" />
                </span>
                <p className="text-lg font-semibold text-text-primary">{item.title}</p>
                <p className="text-sm text-text-secondary">{item.description}</p>
                <p className="inline-flex rounded-full bg-green-tint px-3 py-1 text-xs font-semibold text-green">{item.spotsLeft} spots left</p>
                <p className="text-xs text-text-muted">Why this is recommended: {item.why}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
