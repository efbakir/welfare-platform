import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/layout/PageHeader";
import { Card, CardBody } from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Icon from "../components/ui/Icon";
import { marketplaceCatalog } from "../data/povData";
import { usePov } from "../context/PovContext";

const categories = ["All", "Wellness", "Family", "Education", "Child & Education"];

const categoryMeta = {
  Wellness: { icon: "wellness", chip: "bg-green-tint text-green" },
  Family: { icon: "family", chip: "bg-secondary-tint text-secondary" },
  Education: { icon: "education", chip: "bg-violet-tint text-blue" },
  "Child & Education": { icon: "child", chip: "bg-cyan-tint text-text-secondary" },
};

const cardImages = {
  "Gym Membership": "photo-1571019613454-1cb2f99b2d8b",
  "Mental Health Support": "photo-1506126613408-eca07ce68773",
  "Family Wellness Package": "photo-1511895426328-dc8714191300",
  "Little Stars Daycare": "photo-1588072432836-e10032774350",
  "After-school Program": "photo-1503676260728-1c00da094a0b",
  "Training Voucher": "photo-1454165804606-c3d57bc86b40",
  "Language Classes": "photo-1481627834876-b7833e8f5570",
  "Caregiver Support Sessions": "photo-1516307365426-bea591f05011",
};

export default function Marketplace() {
  const { profile } = usePov();
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const featuredSet = useMemo(() => new Set(profile.marketplace.featured), [profile.marketplace.featured]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filteredByCategory = category === "All" ? marketplaceCatalog : marketplaceCatalog.filter((item) => item.category === category);
    const filtered = q.length === 0
      ? filteredByCategory
      : filteredByCategory.filter((item) => `${item.name} ${item.category} ${item.eligible}`.toLowerCase().includes(q));

    return [...filtered].sort((a, b) => {
      const aScore = featuredSet.has(a.name) ? 1 : 0;
      const bScore = featuredSet.has(b.name) ? 1 : 0;
      return bScore - aScore;
    });
  }, [category, query, featuredSet]);

  return (
    <div className="mx-auto w-full max-w-[1220px] space-y-6">
      <PageHeader
        eyebrow="Discovery"
        title="Marketplace"
        subtitle="Search and discover benefits that match your profile context."
      />

      <Card>
        <CardBody className="space-y-4">
          <div className="grid gap-3 md:grid-cols-[1fr_auto]">
            <div className="relative">
              <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search benefits, categories, or eligibility..."
                className="w-full border border-[rgba(255,255,255,0.7)] bg-[rgba(255,255,255,0.84)] py-2.5 pl-9 pr-3 text-sm text-text-primary outline-none"
              />
            </div>
            <div className="rounded-md bg-violet-tint px-3 py-2 text-xs font-semibold text-text-secondary">
              {visible.length} results
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

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((item) => {
          const isClickable = featuredSet.has(item.name) || item.points >= 120;
          const card = (
            <Card className="h-full cursor-pointer transition hover:-translate-y-[1px]">
              <div className="h-36 w-full overflow-hidden bg-[#eef1ff]">
                <img
                  src={`https://images.unsplash.com/${cardImages[item.name] ?? "photo-1521737604893-d14cc237f11d"}?w=640&h=360&fit=crop&q=80`}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <CardBody className="space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-lg font-semibold text-text-primary">{item.name}</p>
                  {featuredSet.has(item.name) && <Badge variant="blue">Recommended</Badge>}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold ${categoryMeta[item.category]?.chip ?? "bg-blue-tint text-blue"}`}>
                    <Icon name={categoryMeta[item.category]?.icon ?? "spark"} className="h-3.5 w-3.5" />
                    {item.category}
                  </span>
                  <Badge variant={item.eligible === "Recommended" ? "blue" : "green"}>{item.eligible}</Badge>
                </div>

                <div className="grid gap-2 text-sm text-text-secondary md:grid-cols-2">
                  <p><span className="font-semibold text-text-primary">{item.points}</span> points</p>
                  <p>Expires {item.expiry}</p>
                </div>

                <div className="pt-1">
                  <span className={`text-sm font-semibold ${isClickable ? "text-blue" : "text-text-muted"}`}>
                    {isClickable ? "Open details" : "Preview only"}
                  </span>
                </div>
              </CardBody>
            </Card>
          );

          if (isClickable) {
            return (
              <Link key={item.id} to={`/welfare/marketplace/${item.id}`} className="block h-full">
                {card}
              </Link>
            );
          }

          return (
            <div key={item.id} className="h-full cursor-pointer">
              {card}
            </div>
          );
        })}
      </div>
    </div>
  );
}
