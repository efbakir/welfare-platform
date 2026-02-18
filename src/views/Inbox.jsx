import { useState } from "react";
import PageHeader from "../components/layout/PageHeader";
import { Card, CardBody } from "../components/ui/Card";
import Button from "../components/ui/Button";
import { usePov } from "../context/PovContext";

export default function Inbox() {
  const { profile } = usePov();
  const [selected, setSelected] = useState(profile.inbox.threads[0]?.id);

  const active = profile.inbox.threads.find((t) => t.id === selected) || profile.inbox.threads[0];

  return (
    <>
      <PageHeader eyebrow="Benefits Concierge" title="Inbox" subtitle="Coordinate requests and support in one place" />

      <div className="grid gap-4 xl:grid-cols-[280px_1fr_300px]">
        <Card>
          <CardBody className="space-y-2">
            {profile.inbox.threads.map((thread) => (
              <button
                key={thread.id}
                type="button"
                onClick={() => setSelected(thread.id)}
                className={`w-full rounded-2xl p-3 text-left ${thread.id === active.id ? "bg-blue-tint" : "bg-[#f8fafc]"}`}
              >
                <p className="text-sm font-semibold text-text-primary">{thread.name}</p>
                <p className="text-xs text-text-muted">{thread.preview}</p>
              </button>
            ))}
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex h-[560px] flex-col p-0">
            <div className="border-b border-gray-100 px-4 py-3">
              <p className="text-sm font-semibold text-text-primary">{active.name}</p>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto bg-[#f8fafc] p-4">
              <div className="max-w-[70%] rounded-2xl bg-white p-3 text-sm text-text-primary">{active.preview}</div>
              <div className="ml-auto max-w-[70%] rounded-2xl bg-blue p-3 text-sm text-white">Can you share suggested options?</div>
            </div>
            <div className="border-t border-gray-100 p-3">
              <div className="flex items-center gap-2 rounded-2xl bg-white p-2 shadow-[0_8px_20px_rgb(0,0,0,0.04)]">
                <input placeholder="Type message..." className="flex-1 border-none bg-transparent px-2 text-sm outline-none" />
                <Button size="sm">Send</Button>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="space-y-3">
            <p className="text-sm font-semibold text-text-primary">Context panel</p>
            <div className="rounded-2xl bg-[#f8fafc] p-3 text-sm text-text-secondary">Employee: {profile.name}</div>
            <div className="rounded-2xl bg-[#f8fafc] p-3 text-sm text-text-secondary">Life stage: {profile.lifeStage}</div>
            <div className="rounded-2xl bg-[#f8fafc] p-3 text-sm text-text-secondary">{profile.inbox.context}</div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
