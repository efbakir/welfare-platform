import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/layout/PageHeader";
import Button from "../components/ui/Button";
import { Card, CardBody } from "../components/ui/Card";
import Icon from "../components/ui/Icon";
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
  const usagePct = Math.min(100, Math.round((allocated / profile.budget.total) * 100));
  const autoSplit = () => {
    if (!profile.familyEnabled) return;
    const perMember = Math.floor(profile.budget.total / profile.familyMembers.length / 10) * 10;
    const next = profile.familyMembers.reduce((acc, member) => ({ ...acc, [member.id]: perMember }), {});
    setFamilyAllocations(next);
  };
  const resetSplit = () => {
    const next = (profile.familyMembers || []).reduce((acc, member) => ({ ...acc, [member.id]: member.allocation }), {});
    setFamilyAllocations(next);
  };

  return (
    <div className="mx-auto w-full max-w-[1220px] space-y-6">
      <PageHeader
        eyebrow="Budget control"
        title="Wallet"
        subtitle="Allocations help you spend credits before expiry"
        actions={<Button size="sm" onClick={() => navigate("/welfare/history")}>Open history</Button>}
      />

      <Card>
        <CardBody className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="inline-flex items-center gap-1 text-sm text-text-muted">
                <Icon name="wallet" className="h-4 w-4" />
                Remaining budget
              </p>
              <p className="text-4xl font-semibold tracking-tight text-text-primary">{remaining} pts</p>
            </div>
            <div>
              <p className="inline-flex items-center gap-1 text-sm text-text-muted">
                <Icon name="family" className="h-4 w-4" />
                Allocated
              </p>
              <p className="text-2xl font-semibold text-text-primary">{allocated} pts</p>
            </div>
            <div>
              <p className="text-sm text-text-muted">Usage</p>
              <p className="text-2xl font-semibold text-text-primary">{usagePct}%</p>
            </div>
          </div>
          <div>
            <div className="mb-1 flex items-center justify-between text-xs text-text-muted">
              <span>Budget usage</span>
              <span>{usagePct}%</span>
            </div>
            <div className="h-2 rounded-sm overflow-hidden bg-[#e6edf6]">
              <div className="h-full rounded-sm bg-blue transition-all" style={{ width: `${usagePct}%` }} />
            </div>
          </div>
        </CardBody>
      </Card>

      {profile.familyEnabled ? (
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card>
            <CardBody className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="inline-flex items-center gap-1 text-lg font-semibold text-text-primary">
                  <Icon name="family" className="h-5 w-5" />
                  Family allocation
                </p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={autoSplit}>Auto split</Button>
                  <Button variant="outline" size="sm" onClick={resetSplit}>Reset</Button>
                </div>
              </div>
              {profile.familyMembers.map((member) => (
                <div key={member.id} className="rounded-md bg-[#f8fafc] p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm font-semibold text-text-primary">
                      <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-sm bg-blue-tint text-xs text-blue">{member.name.slice(0, 1)}</span>
                      {member.name} · {member.relation}
                    </p>
                    <p className="text-sm font-semibold text-blue">{familyAllocations[member.id] || 0} pts</p>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={500}
                    step={10}
                    value={familyAllocations[member.id] || 0}
                    onChange={(e) => setFamilyAllocations((prev) => ({ ...prev, [member.id]: Number(e.target.value) }))}
                    className="w-full accent-blue"
                  />
                </div>
              ))}
              <Button size="sm" className="w-full">Save allocation</Button>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="space-y-3">
              <h3 className="text-lg font-semibold text-text-primary">Allocation guidance</h3>
              <div className="rounded-md bg-violet-tint p-3 text-sm text-text-secondary">Keep at least 15% unallocated for upcoming needs.</div>
              <div className="rounded-md bg-cyan-tint p-3 text-sm text-text-secondary">Family distributions can be adjusted any time in this month.</div>
              <div className="rounded-md bg-green-tint p-3 text-sm text-text-secondary">Auto split uses equal baseline distribution from total credits.</div>
            </CardBody>
          </Card>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card>
            <CardBody className="space-y-3">
              <p className="inline-flex items-center gap-1 text-lg font-semibold text-text-primary">
                <Icon name="wallet" className="h-5 w-5" />
                Personal budget
              </p>
              <p className="text-sm text-text-secondary">Family wallet is not enabled for this profile.</p>
              <div className="rounded-md bg-[#f8fafc] p-4">
                <p className="text-sm text-text-muted">Monthly goal</p>
                <p className="text-2xl font-semibold text-text-primary">{profile.monthlyGoal} pts</p>
              </div>
              <Button variant="outline" size="sm">Set monthly goal</Button>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="space-y-3">
              <h3 className="text-lg font-semibold text-text-primary">Spending suggestions</h3>
              <div className="rounded-md bg-violet-tint p-3 text-sm text-text-secondary">Redeem high-fit benefits first to reduce expiry waste.</div>
              <div className="rounded-md bg-cyan-tint p-3 text-sm text-text-secondary">Keep 10–20% reserve for ad-hoc opportunities.</div>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
}
