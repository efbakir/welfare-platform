import { Link } from "react-router-dom";
import PageHeader from "../components/layout/PageHeader";
import Button from "../components/ui/Button";
import ModuleCard from "../components/ui/ModuleCard";
import mockData from "../data/mock.json";
import { formatRelativeTime } from "../utils/time";

const teamExperienceImages = {
  bt1: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
  bt2: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=1200&q=80",
  bt3: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
};

const socialAvatars = [
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=180&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=180&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=180&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=180&q=80",
  "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=180&q=80",
];

function feedAction(item) {
  if (item.type === "benefit_used") return "redeemed";
  if (item.type === "milestone") return "unlocked";
  if (item.type === "social") return "posted";
  if (item.type === "fomo") return "shared";
  return "updated";
}

export default function Dashboard() {
  const { feedItems, benefitsThatBringTogether } = mockData;
  const trendBg = ["bg-blue-tint", "bg-secondary-tint", "bg-cyan-tint"];

  return (
    <>
      <PageHeader
        eyebrow="Social FOMO Engine"
        title="Dashboard"
        subtitle="Live social signals that drive benefit usage"
        actions={
          <>
            <Link to="/inbox"><Button variant="outline" size="sm">Open inbox</Button></Link>
            <Link to="/marketplace"><Button variant="primary" size="sm">Explore benefits</Button></Link>
          </>
        }
      />

      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.9fr]">
        <div className="rounded-2xl bg-white p-7 shadow-[0_8px_24px_rgb(0,0,0,0.035)]">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-4xl font-bold tracking-tight text-text-primary">Activity Feed</h2>
            <span className="rounded-full bg-blue-tint px-4 py-1.5 text-sm font-medium text-blue">Live</span>
          </div>
          <div className="space-y-3">
            {feedItems.map((item, idx) => (
              <article key={item.id} className="animate-fade-up flex items-start gap-3 rounded-2xl bg-[#f8fafc] p-4">
                <img src={socialAvatars[idx % socialAvatars.length]} alt={item.actor} className="h-12 w-12 rounded-full object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="text-base text-text-primary">
                    <strong className="font-bold">{item.actor}</strong>{" "}
                    <strong className="font-bold">{feedAction(item)}</strong>{" "}
                    <span className="font-medium text-text-secondary">{item.title.toLowerCase()}</span>
                  </p>
                  <p className="mt-1 text-sm font-medium text-text-secondary">{item.description}</p>
                </div>
                <span className="shrink-0 rounded-full bg-white px-3 py-1 text-sm font-medium text-gray-400">{formatRelativeTime(item.timestamp)}</span>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-7 shadow-[0_8px_24px_rgb(0,0,0,0.035)]">
          <h2 className="mb-5 text-3xl font-bold tracking-tight text-text-primary">Trending</h2>
          <div className="space-y-3">
            {benefitsThatBringTogether.map((stat, i) => (
              <div key={stat.id} className={`rounded-2xl p-4 ${trendBg[i % trendBg.length]}`}>
                <p className="text-4xl font-bold tracking-tight text-text-primary">{12 + i * 3}</p>
                <p className="text-sm font-medium text-gray-400">{stat.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-4xl font-bold tracking-tight text-text-primary">Benefits that bring people together</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {benefitsThatBringTogether.map((b) => (
            <ModuleCard
              key={b.id}
              to={`/events/${b.id}`}
              accent="green"
              image={teamExperienceImages[b.id]}
              title={b.title}
              description={b.description}
              badge={{ label: `${b.spotsLeft} spots left`, variant: "green" }}
              ctaLabel="View event"
            />
          ))}
        </div>
      </section>
    </>
  );
}
