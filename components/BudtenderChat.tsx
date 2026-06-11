"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "What do you recommend for relaxing? 😴",
  "Something for energy & creativity ⚡",
  "Best value under ฿300?",
  "I'm a beginner — what should I try?",
];

const WELCOME =
  "Hey! I'm the DANK Budtender 🌿 Tell me your mood, vibe or budget and I'll find your perfect match. ถามเป็นภาษาไทยได้นะครับ!";

function renderContent(text: string) {
  // Turn /shop/... mentions into clickable links
  const parts = text.split(/(\/shop\/[a-z0-9-]+)/g);
  return parts.map((part, i) =>
    part.startsWith("/shop/") ? (
      <Link
        key={i}
        href={part}
        className="text-dank-green underline hover:text-green-300"
      >
        View product →
      </Link>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function BudtenderChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading) return;

    const next: Msg[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setMessages([
          ...next,
          {
            role: "assistant",
            content:
              data?.message ??
              "Something went wrong — message us on LINE @dankclubbkk!",
          },
        ]);
        return;
      }

      setMessages([...next, { role: "assistant", content: "" }]);
      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages([...next, { role: "assistant", content: acc }]);
      }
    } catch {
      setMessages([
        ...next,
        {
          role: "assistant",
          content: "Connection issue — please try again 🙏",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Chat with AI Budtender"
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-dank-green hover:bg-green-400 text-black font-bold pl-4 pr-5 py-3.5 rounded-full shadow-lg shadow-dank-green/25 transition-all hover:scale-105"
      >
        {open ? (
          <X className="w-5 h-5" />
        ) : (
          <>
            <MessageCircle className="w-5 h-5" />
            <span className="hidden sm:inline text-sm">AI Budtender</span>
          </>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-[calc(100vw-2.5rem)] max-w-sm h-[32rem] bg-dank-card border border-dank-border rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-2.5 px-4 py-3 border-b border-dank-border bg-gradient-to-r from-dank-green/15 to-transparent">
            <div className="w-9 h-9 rounded-full bg-dank-green/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-dank-green" />
            </div>
            <div>
              <p className="font-bold text-sm">DANK AI Budtender</p>
              <p className="text-[11px] text-dank-green">
                Online 24/7 · TH/EN
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            <div className="bg-white/5 rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-sm text-gray-200 max-w-[90%]">
              {WELCOME}
            </div>

            {messages.length === 0 && (
              <div className="flex flex-col gap-2 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-left text-xs text-gray-300 border border-dank-border hover:border-dank-green/50 hover:text-white rounded-xl px-3 py-2 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {messages.map((m, i) =>
              m.role === "user" ? (
                <div
                  key={i}
                  className="bg-dank-green text-black rounded-2xl rounded-tr-sm px-3.5 py-2.5 text-sm font-medium ml-auto max-w-[85%] w-fit"
                >
                  {m.content}
                </div>
              ) : (
                <div
                  key={i}
                  className="bg-white/5 rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-sm text-gray-200 max-w-[90%] whitespace-pre-wrap"
                >
                  {m.content ? renderContent(m.content) : "…"}
                </div>
              )
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 px-3 py-3 border-t border-dank-border"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything…"
              className="flex-1 bg-dank-dark border border-dank-border rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-dank-muted focus:outline-none focus:border-dank-green/50"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send"
              className="p-2.5 bg-dank-green hover:bg-green-400 disabled:opacity-40 text-black rounded-xl transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
