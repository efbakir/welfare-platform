import { useState } from "react";
import PageHeader from "../components/layout/PageHeader";
import Button from "../components/ui/Button";
import { Card, CardBody } from "../components/ui/Card";

const quickPrompts = [
  "How can I optimize family budget this month?",
  "Which benefits expire first?",
  "Suggest benefits for my life stage",
  "Find most popular team experiences",
];

export default function AiAssistant() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hi Mario. I can help optimize your benefit usage and family allocations. Ask me anything.",
    },
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", text: message },
      {
        role: "ai",
        text: "Based on your profile, prioritize daycare subsidy and wellness credits first. I can generate a full monthly plan if you want.",
      },
    ]);
    setMessage("");
  };

  return (
    <>
      <PageHeader
        eyebrow="AI Copilot"
        title="Welfare AI Assistant"
        subtitle="Strategy, recommendations, and real-time support"
      />

      <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
        <Card>
          <CardBody className="space-y-3 p-4">
            <p className="text-xs uppercase tracking-wide text-text-muted">Quick prompts</p>
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => setMessage(prompt)}
                className="w-full rounded-2xl border border-gray-200 bg-white p-3 text-left text-sm text-text-secondary transition hover:bg-gray-50"
              >
                {prompt}
              </button>
            ))}
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex h-[70vh] flex-col p-0">
            <div className="border-b border-gray-200 bg-white px-4 py-3">
              <p className="text-sm font-semibold text-text-primary">Session: Benefits optimization</p>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto bg-[#f7f7f7] p-4">
              {messages.map((m, index) => (
                <div key={index} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm ${m.role === "user" ? "bg-blue text-white" : "border border-gray-200 bg-white text-text-primary"}`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 bg-white p-3">
              <div className="flex items-center gap-2 rounded-2xl border border-gray-200 p-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") sendMessage();
                  }}
                  placeholder="Ask AI about your benefits..."
                  className="flex-1 border-none bg-transparent px-2 text-sm outline-none"
                />
                <Button size="sm" onClick={sendMessage}>Send</Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
