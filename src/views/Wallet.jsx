import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/layout/PageHeader";
import Button from "../components/ui/Button";
import { Card, CardBody } from "../components/ui/Card";
import { usePov } from "../context/PovContext";

export default function Wallet() {
  const { profile } = usePov();
  const navigate = useNavigate();

  const [familyAllocations, setFamilyAllocations] = useState(() =>
    (profile.familyMembers || []).reduce((acc, member) => ({ ...acc, [member.id]: member.allocation }), {})
  );

  const allocated = useMemo(() => {
    if (!profile.familyEnabled) return profile.budget.allocated;
    return Object.values(familyAllocations).reduce((sum, value) => sum + Number(value || 0), 0);
  }, [profile, familyAllocations]);

  const remaining = profile.budget.total - allocated;

  return (
    <>
      <PageHeader
        eyebrow="Budget control"
        title="Wallet"
        subtitle="Allocations help you spend credits before expiry"
        actions={<Button size="sm" onClick={() => navigate("/welfare/transactions")}>Open transactions</Button>}
      />

      <Card>
        <CardBody className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm text-text-muted">Remaining budget</p>
            <p className="text-4xl font-bold tracking-tight text-text-primary">{remaining} pts</p>
          </div>
          <div>
            <p className="text-sm text-text-muted">Allocated</p>
            <p className="text-2xl font-semibold text-text-primary">{allocated} pts</p>
          </div>
        </CardBody>
      </Card>

      {profile.familyEnabled ? (
        <Card>
          <CardBody className="space-y-4">
            <p className="text-lg font-semibold text-text-primary">Family allocation</p>
            {profile.familyMembers.map((member) => (
              <div key={member.id} className="rounded-2xl bg-[#f8fafc] p-4">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-semibold text-text-primary">{member.name} · {member.relation}</p>
                  <p className="text-sm font-semibold text-blue">{familyAllocations[member.id] || 0} pts</p>
                </div>
                <input
                  type="range"
                  min={0}
                  max={500}
                  step={10}
                  value={familyAllocations[member.id] || 0}
                  onChange={(e) => setFamilyAllocations((prev) => ({ ...prev, [member.id]: Number(e.target.value) }))}
                  className="w-full accent-[#0057b8]"
                />
              </div>
            ))}
            <Button size="sm" className="w-full">Save allocation</Button>
          </CardBody>
        </Card>
      ) : (
        <Card>
          <CardBody className="space-y-3">
            <p className="text-lg font-semibold text-text-primary">Personal budget</p>
            <p className="text-sm text-text-secondary">Family wallet is not enabled for this profile.</p>
            <div className="rounded-2xl bg-[#f8fafc] p-4">
              <p className="text-sm text-text-muted">Monthly goal</p>
              <p className="text-2xl font-semibold text-text-primary">{profile.monthlyGoal} pts</p>
            </div>
            <Button variant="outline" size="sm">Set monthly goal</Button>
          </CardBody>
        </Card>
      )}
    </>
  );
}
