import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageHeader from "../components/layout/PageHeader";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import { Card, CardBody } from "../components/ui/Card";
import Icon from "../components/ui/Icon";
import { usePov } from "../context/PovContext";

const initialEvents = [
  {
    id: "c1",
    title: "Team cooking class",
    description: "Friday evening cooking workshop with cross-team tables.",
    date: "Fri, Mar 14",
    time: "18:30",
    location: "Community Kitchen Studio",
    spotsLeft: 7,
    pointsCost: 70,
    cashback: 20,
    createdBy: "hr",
    creator: "HR Team",
  },
  {
    id: "c2",
    title: "Parent support circle",
    description: "Short practical meetup on childcare hacks and shared resources.",
    date: "Tue, Mar 18",
    time: "17:30",
    location: "Wellbeing Lounge",
    spotsLeft: 12,
    pointsCost: 35,
    cashback: 10,
    createdBy: "people",
    creator: "Giulia Bianchi",
  },
  {
    id: "c3",
    title: "Remote async learning sprint",
    description: "Two-week async challenge with peer review and practical templates.",
    date: "Mon, Mar 24",
    time: "Anytime",
    location: "Remote",
    spotsLeft: 25,
    pointsCost: 45,
    cashback: 15,
    createdBy: "people",
    creator: "Sofia Moretti",
  },
];

const tabs = [
  { id: "all", label: "All events" },
  { id: "hr", label: "HR created" },
  { id: "people", label: "People created" },
  { id: "joined", label: "Joined" },
];

const creatorTypeTone = {
  hr: "green",
  people: "blue",
};

