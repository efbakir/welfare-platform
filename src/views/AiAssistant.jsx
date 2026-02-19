import { useMemo, useState } from "react";
import PageHeader from "../components/layout/PageHeader";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import { Card, CardBody } from "../components/ui/Card";
import Icon from "../components/ui/Icon";
import { usePov } from "../context/PovContext";

const endpointCards = [
  {
    id: "recommend",
    title: "/recommend",
    subtitle: "Context-aware benefit ranking",
    sample: "Prioritize childcare credits this month",
  },
  {
    id: "explain",
    title: "/explain",
    subtitle: "Why a recommendation appears",
    sample: "Because work mode is Hybrid and goal is Family",
  },
  {
    id: "policy",
    title: "/policy-check",
    subtitle: "Eligibility and policy validation",
    sample: "Family Support policy eligible for reimbursement",
  },
  {
    id: "optimize",
    title: "/optimize-wallet",
    subtitle: "Credit usage optimization",
    sample: "Use 120 points before expiry to avoid waste",
  },
];

export default function AiAssistant() {
  const { profile } = usePov();
  const [message, setMessage] = useState("");
  const [conversationByProfile, setConversationByProfile] = useState({});

  const baseMessages = useMemo(
    () => [
      { id: `ai-1-${profile.id}`, role: "ai", text: profile.ai.starter },
      {
        id: `ai-2-${profile.id}`,
        role: "ai",
        text: profile.aiConsent
          ? `I can explain recommendations, check policy eligibility, and build a monthly plan for ${profile.profileAnswers.focus.toLowerCase()} benefits.`
          : "AI suggestions are currently off for this profile. You can still browse static policy and benefit info.",
      },
    ],
    [profile]
  );

  const conversation = [...baseMessages, ...(conversationByProfile[profile.id] || [])];

  const sendMessage = () => {
    const text = message.trim();
    if (!text) return;

    if (!profile.aiConsent) {
      setConversationByProfile((prev) => ({
        ...prev,
        [profile.id]: [
          ...(prev[profile.id] || []),
          { id: `user-${Date.now()}`, role: "user", text },
          {
            id: `ai-${Date.now() + 1}`,
            role: "ai",
            text: "AI personalization is disabled for this profile. Enable consent in onboarding/profile to receive tailored suggestions.",
          },
        ],
      }));
      setMessage("");
      return;
    }

    setConversationByProfile((prev) => ({
      ...prev,
      [profile.id]: [
        ...(prev[profile.id] || []),
        { id: `user-${Date.now()}`, role: "user", text },
        {
          id: `ai-${Date.now() + 1}`,
          role: "ai",
          text: `Noted. For ${profile.name}, I would start with ${profile.recommended[0]?.title ?? "high-fit benefits"} and then validate policy eligibility before redemption.`,
        },
      ],
    }));
    setMessage("");
  };

  return (
    <div className="mx-auto w-full max-w-[1240px] space-y-5">
      <PageHeader
        title="AI Assistant"
        subtitle="Grounded guidance for recommendations, policy checks, and credit optimization."
      />

      <div className="grid gap-4 xl:grid-cols-[0.92fr_1.45fr]">
        <Card>
          <CardBody className="space-y-4">
            <div className="rounded-xl bg-violet-tint p-3">
              <p className="text-lg font-semibold text-text-primary">Assistant workspace</p>
              <p className="mt-1 text-sm text-text-secondary">AI context for {profile.name} · {profile.lifeStage}</p>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-semibold text-text-primary">Capabilities</p>
                <Badge variant="green">Live</Badge>
              </div>
              <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
                {endpointCards.map((card) => (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => setMessage(card.sample)}
                    className="ui-panel ui-interactive p-3 text-left"
                  >
                    <p className="text-sm font-semibold text-text-primary">{card.title}</p>
                    <p className="mt-0.5 text-xs text-text-secondary">{card.subtitle}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 inline-flex items-center gap-1 text-sm font-semibold text-text-primary">
                <Icon name="spark" className="h-4 w-4" />
                Quick prompts
              </p>
              <div className="space-y-2">
                {profile.ai.prompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => setMessage(prompt)}
                    className="ui-panel ui-interactive w-full p-3 text-left text-sm text-text-secondary"
                  >
                    <Icon name="spark" className="mr-1 inline h-4 w-4" />
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-cyan-tint p-3">
              <p className="text-xs font-medium text-text-muted">Personalization context</p>
              <p className="mt-1 text-sm font-semibold text-text-primary">
                {profile.profileAnswers.workMode} · {profile.profileAnswers.focus} · {profile.profileAnswers.socialStyle}
              </p>
              <p className="mt-1 text-xs text-text-secondary">This context is used to rank answers and recommendations.</p>
            </div>

            {!profile.aiConsent && (
              <div className="rounded-xl bg-violet-tint p-3 text-xs text-text-secondary">
                AI suggestions are off for this profile. You can still access non-personalized guidance.
              </div>
            )}
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex h-[640px] flex-col p-0">
            <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.6)] px-4 py-3">
              <p className="inline-flex items-center gap-1 text-sm font-semibold text-text-primary">
                <Icon name="spark" className="h-4 w-4" />
                Conversation
              </p>
              <div className="inline-flex items-center gap-2">
                <Badge variant={profile.aiConsent ? "green" : "neutral"}>{profile.aiConsent ? "Grounded mode" : "Consent required"}</Badge>
                <Badge variant="neutral">API status: healthy</Badge>
              </div>
            </div>

            <div className="grid gap-2 border-b border-[rgba(255,255,255,0.6)] bg-white/50 px-4 py-3 md:grid-cols-3">
              <div className="ui-panel p-3">
                <p className="text-xs font-medium text-text-muted">Profile loaded</p>
                <p className="mt-1 text-sm font-semibold text-text-primary">{profile.name}</p>
              </div>
              <div className="ui-panel p-3">
                <p className="text-xs font-medium text-text-muted">This month budget</p>
                <p className="mt-1 text-sm font-semibold text-text-primary">{profile.budget.remaining} pts remaining</p>
              </div>
              <div className="ui-panel p-3">
                <p className="text-xs font-medium text-text-muted">Top suggestion</p>
                <p className="mt-1 text-sm font-semibold text-text-primary">{profile.recommended[0]?.title}</p>
              </div>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto bg-[#f7f8fd] p-4">
              {conversation.map((item) => (
                <div key={item.id} className={`flex gap-2 ${item.role === "user" ? "justify-end" : "justify-start"}`}>
                  {item.role !== "user" && (
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-blue text-xs font-semibold text-white">
                      AI
                    </span>
                  )}
                  <div
                    className={`max-w-[82%] rounded-xl px-3 py-2.5 text-sm leading-relaxed ${
                      item.role === "user"
                        ? "bg-blue text-white"
                        : "ui-panel text-text-primary"
                    }`}
                  >
                    {item.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[rgba(255,255,255,0.6)] px-4 py-3">
              <div className="mb-2 flex flex-wrap gap-2">
                <button type="button" onClick={() => setMessage("Check what credits expire first")} className="ui-panel ui-interactive rounded-md px-3 py-1.5 text-xs font-medium text-text-secondary">Expiring credits</button>
                <button type="button" onClick={() => setMessage("What can I redeem this week?")} className="ui-panel ui-interactive rounded-md px-3 py-1.5 text-xs font-medium text-text-secondary">Best this week</button>
                <button type="button" onClick={() => setMessage("Explain why this recommendation is shown")} className="ui-panel ui-interactive rounded-md px-3 py-1.5 text-xs font-medium text-text-secondary">Explain recommendation</button>
              </div>

              <div className="ui-panel flex items-center gap-2 p-2">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask about eligibility, credits, or recommendations..."
                  className="flex-1 border-none bg-transparent px-2 text-sm outline-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                />
                <Button size="sm" onClick={sendMessage}>Send</Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
