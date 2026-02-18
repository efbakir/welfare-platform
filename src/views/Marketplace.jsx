import { useMemo, useState } from "react";
import PageHeader from "../components/layout/PageHeader";
import { Card, CardBody } from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import { marketplaceCatalog } from "../data/povData";
import { usePov } from "../context/PovContext";

const categories = ["All", "Wellness", "Family", "Education", "Child & Education"];

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
    <>
      <PageHeader
        eyebrow="Discovery"
        title="Marketplace"
        subtitle="Recommendations based on your profile + work mode"
      />

      <div className="flex flex-wrap gap-2">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${category === item ? "bg-blue text-white" : "bg-white text-text-secondary shadow-[0_8px_20px_rgb(0,0,0,0.04)]"}`}
          >
            {item}
          </button>
        ))}
      </div>

      <section>
        <h2 className="mb-3 text-2xl font-bold tracking-tight text-text-primary">Featured for {profile.name}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {profile.marketplace.featured.map((name) => (
            <Card key={name}>
              <CardBody>
                <p className="text-lg font-semibold text-text-primary">{name}</p>
                <p className="mt-1 text-sm text-text-muted">Recommended for your {profile.lifeStage.toLowerCase()} context</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        {sorted.map((item) => (
          <Card key={item.id}>
            <CardBody className="flex items-center justify-between gap-3">
              <div>
                <p className="text-lg font-semibold text-text-primary">{item.name}</p>
                <p className="text-sm text-text-muted">{item.points} points · Expires {item.expiry}</p>
              </div>
              <div className="flex items-center gap-2">
                {featuredSet.has(item.name) && <Badge variant="pink">Recommended</Badge>}
                <Badge variant={item.eligible === "Recommended" ? "blue" : "green"}>{item.eligible}</Badge>
              </div>
            </CardBody>
          </Card>
        ))}
      </section>
    </>
  );
}