function EventCard({ event, joined, onJoin }) {
  const isPeople = event.createdBy === "people";
  return (
    <Card className="h-full">
      <CardBody className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-lg font-semibold text-text-primary">{event.title}</p>
            <p className="mt-0.5 text-xs text-text-muted">Created by {event.creator}</p>
            <p className="mt-2 text-sm text-text-secondary">{event.description}</p>
          </div>
          <Badge variant={creatorTypeTone[event.createdBy] ?? "neutral"}>
            {isPeople ? "People created" : "HR created"}
          </Badge>
        </div>

        <div className="grid gap-2 rounded-md bg-surface-2 p-3 text-sm text-text-secondary sm:grid-cols-3">
          <p className="inline-flex items-center gap-1.5"><Icon name="calendar" className="h-4 w-4" /> {event.date} · {event.time}</p>
          <p className="inline-flex items-center gap-1.5 truncate"><Icon name="location" className="h-4 w-4" /> {event.location}</p>
          <p className="inline-flex items-center gap-1.5"><Icon name="users" className="h-4 w-4" /> {event.spotsLeft} spots left</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-md bg-blue-tint p-3">
            <p className="text-xs font-medium text-text-muted">Join cost</p>
            <p className="mt-1 inline-flex items-center gap-1 text-xl font-semibold text-text-primary">
              <Icon name="wallet" className="h-4 w-4" />
              {event.pointsCost} pts
            </p>
          </div>
          <div className="rounded-md bg-green-tint p-3">
            <p className="text-xs font-medium text-text-muted">Credit back after attendance</p>
            <p className="mt-1 inline-flex items-center gap-1 text-xl font-semibold text-green">
              <Icon name="spark" className="h-4 w-4" />
              {event.cashback} pts
            </p>
          </div>
        </div>

        <div className="rounded-md border border-border bg-surface-2 p-2.5 text-xs text-text-secondary">
          {isPeople ? (
            <>
              <p className="font-semibold text-text-primary">Colleague-created event rules</p>
              <p>Join cost: {event.pointsCost} pts · Attend and get back {event.cashback} pts · Creator earns +15 pts per attendee.</p>
            </>
          ) : (
            <>
              <p className="font-semibold text-text-primary">HR-created event rules</p>
              <p>Join cost: {event.pointsCost} pts · Attend and get back {event.cashback} pts · No creator reward.</p>
            </>
          )}
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-border pt-2">
          <Button size="sm" variant={joined ? "outline" : "primary"} onClick={() => onJoin(event.id)}>
            {joined ? "Joined" : "Join event"}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

export default function Community() {
  const { profile } = usePov();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("all");
  const [events, setEvents] = useState(initialEvents);
  const [joinedIds, setJoinedIds] = useState([]);
  const [createOpen, setCreateOpen] = useState(() => searchParams.get("create") === "1");
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    createdBy: "people",
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    spotsLeft: 12,
    pointsCost: 40,
    cashback: 12,
  });

  const visibleEvents = useMemo(() => {
    if (activeTab === "hr") return events.filter((item) => item.createdBy === "hr");
    if (activeTab === "people") return events.filter((item) => item.createdBy === "people");
    if (activeTab === "joined") return events.filter((item) => joinedIds.includes(item.id));
    return events;
  }, [activeTab, events, joinedIds]);

  const onJoin = (id) => {
    setJoinedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const closeCreate = () => {
    setCreateOpen(false);
    setStep(1);
    setForm({
      createdBy: "people",
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      spotsLeft: 12,
      pointsCost: 40,
      cashback: 12,
    });
  };

  const canContinue = step === 1 || Boolean(form.title && form.date && form.location);

  const submitEvent = () => {
    const createdEvent = {
      id: `c-${Date.now()}`,
      title: form.title,
      description: form.description,
      date: form.date,
      time: form.time || "18:00",
      location: form.location,
      spotsLeft: Number(form.spotsLeft) || 10,
      pointsCost: Number(form.pointsCost) || 40,
      cashback: Number(form.cashback) || 10,
      createdBy: form.createdBy,
      creator: form.createdBy === "hr" ? "HR Team" : profile.name,
    };
    setEvents((prev) => [createdEvent, ...prev]);
    closeCreate();
  };

  return (
    <div className="mx-auto w-full max-w-[1240px] space-y-5">
      <PageHeader
        title="Community"
        subtitle="Keep engagement active beyond credits with shared experiences and colleague-created moments."
        actions={(
          <Button onClick={() => setCreateOpen(true)}>
            <Icon name="spark" className="h-4 w-4" />
            Create event
          </Button>
        )}
      />

      <Card>
        <CardBody className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="blue">Community hub</Badge>
            <Badge variant="green">{joinedIds.length} joined</Badge>
            <Badge variant="neutral">{events.length} active events</Badge>
          </div>
          <p className="text-sm text-text-secondary">
            HR-created and People-created events have different credit economics. People-created events reward both attendance and creator engagement.
          </p>
        </CardBody>
      </Card>

      <section className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-md px-3 py-1.5 text-sm font-semibold transition ${
                activeTab === tab.id ? "bg-blue text-white" : "bg-surface-2 text-text-secondary hover:bg-surface"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {visibleEvents.map((event) => (
            <EventCard key={event.id} event={event} joined={joinedIds.includes(event.id)} onJoin={onJoin} />
          ))}
        </div>
      </section>

      {createOpen ? (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-xl border border-border bg-surface shadow-[var(--shadow-hover)]">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div>
                <p className="text-base font-semibold text-text-primary">Create community event</p>
                <p className="text-xs text-text-muted">Step {step} of 3</p>
              </div>
              <button type="button" onClick={closeCreate} className="rounded-md px-2 py-1 text-text-muted hover:bg-surface-2">✕</button>
            </div>

            <div className="space-y-4 px-5 py-4">
              {step === 1 ? (
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-text-primary">Choose creator type</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, createdBy: "hr" }))}
                      className={`ui-panel p-3 text-left ${form.createdBy === "hr" ? "border-blue" : ""}`}
                    >
                      <p className="font-semibold text-text-primary">HR-created event</p>
                      <p className="mt-1 text-xs text-text-secondary">Official company event. No creator reward.</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, createdBy: "people" }))}
                      className={`ui-panel p-3 text-left ${form.createdBy === "people" ? "border-blue" : ""}`}
                    >
                      <p className="font-semibold text-text-primary">People-created event</p>
                      <p className="mt-1 text-xs text-text-secondary">Colleague initiated. Creator earns credits when others attend.</p>
                    </button>
                  </div>
                </div>
              ) : null}

              {step === 2 ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="space-y-1 text-sm text-text-secondary">
                    <span className="text-xs font-semibold text-text-muted">Event title</span>
                    <input value={form.title} onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))} className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary outline-none" />
                  </label>
                  <label className="space-y-1 text-sm text-text-secondary">
                    <span className="text-xs font-semibold text-text-muted">Date</span>
                    <input value={form.date} onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))} placeholder="e.g. Thu, Mar 20" className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary outline-none" />
                  </label>
                  <label className="space-y-1 text-sm text-text-secondary">
                    <span className="text-xs font-semibold text-text-muted">Time</span>
                    <input value={form.time} onChange={(e) => setForm((prev) => ({ ...prev, time: e.target.value }))} placeholder="e.g. 18:00" className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary outline-none" />
                  </label>
                  <label className="space-y-1 text-sm text-text-secondary">
                    <span className="text-xs font-semibold text-text-muted">Location</span>
                    <input value={form.location} onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))} className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary outline-none" />
                  </label>
                  <label className="space-y-1 text-sm text-text-secondary sm:col-span-2">
                    <span className="text-xs font-semibold text-text-muted">Description</span>
                    <textarea value={form.description} onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))} rows={3} className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary outline-none" />
                  </label>
                </div>
              ) : null}

              {step === 3 ? (
                <div className="space-y-3">
                  <div className="grid gap-3 sm:grid-cols-3">
                    <label className="space-y-1 text-sm text-text-secondary">
                      <span className="text-xs font-semibold text-text-muted">Spots</span>
                      <input type="number" value={form.spotsLeft} onChange={(e) => setForm((prev) => ({ ...prev, spotsLeft: Number(e.target.value) }))} className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary outline-none" />
                    </label>
                    <label className="space-y-1 text-sm text-text-secondary">
                      <span className="text-xs font-semibold text-text-muted">Join cost (pts)</span>
                      <input type="number" value={form.pointsCost} onChange={(e) => setForm((prev) => ({ ...prev, pointsCost: Number(e.target.value) }))} className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary outline-none" />
                    </label>
                    <label className="space-y-1 text-sm text-text-secondary">
                      <span className="text-xs font-semibold text-text-muted">Credit back (pts)</span>
                      <input type="number" value={form.cashback} onChange={(e) => setForm((prev) => ({ ...prev, cashback: Number(e.target.value) }))} className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary outline-none" />
                    </label>
                  </div>
                  <div className="ui-panel-tint bg-surface-2 p-3 text-sm text-text-secondary">
                    {form.createdBy === "people"
                      ? "People-created: attendees receive credit-back after attendance and creator earns +15 pts per attendee."
                      : "HR-created: attendees receive credit-back after attendance. Creator reward is not applied."}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="flex items-center justify-between border-t border-border px-5 py-4">
              <Button variant="outline" onClick={() => (step === 1 ? closeCreate() : setStep((s) => s - 1))}>
                {step === 1 ? "Cancel" : "Back"}
              </Button>
              {step < 3 ? (
                <Button onClick={() => canContinue && setStep((s) => s + 1)} disabled={!canContinue}>
                  Continue
                </Button>
              ) : (
                <Button onClick={submitEvent}>Publish event</Button>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
