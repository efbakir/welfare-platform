import { useState } from "react";
import PageHeader from "../components/layout/PageHeader";
import Button from "../components/ui/Button";
import { Card, CardBody } from "../components/ui/Card";
import { usePov } from "../context/PovContext";

export default function AiAssistant() {
  const { profile } = usePov();
  const [message, setMessage] = useState("");

  return (
    <>
      <PageHeader
        eyebrow="Decision support"
        title="AI Assistant"
        subtitle="Personalized help for smarter benefit usage"
      />

      <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
        <Card>
          <CardBody className="space-y-2">
            <p className="text-sm font-semibold text-text-primary">Quick prompts</p>
            {profile.ai.prompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => setMessage(prompt)}
                className="w-full rounded-2xl bg-[#f8fafc] p-3 text-left text-sm text-text-secondary"
              >
                {prompt}
              </button>
            ))}
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex h-[560px] flex-col p-0">
            <div className="border-b border-gray-100 px-4 py-3 text-sm font-semibold text-text-primary">Conversation</div>
            <div className="flex-1 space-y-3 overflow-y-auto bg-[#f8fafc] p-4">
              <div className="max-w-[75%] rounded-2xl bg-white p-3 text-sm text-text-primary">{profile.ai.starter}</div>
              {message && <div className="ml-auto max-w-[75%] rounded-2xl bg-blue p-3 text-sm text-white">{message}</div>}
            </div>
            <div className="border-t border-gray-100 p-3">
              <div className="flex items-center gap-2 rounded-2xl bg-white p-2 shadow-[0_8px_20px_rgb(0,0,0,0.04)]">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask about your benefits..."
                  className="flex-1 border-none bg-transparent px-2 text-sm outline-none"
                />
                <Button size="sm">Send</Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
