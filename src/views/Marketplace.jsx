import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/layout/PageHeader";
import { Card, CardBody } from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Icon from "../components/ui/Icon";
import { marketplaceCatalog } from "../data/povData";
import { usePov } from "../context/PovContext";

const categories = ["All", "Wellness", "Family", "Education", "Child & Education"];

const categoryMeta = {
  All: {
    icon: "spark",
    chip: "bg-[#eef2ff] text-[#2946a0]",
    accent: "bg-[#eef2ff] text-[#2946a0]",
    active: "bg-[#e4ebff] text-[#1f3f95] border-[#b6c8ff]",
  },
  Wellness: {
    icon: "wellness",
    chip: "bg-[#ebf8ef] text-[#1f8a52]",
    accent: "bg-[#ebf8ef] text-[#1f8a52]",
    active: "bg-[#dff3e8] text-[#1d7a49] border-[#abdcbf]",
  },
  Family: {
    icon: "family",
    chip: "bg-[#fff3ea] text-[#b5581f]",
    accent: "bg-[#fff3ea] text-[#b5581f]",
    active: "bg-[#ffe8d8] text-[#9a491a] border-[#f7c8aa]",
  },
  Education: {
    icon: "education",
    chip: "bg-[#eef5ff] text-[#2d5ca6]",
    accent: "bg-[#eef5ff] text-[#2d5ca6]",
    active: "bg-[#dfeeff] text-[#274f8f] border-[#b7d2f5]",
  },
  "Child & Education": {
    icon: "child",
    chip: "bg-[#f2efff] text-[#5541b2]",
    accent: "bg-[#f2efff] text-[#5541b2]",
    active: "bg-[#e7e1ff] text-[#4a389e] border-[#c8bdf8]",
  },
};

const cardImages = {
  "Backup Care Credits": "photo-1511895426328-dc8714191300",
  "Meal Delivery Subsidy": "photo-1542838132-92c53300491e",
  "Therapy & Stress Support": "photo-1506126613408-eca07ce68773",
  "Hybrid Home-Office Support": "photo-1497366811353-6870744d04b2",
  "Concierge Errands Service": "photo-1489515217757-5fd1be406fef",
  "Transport Pass / Fuel Support": "photo-1474487548417-781cb71495f3",
  "Meal Vouchers Near Workplace": "photo-1466978913421-dad2ebd01d17",
  "Pharmacy Essentials Credit": "photo-1587854692152-cbe660dbde88",
  "Near-work Gym Discount": "photo-1534438327276-14e5300c3a48",
  "Micro-rewards Gift Cards": "photo-1556740738-b6a63e27c4df",
  "Leadership Coaching Sessions": "photo-1552664730-d307ca884978",
  "Learning Stipend": "photo-1434030216411-0b793f4b4173",
  "Burnout Recovery Program": "photo-1499209974431-9dddcece7f88",
  "Remote Team Circles": "photo-1522202176988-66273c2fd55f",
  "Volunteering Day + Donation Match": "photo-1469571486292-b53601020fbb",
  "Childcare Subsidy": "photo-1588072432836-e10032774350",
  "Relocation Admin Support": "photo-1486406146926-c627a92ad1ab",
};

