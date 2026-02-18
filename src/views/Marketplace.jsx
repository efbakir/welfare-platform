import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/layout/PageHeader";
import Button from "../components/ui/Button";
import { Card, CardBody, CardHeader, CardTitle, CardSubtitle } from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import mockData from "../data/mock.json";

const marketplaceImages = {
  dc1: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1200&q=80",
  dc2: "https://images.unsplash.com/photo-1526634332515-d56c5fd16991?auto=format&fit=crop&w=1200&q=80",
  dc3: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1200&q=80",
  b1: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=300&q=80",
  b2: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=300&q=80",
  b3: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=300&q=80",
  b4: "https://images.unsplash.com/photo-1588072432906-9f7f4f6a4b82?auto=format&fit=crop&w=300&q=80",
  b5: "https://images.unsplash.com/photo-1529634891331-6ad1f6a2f1df?auto=format&fit=crop&w=300&q=80",
  b6: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=300&q=80",
  b7: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=300&q=80",
};

const benefitIcons = {
  dc1: "🧸",
  dc2: "🧒",
  dc3: "🧩",
  b1: "🏋️",
  b2: "🧠",
  b3: "🎟️",
  b4: "👶",
  b5: "📚",
  b6: "🎓",
  b7: "🗣️",
};

const categoryAccents = {
  Wellness: "bg-[#e6f4ff] text-[#0057b8]",
  Family: "bg-[#fff0f5] text-[#b63d76]",
  Education: "bg-[#edf9ee] text-[#2f9e44]",
  "Child & Education": "bg-[#f5f0ff] text-[#6d4cc9]",
};

export default function Marketplace() {
  const { marketplaceCategories, benefits, daycare, expiringPoints } = mockData;
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [charityModalOpen, setCharityModalOpen] = useState(false);

  const filteredBenefits = selectedCategory ? benefits.filter((b) => b.categoryId === selectedCategory) : benefits;

  return (
    <>
      <PageHeader eyebrow="Inclusive marketplace" title="Marketplace" subtitle="Browse and use your benefit credits visually" />

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setSelectedCategory(null)}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${selectedCategory == null ? "bg-blue text-white" : "bg-white text-text-secondary shadow-[0_8px_20px_rgb(0,0,0,0.04)]"}`}
        >
          All
        </button>
        {marketplaceCategories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${selectedCategory === cat.id ? "bg-blue text-white" : "bg-white text-text-secondary shadow-[0_8px_20px_rgb(0,0,0,0.04)]"}`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <section>
        <h2 className="mb-4 text-4xl font-bold tracking-tight text-text-primary">Child and educational development - Day care</h2>
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          {daycare.map((dc) => (
            <Link key={dc.id} to={`/marketplace/benefits/${dc.id}`} className="block">
              <Card className="h-full cursor-pointer">
                <div className="relative">
                  <img src={marketplaceImages[dc.id]} alt={dc.name} className="h-44 w-full object-cover" />
                  <div className="absolute left-4 top-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/95 text-2xl shadow-[0_8px_20px_rgb(0,0,0,0.08)]">
                    {benefitIcons[dc.id]}
                  </div>
                </div>
                <CardBody className="space-y-3">
                  <div className="text-xl font-bold tracking-tight text-text-primary">{dc.name}</div>
                  <p className="text-sm font-medium text-text-secondary">{dc.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="green" className="px-3 py-1.5">Subsidy eligible</Badge>
                    <span className="text-base font-bold tracking-tight text-text-primary">{dc.pointsCost} pts</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">Learn more</Button>
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-4xl font-bold tracking-tight text-text-primary">All benefits</h2>
        <div className="grid gap-4">
          {filteredBenefits.map((b) => {
            const category = marketplaceCategories.find((c) => c.id === b.categoryId);
            return (
              <Link key={b.id} to={`/marketplace/benefits/${b.id}`} className="block">
                <Card className="cursor-pointer">
                  <CardBody className="flex items-center gap-4">
                    <div className="relative shrink-0">
                      <img src={marketplaceImages[b.id] ?? marketplaceImages.b1} alt={b.name} className="h-20 w-20 rounded-2xl object-cover" />
                      <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-base shadow-[0_8px_20px_rgb(0,0,0,0.1)]">
                        {benefitIcons[b.id] ?? "✨"}
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-bold tracking-tight text-text-primary">{b.name}</h3>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${categoryAccents[category?.name] ?? "bg-blue-tint text-blue"}`}>
                          {category?.name ?? b.categoryId}
                        </span>
                      </div>
                      <p className="mt-1 text-sm font-medium text-gray-400">{b.pointsCost} points · Expires {b.expiry}</p>
                      {b.charityEligible && <p className="mt-1 text-sm font-medium text-gray-400">Can be donated to charity if unused.</p>}
                    </div>
                    <Button variant="outline" size="sm">Use</Button>
                  </CardBody>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      <Card className="bg-white">
        <CardHeader>
          <div>
            <CardTitle>Send expiring points to charity</CardTitle>
            <CardSubtitle>
              You have {expiringPoints.amount} points expiring on {expiringPoints.expiryDate}. Donate them to a cause.
            </CardSubtitle>
          </div>
        </CardHeader>
        <CardBody className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <select className="rounded-full bg-[#f4f6fb] px-4 py-2 text-sm font-medium text-text-primary outline-none" defaultValue="">
              <option value="">Choose a charity</option>
              {expiringPoints.charityOptions.map((ch) => (
                <option key={ch.id} value={ch.id}>{ch.name}</option>
              ))}
            </select>
            <Button variant="primary" size="sm" onClick={() => setCharityModalOpen(true)}>Donate {expiringPoints.amount} points</Button>
          </div>
          {charityModalOpen && (
            <div className="rounded-2xl bg-green-tint p-4 text-sm font-semibold text-text-primary shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
              Thank you! Your donation has been recorded (simulated).
              <button type="button" className="ml-2 text-blue hover:underline" onClick={() => setCharityModalOpen(false)}>Dismiss</button>
            </div>
          )}
        </CardBody>
      </Card>
    </>
  );
}
