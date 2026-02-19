import { useMemo, useState } from "react";
import PageHeader from "../components/layout/PageHeader";
import { Card, CardBody } from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Icon from "../components/ui/Icon";
import { marketplaceCatalog } from "../data/povData";
import { usePov } from "../context/PovContext";

const categories = ["All", "Wellness", "Family", "Education", "Child & Education"];
const categoryMeta = {
  Wellness: { icon: "wellness", badge: "green", chip: "bg-green-tint text-green" },
  Family: { icon: "family", badge: "pink", chip: "bg-secondary-tint text-secondary" },
  Education: { icon: "education", badge: "blue", chip: "bg-violet-tint text-blue" },
  "Child & Education": { icon: "child", badge: "orange", chip: "bg-cyan-tint text-text-secondary" },
};

const benefitCategory = (name) => marketplaceCatalog.find((item) => item.name === name)?.category ?? "Wellness";

export default function Marketplace() {
  const { profile } = usePov();
  const [category, setCategory] = useState("All");

  const featuredSet = useMemo(() => new Set(profile.marketplace.featured), [profile.marketplace.featured]);

  const sorted = useMemo(() => {
    const filtered = category === "All" ? marketplaceCatalog : marketplaceCatalog.filter((item) => item.category === category);
    return [...filtered].sort((a, b) => {
      const aRec = featuredSet.has(a.name) ? 1 : 0;
      const bRec = featuredSet.has(b.name) ? 1 : 0;
      return bRec - aRec;
    });
  }, [category, featuredSet]);

  return (
    <div className="mx-auto w-full max-w-[1220px] space-y-6">
      <PageHeader
        eyebrow="Discovery"
        title="Marketplace"
        subtitle="Simple discovery, high relevance, and transparent eligibility."
      />

      <Card>
        <CardBody className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-md bg-violet-tint p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Recommended sorting</p>
              <p className="mt-1 text-base font-semibold text-text-primary">Prioritized for {profile.name}</p>
              <p className="mt-1 text-sm text-text-secondary">{profile.marketplace.quickNote}</p>
            </div>
            <div className="rounded-md bg-cyan-tint p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Current context</p>
              <p className="mt-1 text-sm font-semibold text-text-primary">{profile.lifeStage} · {profile.workMode} · {profile.profileAnswers.focus}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={`px-4 py-2 text-sm font-semibold ${category === item ? "bg-blue text-white" : "bg-violet-tint text-text-secondary"}`}
          >
            {item}
          </button>
        ))}
          </div>
        </CardBody>
      </Card>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight text-text-primary">Featured for {profile.name}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {profile.marketplace.featured.map((name) => (
            <Card key={name}>
              <CardBody className="space-y-2.5">
                <span className={`inline-flex h-10 w-10 items-center justify-center ${categoryMeta[benefitCategory(name)]?.chip ?? "bg-blue-tint text-blue"}`}>
                  <Icon name={categoryMeta[benefitCategory(name)]?.icon ?? "spark"} className="h-5 w-5" />
                </span>
                <p className="text-lg font-semibold text-text-primary">{name}</p>
                <p className="text-sm text-text-muted">Recommended for your {profile.lifeStage.toLowerCase()} context</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        {sorted.map((item) => (
          <Card key={item.id}>
            <CardBody className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-4">
                <span className={`inline-flex h-11 w-11 shrink-0 items-center justify-center ${categoryMeta[item.category]?.chip ?? "bg-blue-tint text-blue"}`}>
                  <Icon name={categoryMeta[item.category]?.icon ?? "spark"} className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-lg font-semibold text-text-primary">{item.name}</p>
                  <p className="text-sm text-text-muted">{item.points} points · Expires {item.expiry}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {featuredSet.has(item.name) && <Badge variant="pink">Recommended</Badge>}
                <Badge variant={item.eligible === "Recommended" ? "blue" : "green"}>{item.eligible}</Badge>
                <Badge variant={categoryMeta[item.category]?.badge ?? "neutral"}>{item.category}</Badge>
              </div>
            </CardBody>
          </Card>
        ))}
      </section>
    </div>
  );
}
