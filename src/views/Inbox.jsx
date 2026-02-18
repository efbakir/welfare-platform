import { useMemo, useState } from "react";
import PageHeader from "../components/layout/PageHeader";
import Button from "../components/ui/Button";
import { Card, CardBody } from "../components/ui/Card";
import { formatRelativeTime, initialsFromName } from "../utils/time";

const conversations = [
  { id: "c1", name: "Rosemary Koss", lastMessage: "Please enter the transaction amount.", timestamp: "2026-02-17T16:04:00Z" },
  { id: "c2", name: "Darin O'Keefe", lastMessage: "Can we delay processing by one day?", timestamp: "2026-02-17T13:30:00Z" },
  { id: "c3", name: "Irene Dicki", lastMessage: "Joining the team cooking class.", timestamp: "2026-02-17T11:18:00Z" },
];

const chatByConversation = {
  c1: [
    { id: "m1", author: "Rosemary", me: false, text: "Thank you. Please enter the amount and date of the transaction.", at: "2026-02-17T14:15:00Z" },
    { id: "m2", author: "You", me: true, text: "R$50, November 30th", at: "2026-02-17T14:18:00Z" },
    { id: "m3", author: "Rosemary", me: false, text: "There may be a delay in processing the transaction.", at: "2026-02-17T14:21:00Z" },
  ],
  c2: [
    { id: "m4", author: "Darin", me: false, text: "Can we push this request one day?", at: "2026-02-17T13:10:00Z" },
    { id: "m5", author: "You", me: true, text: "Yes, I updated the due date.", at: "2026-02-17T13:12:00Z" },
  ],
  c3: [
    { id: "m6", author: "Irene", me: false, text: "I just registered for Friday.", at: "2026-02-17T10:02:00Z" },
    { id: "m7", author: "You", me: true, text: "Great. See you there.", at: "2026-02-17T10:06:00Z" },
  ],
};

export default function Inbox() {
  const [selectedId, setSelectedId] = useState(conversations[0].id);
  const selected = useMemo(() => conversations.find((item) => item.id === selectedId) ?? conversations[0], [selectedId]);
  const messages = chatByConversation[selected.id] ?? [];

  return (
    <>
      <PageHeader eyebrow="Communication" title="Inbox" subtitle="Unified support and collaboration workspace" />

      <div className="grid gap-4 xl:grid-cols-[300px_1fr_300px]">
        <Card>
          <CardBody className="space-y-3 p-3">
            <input
              type="text"
              placeholder="Search chat"
              className="w-full rounded-full border border-gray-200 bg-white px-4 py-2 text-sm outline-none"
            />
            <div className="flex gap-2">
              <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs">Open</span>
              <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs">Newest</span>
            </div>
            <div className="space-y-1">
              {conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  type="button"
                  onClick={() => setSelectedId(conversation.id)}
                  className={`w-full rounded-2xl p-3 text-left transition ${selectedId === conversation.id ? "bg-white shadow-sm" : "hover:bg-white/80"}`}
                >
                  <p className="text-sm font-semibold text-text-primary">{conversation.name}</p>
                  <p className="mt-0.5 text-xs text-text-muted">{conversation.lastMessage}</p>
                </button>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex h-[680px] flex-col p-0">
            <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue text-xs font-bold text-white">{initialsFromName(selected.name)}</div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">{selected.name}</p>
                  <p className="text-xs text-text-muted">Online</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Pause</Button>
                <Button variant="pink" size="sm">Close</Button>
              </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto bg-[#f4f4f4] p-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.me ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[72%] rounded-2xl border px-4 py-3 text-sm ${msg.me ? "border-blue bg-blue text-white" : "border-gray-200 bg-white text-text-primary"}`}>
                    <p>{msg.text}</p>
                    <p className={`mt-2 text-[11px] ${msg.me ? "text-white/80" : "text-text-muted"}`}>{formatRelativeTime(msg.at)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 bg-white p-3">
              <div className="flex items-center gap-2 rounded-2xl border border-gray-200 p-2">
                <input type="text" placeholder="Type message..." className="flex-1 border-none bg-transparent px-2 text-sm outline-none" />
                <Button size="sm">Send</Button>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="space-y-4 p-0">
            <img
              src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80"
              alt="profile"
              className="h-28 w-full object-cover"
            />
            <div className="px-4">
              <p className="text-xl font-semibold text-text-primary">{selected.name}</p>
              <button className="mt-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs">Edit</button>
            </div>
            <div className="space-y-2 px-4 pb-4">
              <div className="rounded-xl border border-gray-200 bg-white p-3 text-sm text-text-secondary">Channel: WhatsAppB2B</div>
              <div className="rounded-xl border border-gray-200 bg-white p-3 text-sm text-text-secondary">ID: 2023113142356</div>
              <div className="rounded-xl border border-gray-200 bg-white p-3 text-sm text-text-secondary">Address: Richmond View Suite</div>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
