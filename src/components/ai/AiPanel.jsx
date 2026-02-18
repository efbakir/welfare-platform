import { useState } from "react";
import Button from "../ui/Button";

const quickChips = ["Wellness credits", "Family benefits", "Expiring points", "Daycare options"];

export default function AiPanel() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages] = useState([
    { role: "user", text: "What wellness benefits do I have left?" },
    {
      role: "ai",
      text: "You have 50 points remaining for wellness this month. You can use them for gym, mental health support, or fitness classes.",
    },
  ]);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue text-white shadow-[var(--shadow-blue)] transition-transform hover:scale-105"
        title="Open AI assistant"
      >
        <span className="text-xl">✦</span>
      </button>
    );
  }

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex max-h-[500px] min-h-[400px] w-[380px] flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-xl)]"
      style={{ borderRadius: "var(--radius-2xl)" }}
    >
      <div className="flex shrink-0 items-center gap-2.5 border-b border-border bg-gradient-to-br from-blue-tint/40 to-pink-tint/30 px-5 py-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-blue to-pink text-sm shadow-[0_3px_12px_rgba(0,85,184,0.25)]">
          ✦
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-display text-[13px] font-bold text-text-primary">Welfare Assistant</div>
          <div className="text-[10px] text-text-muted">Ask about your benefits</div>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-green-tint px-2 py-1 text-[10px] font-semibold text-green">
          <span className="h-1.5 w-1.5 rounded-full bg-green" />
          Online
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-md p-1 text-text-muted hover:bg-bg hover:text-text-primary"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div className="flex shrink-0 flex-wrap gap-1.5 border-b border-border bg-bg px-4 py-3">
        {quickChips.map((label) => (
          <button
            key={label}
            type="button"
            onClick={() => setMessage(label)}
            className="rounded-full border border-border-dark bg-surface px-2.5 py-1 text-[11px] font-medium text-text-secondary transition-colors hover:border-blue hover:bg-blue-tint hover:text-blue"
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex flex-1 flex-col gap-3.5 overflow-y-auto p-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <div
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs ${
                m.role === "ai"
                  ? "bg-gradient-to-br from-blue to-pink text-white"
                  : "bg-border font-semibold text-text-secondary"
              }`}
            >
              {m.role === "ai" ? "✦" : "U"}
            </div>
            <div
              className={`max-w-[88%] rounded-xl px-3 py-2.5 text-[12.5px] leading-snug ${
                m.role === "user"
                  ? "rounded-tr-sm bg-blue text-text-white"
                  : "rounded-tl-sm border border-border bg-bg text-text-primary"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div className="shrink-0 border-t border-border bg-bg p-3">
        <div className="flex items-center gap-2 rounded-xl border border-border-dark bg-surface px-3 py-2 focus-within:border-blue focus-within:shadow-[0_0_0_3px_var(--color-blue-glow)]">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask about your benefits…"
            className="flex-1 border-none bg-transparent text-[12.5px] text-text-primary outline-none placeholder:text-text-muted"
          />
          <button
            type="button"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue text-white hover:bg-blue-dark"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