export default function Marketplace() {
  const { profile } = usePov();
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [filterOverrides, setFilterOverrides] = useState({});

  const featuredSet = useMemo(() => new Set(profile.marketplace.featured), [profile.marketplace.featured]);

  const featuredItems = useMemo(
    () => marketplaceCatalog.filter((item) => featuredSet.has(item.name)).slice(0, 4),
    [featuredSet]
  );

  const workModeFilter = filterOverrides[profile.id]?.workMode ?? profile.defaultFilters?.workMode ?? "All";
  const locationFilter = filterOverrides[profile.id]?.location ?? profile.defaultFilters?.location ?? "All";

  const locationOptions = useMemo(() => {
    const all = new Set(["All"]);
    marketplaceCatalog.forEach((item) => (item.locations || []).forEach((location) => all.add(location)));
    return [...all];
  }, []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filteredByCategory = category === "All" ? marketplaceCatalog : marketplaceCatalog.filter((item) => item.category === category);
    const filteredByWorkMode =
      workModeFilter === "All"
        ? filteredByCategory
        : filteredByCategory.filter((item) => (item.workModes || []).includes(workModeFilter));
    const filteredByLocation =
      locationFilter === "All"
        ? filteredByWorkMode
        : filteredByWorkMode.filter((item) => (item.locations || []).includes(locationFilter));

    const filtered = q.length === 0
      ? filteredByLocation
      : filteredByLocation.filter((item) => `${item.name} ${item.category} ${item.eligible}`.toLowerCase().includes(q));

    return [...filtered].sort((a, b) => {
      const aScore = featuredSet.has(a.name) ? 1 : 0;
      const bScore = featuredSet.has(b.name) ? 1 : 0;
      return bScore - aScore;
    });
  }, [category, query, featuredSet, workModeFilter, locationFilter]);

  return (
    <div className="flex h-[calc(100vh-116px)] w-full min-w-0 flex-col">
      <PageHeader
        title="Marketplace"
      />

      <div className="grid min-h-0 flex-1 gap-6 pt-4 xl:grid-cols-[280px_1fr]">
        <aside className="sticky top-0 self-start border-r border-border pr-5">
          <div className="space-y-5">
            <section className="space-y-1">
              <p className="mb-2 text-lg font-semibold tracking-tight text-text-primary">Categories</p>
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`flex w-full items-center gap-2 rounded-md border px-3 py-2 text-left text-sm font-medium transition ${
                    category === item
                      ? `${categoryMeta[item]?.active ?? "bg-blue-tint text-blue border-blue-tint"}`
                      : "border-transparent text-text-secondary hover:bg-[var(--color-grey-tint)] hover:shadow-[var(--shadow-sm)]"
                  }`}
                >
                  <span className={`inline-flex h-7 w-7 items-center justify-center rounded-md ${category === item ? (categoryMeta[item]?.accent ?? "bg-blue-tint") : "bg-[var(--color-grey-tint)]"}`}>
                    <Icon name={categoryMeta[item]?.icon ?? "spark"} className="h-3.5 w-3.5" />
                  </span>
                  {item}
                </button>
              ))}
            </section>

            <section className="space-y-3 border-t border-border pt-4">
              <p className="text-sm font-semibold text-text-primary">Default filters</p>
              <div>
                <p className="mb-1 text-xs text-text-muted">Work mode</p>
                <select
                  value={workModeFilter}
                  onChange={(e) =>
                    setFilterOverrides((prev) => ({
                      ...prev,
                      [profile.id]: { ...(prev[profile.id] || {}), workMode: e.target.value },
                    }))
                  }
                  className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary outline-none"
                >
                  {["All", "Remote", "Hybrid", "On-site"].map((mode) => (
                    <option key={mode} value={mode}>{mode}</option>
                  ))}
                </select>
              </div>
              <div>
                <p className="mb-1 text-xs text-text-muted">Location</p>
                <select
                  value={locationFilter}
                  onChange={(e) =>
                    setFilterOverrides((prev) => ({
                      ...prev,
                      [profile.id]: { ...(prev[profile.id] || {}), location: e.target.value },
                    }))
                  }
                  className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary outline-none"
                >
                  {locationOptions.map((location) => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
            </section>

            <section className="space-y-3 border-t border-border pt-4">
              <p className="text-lg font-semibold text-text-primary">Request a benefit</p>
              <p className="text-sm text-text-secondary">Can’t find what you need? Submit a request and HR can review it.</p>
              <Button className="w-full" variant="outline">Submit request</Button>
            </section>
          </div>
        </aside>

        <div className="min-h-0 overflow-y-auto pr-1">
          <div className="sticky top-0 z-20 mb-4 border-b border-border bg-bg pb-4">
            <div className="grid gap-3 md:grid-cols-[1fr_auto_auto_auto]">
              <div className="relative">
                <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search benefits, eligibility, or categories..."
                  className="w-full rounded-md border border-border bg-surface py-2.5 pl-9 pr-3 text-sm text-text-primary outline-none"
                />
              </div>
              <div className="inline-flex items-center rounded-md border border-border bg-surface px-3 py-2 text-xs font-semibold text-text-secondary">
                {visible.length} results
              </div>
              <div className="inline-flex items-center rounded-md border border-border bg-surface px-3 py-2 text-xs font-semibold text-text-secondary">
                {workModeFilter} mode
              </div>
              <div className="inline-flex items-center rounded-md border border-border bg-surface px-3 py-2 text-xs font-semibold text-text-secondary">
                {locationFilter}
              </div>
            </div>
          </div>

          <div className="space-y-4 pb-4">
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold tracking-tight text-text-primary">Featured for you</h2>
              <p className="text-sm text-text-muted">{profile.marketplace.quickNote}</p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {featuredItems.map((item) => (
                <Link key={item.id} to={`/welfare/marketplace/${item.id}`} className="block">
                  <Card className="h-full cursor-pointer transition hover:-translate-y-[1px]">
                    <div className="h-40 w-full overflow-hidden bg-[#eef1ff]">
                      <img
                        src={`https://images.unsplash.com/${cardImages[item.name] ?? "photo-1521737604893-d14cc237f11d"}?w=760&h=400&fit=crop&q=80&auto=format`}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <CardBody className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-lg font-semibold text-text-primary">{item.name}</p>
                        <Badge variant="blue">Recommended</Badge>
                      </div>
                      <p className="text-sm text-text-secondary">
                        {item.category} · {item.points} pts · Expires {item.expiry}
                      </p>
                      {(profile.recommendationChipsByBenefit?.[item.name] || [profile.profileAnswers.focus]).length > 0 ? (
                        <p className="text-xs text-text-muted opacity-90">
                          Because you said: {(profile.recommendationChipsByBenefit?.[item.name] || [profile.profileAnswers.focus]).slice(0, 3).join(", ")}.
                        </p>
                      ) : null}
                    </CardBody>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          <section className="space-y-3 pt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold tracking-tight text-text-primary">All benefits</h3>
              <Badge variant="neutral">{category === "All" ? "All categories" : category}</Badge>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {visible.map((item) => {
                const isClickable = featuredSet.has(item.name) || item.points >= 120;
                const card = (
                  <Card className="h-full cursor-pointer transition hover:-translate-y-[1px] hover:shadow-[var(--shadow-hover)]">
                    <CardBody className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-surface-2">
                          <img
                            src={`https://images.unsplash.com/${cardImages[item.name] ?? "photo-1521737604893-d14cc237f11d"}?w=96&h=96&fit=crop&q=80&auto=format`}
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-lg font-semibold text-text-primary">{item.name}</p>
                          <p className="text-sm text-text-muted">{item.category}</p>
                        </div>
                        {featuredSet.has(item.name) && <Badge variant="blue">Recommended</Badge>}
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant={item.eligible === "Recommended" ? "blue" : "green"}>{item.eligible}</Badge>
                      </div>

                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-text-secondary">
                        <span><span className="font-semibold text-text-primary">{item.points}</span> points</span>
                        <span>Expires {item.expiry}</span>
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
          </section>
          </div>
        </div>
      </div>
    </div>
  );
}
