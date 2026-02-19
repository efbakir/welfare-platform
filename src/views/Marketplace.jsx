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
  All: { icon: "spark", chip: "bg-violet-tint text-blue", accent: "bg-violet-tint text-text-primary" },
  Wellness: { icon: "wellness", chip: "bg-green-tint text-green", accent: "bg-green-tint text-text-primary" },
  Family: { icon: "family", chip: "bg-secondary-tint text-secondary", accent: "bg-secondary-tint text-text-primary" },
  Education: { icon: "education", chip: "bg-violet-tint text-blue", accent: "bg-violet-tint text-text-primary" },
  "Child & Education": { icon: "child", chip: "bg-cyan-tint text-text-secondary", accent: "bg-cyan-tint text-text-primary" },
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
    <div className="mx-auto w-full max-w-[1240px] space-y-5">
      <PageHeader
        eyebrow="Discovery"
        title="Benefit marketplace"
        subtitle="Explore, compare, and redeem benefits prioritized for your profile context."
      />

      <Card>
        <CardBody className="grid gap-3 md:grid-cols-[1fr_auto_auto_auto]">
          <div className="relative">
            <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search benefits, eligibility, or categories..."
              className="w-full rounded-md border border-[rgba(255,255,255,0.7)] bg-[rgba(255,255,255,0.84)] py-2.5 pl-9 pr-3 text-sm text-text-primary outline-none"
            />
          </div>
          <div className="inline-flex items-center rounded-md bg-violet-tint px-3 py-2 text-xs font-semibold text-text-secondary">
            {visible.length} results
          </div>
          <div className="inline-flex items-center rounded-md bg-cyan-tint px-3 py-2 text-xs font-semibold text-text-secondary">
            {workModeFilter} mode
          </div>
          <div className="inline-flex items-center rounded-md bg-green-tint px-3 py-2 text-xs font-semibold text-text-secondary">
            {locationFilter}
          </div>
        </CardBody>
      </Card>

      <div className="grid gap-4 xl:grid-cols-[0.32fr_1fr]">
        <aside className="space-y-4">
          <Card>
            <CardBody className="space-y-1">
              <p className="mb-2 text-xl font-semibold tracking-tight text-text-primary">Categories</p>
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-medium transition ${
                    category === item ? "bg-blue-tint text-blue" : "text-text-secondary hover:bg-violet-tint"
                  }`}
                >
                  <span className={`inline-flex h-7 w-7 items-center justify-center rounded-md ${categoryMeta[item]?.accent ?? "bg-violet-tint"}`}>
                    <Icon name={categoryMeta[item]?.icon ?? "spark"} className="h-3.5 w-3.5" />
                  </span>
                  {item}
                </button>
              ))}
            </CardBody>
          </Card>

          <Card>
            <CardBody className="space-y-3">
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
                  className="w-full rounded-md bg-[#f1f5f9] px-3 py-2 text-sm text-text-primary outline-none"
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
                  className="w-full rounded-md bg-[#f1f5f9] px-3 py-2 text-sm text-text-primary outline-none"
                >
                  {locationOptions.map((location) => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="space-y-3">
              <p className="text-lg font-semibold text-text-primary">Request a benefit</p>
              <p className="text-sm text-text-secondary">Can’t find what you need? Submit a request and HR can review it.</p>
              <Button className="w-full" variant="outline">Submit request</Button>
            </CardBody>
          </Card>
        </aside>

        <div className="space-y-4">
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
                        src={`https://images.unsplash.com/${cardImages[item.name] ?? "photo-1521737604893-d14cc237f11d"}?w=760&h=400&fit=crop&q=80`}
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
                      <div className="flex flex-wrap gap-1.5">
                        {(profile.recommendationChipsByBenefit?.[item.name] || [profile.profileAnswers.focus]).slice(0, 3).map((chip) => (
                          <span key={`${item.id}-${chip}`} className="rounded-sm bg-violet-tint px-2 py-1 text-xs text-text-secondary">
                            Because you said: {chip}
                          </span>
                        ))}
                      </div>
                    </CardBody>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold tracking-tight text-text-primary">All benefits</h3>
              <Badge variant="neutral">{category === "All" ? "All categories" : category}</Badge>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {visible.map((item) => {
                const isClickable = featuredSet.has(item.name) || item.points >= 120;
                const card = (
                  <Card className="h-full cursor-pointer transition hover:-translate-y-[1px]">
                    <CardBody className="space-y-3">
                      <div className="flex items-start gap-3">
                        <span className={`mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md ${categoryMeta[item.category]?.accent ?? "bg-violet-tint"}`}>
                          <Icon name={categoryMeta[item.category]?.icon ?? "spark"} className="h-5 w-5" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-lg font-semibold text-text-primary">{item.name}</p>
                          <p className="text-sm text-text-secondary">{item.category}</p>
                        </div>
                        {featuredSet.has(item.name) && <Badge variant="blue">Recommended</Badge>}
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`inline-flex items-center gap-1 rounded-sm px-2 py-1 text-xs font-semibold ${categoryMeta[item.category]?.chip ?? "bg-blue-tint text-blue"}`}>
                          <Icon name={categoryMeta[item.category]?.icon ?? "spark"} className="h-3.5 w-3.5" />
                          {item.category}
                        </span>
                        <Badge variant={item.eligible === "Recommended" ? "blue" : "green"}>{item.eligible}</Badge>
                      </div>

                      <div className="grid gap-2 text-sm text-text-secondary sm:grid-cols-2">
                        <p><span className="font-semibold text-text-primary">{item.points}</span> points</p>
                        <p>Expires {item.expiry}</p>
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
  );
}
