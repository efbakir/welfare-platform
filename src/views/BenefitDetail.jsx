import { Link, useParams } from "react-router-dom";
import PageHeader from "../components/layout/PageHeader";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import { Card, CardBody } from "../components/ui/Card";
import mockData from "../data/mock.json";

const detailImages = {
  dc1: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1400&q=80",
  dc2: "https://images.unsplash.com/photo-1526634332515-d56c5fd16991?auto=format&fit=crop&w=1400&q=80",
  dc3: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1400&q=80",
  b4: "https://images.unsplash.com/photo-1588072432906-9f7f4f6a4b82?auto=format&fit=crop&w=1400&q=80",
};

const defaultReviews = [
  {
    id: "r1",
    name: "Elena G.",
    role: "Product Ops",
    text: "We enrolled our son here last quarter. The staff communication and schedule flexibility are excellent.",
  },
  {
    id: "r2",
    name: "Jason P.",
    role: "Engineering",
    text: "The subsidy process was straightforward and cut our monthly daycare cost significantly.",
  },
  {
    id: "r3",
    name: "Nina R.",
    role: "Finance",
    text: "The after-care coverage is reliable, which has made pickup logistics much easier for us.",
  },
];

export default function BenefitDetail() {
  const { benefitId } = useParams();
  const detail =
    mockData.daycare.find((item) => item.id === benefitId) ||
    mockData.benefits.find((item) => item.id === benefitId);

  if (!detail) {
    return (
      <Card>
        <CardBody className="p-6">
          <p className="text-sm text-text-secondary">Benefit not found.</p>
          <Link to="/welfare/marketplace" className="mt-3 inline-flex text-sm font-semibold text-blue hover:underline">
            Back to marketplace
          </Link>
        </CardBody>
      </Card>
    );
  }

  const heroImage = detailImages[benefitId] ?? "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1400&q=80";
  const pointsCost = detail.pointsCost ?? 200;
  const userBalance = mockData.budget.remaining;
  const included = [
    "Full-day care slots with structured learning",
    "Nutritious lunch and two daily snacks",
    "Weekly developmental progress updates",
    "Extended pickup window for working parents",
  ];

  return (
    <>
      <PageHeader
        eyebrow="Marketplace benefit"
        title={detail.name || "Little Stars Daycare"}
        subtitle="Review benefit details before redeeming points"
        actions={
          <Link to="/welfare/marketplace">
            <Button variant="outline" size="sm">Back to marketplace</Button>
          </Link>
        }
      />

      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
        <img src={heroImage} alt={detail.name} className="h-72 w-full object-cover" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <Card>
            <CardBody className="space-y-4 p-6">
              <div className="flex items-center gap-2">
                <Badge variant="green">Family</Badge>
                <span className="text-sm text-text-muted">{pointsCost} points</span>
              </div>
              <h2 className="font-display text-xl font-bold text-text-primary">Overview</h2>
              <p className="text-sm leading-6 text-text-secondary">
                {detail.description || "Little Stars Daycare offers a safe, supportive environment for children with early education and after-care support for working families."}
              </p>
              <div>
                <h3 className="mb-2 text-sm font-semibold text-text-primary">What is included</h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  {included.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-blue" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="p-6">
              <h3 className="mb-3 text-sm font-semibold text-text-primary">Location</h3>
              <div className="flex h-56 items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gradient-to-br from-blue-tint to-white text-sm text-text-secondary">
                Map placeholder: 14 Riverfront Plaza, Downtown Campus
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="space-y-4 p-6">
              <h3 className="text-sm font-semibold text-text-primary">Reviews from colleagues</h3>
              {defaultReviews.map((review) => (
                <div key={review.id} className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <div className="text-sm font-semibold text-text-primary">{review.name}</div>
                  <div className="text-xs text-text-muted">{review.role}</div>
                  <p className="mt-2 text-sm text-text-secondary">{review.text}</p>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>

        <div>
          <Card className="sticky top-24">
            <CardBody className="space-y-4 p-6">
              <div>
                <p className="text-xs uppercase tracking-wider text-text-muted">Summary</p>
                <h3 className="mt-1 font-display text-lg font-bold text-text-primary">Redeem this benefit</h3>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-muted">Point cost</span>
                  <span className="font-semibold text-text-primary">{pointsCost} pts</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-text-muted">Your balance</span>
                  <span className="font-semibold text-green">{userBalance} pts</span>
                </div>
              </div>
              <Button variant="primary" size="md" className="w-full justify-center">
                Redeem Benefit
              </Button>
              <p className="text-xs text-text-muted">You can cancel this request within 24 hours.</p>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
