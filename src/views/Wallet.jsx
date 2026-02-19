import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/layout/PageHeader";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import { Card, CardBody } from "../components/ui/Card";
import Icon from "../components/ui/Icon";
import { usePov } from "../context/PovContext";

const relationAvatarTone = {
  Child: "bg-cyan-tint text-blue",
  Partner: "bg-secondary-tint text-secondary",
  Dependent: "bg-green-tint text-green",
};

function SliderTrack({ value, min = 0, max = 500 }) {
  const pct = ((value - min) / (max - min)) * 100;
  return `linear-gradient(90deg, var(--color-blue) 0%, var(--color-blue-mid) ${pct}%, #e8eaf7 ${pct}%, #e8eaf7 100%)`;
}

export default function Wallet() {
  const { profile } = usePov();
  const navigate = useNavigate();

  const [monthlyGoal, setMonthlyGoal] = useState(profile.monthlyGoal || Math.max(120, Math.round(profile.budget.total * 0.55)));
  const [familyAllocations, setFamilyAllocations] = useState(() =>
    (profile.familyMembers || []).reduce((acc, member) => ({ ...acc, [member.id]: member.allocation }), {})
  );

  useEffect(() => {
    setMonthlyGoal(profile.monthlyGoal || Math.max(120, Math.round(profile.budget.total * 0.55)));
    setFamilyAllocations((profile.familyMembers || []).reduce((acc, member) => ({ ...acc, [member.id]: member.allocation }), {}));
  }, [profile]);

  const allocated = useMemo(() => {
    if (!profile.familyEnabled) return profile.budget.allocated;
    return Object.values(familyAllocations).reduce((sum, value) => sum + Number(value || 0), 0);
  }, [profile, familyAllocations]);

  const remaining = Math.max(0, profile.budget.total - allocated);
  const expiringSoon = Math.max(20, Math.round(profile.budget.total * 0.18));
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
    <div className="mx-auto w-full max-w-[1240px] space-y-5">
      <PageHeader
        eyebrow="Credits & Allocation"
        title="Wallet intelligence"
        subtitle="Manage credits with clearer guardrails and faster allocation decisions."
        actions={<Button size="sm" onClick={() => navigate("/welfare/history")}>Open history</Button>}
      />

      <Card>
        <CardBody className="rounded-xl bg-violet-tint p-4">
          <p className="text-sm font-semibold text-text-primary">{profile.walletCallout || "Use credits intentionally based on your constraints."}</p>
          {profile.id === "operator" && (
            <p className="mt-1 text-xs text-text-secondary">
              Value meter: {Math.max(62, Math.round((remaining / Math.max(profile.budget.total, 1)) * 100))}% optimization potential this month.
            </p>
          )}
        </CardBody>
      </Card>

      <div className="grid gap-4 xl:grid-cols-[1.7fr_1fr]">
        <div className="space-y-4">
          <Card>
            <CardBody className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl bg-white/80 p-4 shadow-[var(--shadow-xs)]">
                  <p className="inline-flex items-center gap-1 text-xs font-medium text-text-muted">
                    <Icon name="wallet" className="h-4 w-4" />
                    Available credits
                  </p>
                  <p className="mt-2 text-[30px] font-semibold leading-none tracking-[-0.02em] text-text-primary">{remaining}</p>
                  <p className="mt-1 text-xs text-text-secondary">points remaining</p>
                </div>
                <div className="rounded-xl bg-violet-tint p-4">
                  <p className="text-xs font-medium text-text-muted">Allocated</p>
                  <p className="mt-2 text-[30px] font-semibold leading-none tracking-[-0.02em] text-text-primary">{allocated}</p>
                  <p className="mt-1 text-xs text-text-secondary">{usagePct}% utilization</p>
                </div>
                <div className="rounded-xl bg-cyan-tint p-4">
                  <p className="text-xs font-medium text-text-muted">Expiring in 30 days</p>
                  <p className="mt-2 text-[30px] font-semibold leading-none tracking-[-0.02em] text-text-primary">{expiringSoon}</p>
                  <p className="mt-1 text-xs text-text-secondary">prioritize redemption</p>
                </div>
                <div className="rounded-xl bg-green-tint p-4">
                  <p className="text-xs font-medium text-text-muted">Monthly goal</p>
                  <p className="mt-2 text-[30px] font-semibold leading-none tracking-[-0.02em] text-text-primary">{monthlyGoal}</p>
                  <p className="mt-1 text-xs text-text-secondary">target usage</p>
                </div>
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between text-xs text-text-muted">
                  <span>Budget utilization</span>
                  <span>{usagePct}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-sm bg-[#e6e9f5]">
                  <div className="h-full rounded-sm bg-[linear-gradient(90deg,var(--color-blue)_0%,var(--color-blue-mid)_100%)] transition-all" style={{ width: `${usagePct}%` }} />
                </div>
              </div>
            </CardBody>
          </Card>

          {profile.familyEnabled ? (
            <Card>
              <CardBody className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="inline-flex items-center gap-1 text-lg font-semibold text-text-primary">
                      <Icon name="family" className="h-5 w-5" />
                      Family allocation
                    </p>
                    <p className="mt-0.5 text-sm text-text-secondary">Drag sliders to rebalance instantly. Remaining credits update in real time.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={autoSplit}>Auto split</Button>
                    <Button variant="outline" size="sm" onClick={resetSplit}>Reset</Button>
                  </div>
                </div>

                <div className="space-y-3">
                  {profile.familyMembers.map((member) => {
                    const value = familyAllocations[member.id] || 0;
                    return (
                      <div key={member.id} className="rounded-xl bg-white/80 p-4 shadow-[var(--shadow-xs)]">
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <span className={`inline-flex h-8 w-8 items-center justify-center rounded-md text-xs font-semibold ${relationAvatarTone[member.relation] || "bg-blue-tint text-blue"}`}>
                              {member.name.slice(0, 1)}
                            </span>
                            <div>
                              <p className="text-sm font-semibold text-text-primary">{member.name}</p>
                              <p className="text-xs text-text-muted">{member.relation}</p>
                            </div>
                          </div>
                          <Badge variant="blue">{value} pts</Badge>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={500}
                          step={10}
                          value={value}
                          onChange={(e) => setFamilyAllocations((prev) => ({ ...prev, [member.id]: Number(e.target.value) }))}
                          className="h-2 w-full cursor-pointer appearance-none rounded-sm"
                          style={{ background: SliderTrack({ value }) }}
                        />
                      </div>
                    );
                  })}
                </div>
              </CardBody>
            </Card>
          ) : (
            <Card>
              <CardBody className="space-y-4">
                <p className="inline-flex items-center gap-1 text-lg font-semibold text-text-primary">
                  <Icon name="wallet" className="h-5 w-5" />
                  Personal plan
                </p>
                <p className="text-sm text-text-secondary">Family wallet is disabled for this profile. Set a monthly spend target instead.</p>
                <div className="rounded-xl bg-white/80 p-4 shadow-[var(--shadow-xs)]">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm font-semibold text-text-primary">Monthly credit goal</p>
                    <Badge variant="blue">{monthlyGoal} pts</Badge>
                  </div>
                  <input
                    type="range"
                    min={80}
                    max={profile.budget.total}
                    step={10}
                    value={monthlyGoal}
                    onChange={(e) => setMonthlyGoal(Number(e.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-sm"
                    style={{ background: SliderTrack({ value: monthlyGoal, min: 80, max: profile.budget.total }) }}
                  />
                  <p className="mt-2 text-xs text-text-muted">Target-driven guidance helps avoid unused credits before expiry.</p>
                </div>
              </CardBody>
            </Card>
          )}
        </div>

        <div className="space-y-4">
          <Card>
            <CardBody className="space-y-4">
              <div className="rounded-xl bg-violet-tint p-3">
                <p className="text-xs font-medium text-text-muted">Eligibility snapshot</p>
                <p className="mt-1 text-sm font-semibold text-text-primary">
                  {profile.familyEnabled
                    ? "You are eligible for Family Support reimbursements this month."
                    : "You are currently mapped to individual wellbeing and learning benefits."}
                </p>
              </div>
              <div className="rounded-xl bg-cyan-tint p-3">
                <p className="text-xs font-medium text-text-muted">Category cap watch</p>
                <p className="mt-1 text-sm font-semibold text-text-primary">
                  Learning cap usage: {Math.min(95, 55 + Math.round(usagePct * 0.3))}%
                </p>
              </div>
              <div className="rounded-xl bg-green-tint p-3">
                <p className="text-xs font-medium text-text-muted">Smart suggestion</p>
                <p className="mt-1 text-sm font-semibold text-text-primary">People in your role usually redeem before week 3 each month.</p>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="space-y-3">
              <p className="text-lg font-semibold text-text-primary">Actions</p>
              <Button className="w-full" onClick={() => navigate("/welfare/marketplace")}>Use credits in marketplace</Button>
              <Button variant="outline" className="w-full" onClick={() => navigate("/welfare/requests")}>Create a request</Button>
              <Button variant="ghost" className="w-full" onClick={() => navigate("/welfare/history")}>View credit history & impact</Button>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="space-y-2">
              <p className="text-sm font-semibold text-text-primary">Transparency</p>
              <p className="text-xs text-text-secondary">Allocations help you spend credits before expiry. Changes apply instantly in this prototype.</p>
              <p className="text-xs text-text-muted">Policy reference and eligibility checks are available in Requests.</p>
            </CardBody>
          </Card>
        </div>
      </div>

      <Card>
        <CardBody>
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-xl bg-white/80 p-4 shadow-[var(--shadow-xs)]">
              <p className="text-xs text-text-muted">This month used</p>
              <p className="mt-1 text-xl font-semibold text-text-primary">{allocated} pts</p>
            </div>
            <div className="rounded-xl bg-white/80 p-4 shadow-[var(--shadow-xs)]">
              <p className="text-xs text-text-muted">Upcoming expiries</p>
              <p className="mt-1 text-xl font-semibold text-text-primary">{expiringSoon} pts</p>
            </div>
            <div className="rounded-xl bg-white/80 p-4 shadow-[var(--shadow-xs)]">
              <p className="text-xs text-text-muted">Best-fit category</p>
              <p className="mt-1 text-xl font-semibold text-text-primary">{profile.profileAnswers.focus}</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
