import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PageHeader from "../components/layout/PageHeader";
import Button from "../components/ui/Button";
import { Card, CardBody, CardHeader, CardTitle, CardSubtitle } from "../components/ui/Card";
import FamilyMemberSetupModal from "../components/wallet/FamilyMemberSetupModal";
import mockData from "../data/mock.json";

const initialAllocations = mockData.familySubProfiles.reduce((acc, p) => ({ ...acc, [p.id]: p.allocatedAmount }), {});

const memberAvatars = {
  f1: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=120&q=80",
  f2: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=120&q=80",
  f3: "https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?auto=format&fit=crop&w=120&q=80",
};

export default function Wallet() {
  const { user, budget, familySubProfiles } = mockData;
  const totalBudget = user.budgetTotal ?? budget.total;
  const [allocations, setAllocations] = useState(initialAllocations);
  const location = useLocation();
  const navigate = useNavigate();
  const familyModalOpen = location.pathname.endsWith("/add-family-member");

  const allocatedSum = useMemo(() => Object.values(allocations).reduce((a, b) => a + b, 0), [allocations]);
  const remaining = totalBudget - allocatedSum;
  const usagePercent = Math.min(100, Math.round((allocatedSum / totalBudget) * 100));

  const setAllocation = (id, value) => {
    const num = Math.max(0, Number(value) || 0);
    setAllocations((prev) => ({ ...prev, [id]: num }));
  };

  return (
    <>
      <PageHeader
        eyebrow="Interactive Family Wallet"
        title="Wallet"
        subtitle="Drag allocations and monitor remaining budget in real time"
        actions={
          <div className="flex items-center gap-2">
            <Link to="/transactions"><Button variant="outline" size="sm">Transactions</Button></Link>
            <Link to="/requests"><Button variant="outline" size="sm">Requests</Button></Link>
            <Button variant="primary" size="sm" onClick={() => navigate("/wallet/add-family-member")}>Add family member</Button>
          </div>
        }
      />

      <Card>
        <CardBody className="space-y-4">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Remaining Budget</p>
              <p className="text-4xl font-bold tracking-tight text-text-primary">{user.currency} {remaining}</p>
            </div>
            <div className="rounded-2xl bg-[#eef5ff] px-4 py-2 text-right">
              <p className="text-sm font-medium text-gray-400">Allocated</p>
              <p className="text-xl font-bold tracking-tight text-text-primary">{allocatedSum} pts</p>
            </div>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-[#e7ebf3]">
            <div className="h-full rounded-full bg-blue transition-all duration-150" style={{ width: `${usagePercent}%` }} />
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Family allocation</CardTitle>
            <CardSubtitle>Use draggable sliders for each family member</CardSubtitle>
          </div>
        </CardHeader>
        <CardBody className="space-y-4">
          {familySubProfiles.map((member) => (
            <div key={member.id} className="rounded-2xl bg-[#f8fafc] p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img src={memberAvatars[member.id]} alt={member.name} className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{member.name}</p>
                    <p className="text-sm font-medium text-gray-400 capitalize">{member.relation}</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-blue">{allocations[member.id] ?? 0} pts</p>
              </div>
              <input
                type="range"
                min={0}
                max={400}
                step={10}
                value={allocations[member.id] ?? 0}
                onChange={(e) => setAllocation(member.id, e.target.value)}
                className="w-full accent-[#0057b8]"
              />
            </div>
          ))}
          <Button variant="primary" size="sm" className="w-full">Save allocation</Button>
        </CardBody>
      </Card>

      {familyModalOpen && <FamilyMemberSetupModal onClose={() => navigate("/wallet")} />}
    </>
  );
}
