import { useCallback, useEffect, useRef, useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { RESUME_CONTEXT, STARTERS } from "@/lib/resumeContext";

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || "";

type Message = { role: "user" | "assistant"; content: string };
type VerifyStatus = "idle" | "checking" | "verified" | "failed";

function MessageContent({ content }: { content: string }) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = content.split(urlRegex);

  return (
    <span className="whitespace-pre-wrap">
      {parts.map((part, i) =>
        /^https?:\/\//.test(part) ? (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline break-all"
          >
            {part}
          </a>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </span>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<VerifyStatus>("idle");
  const [error, setError] = useState("");
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm Ahmad Feroz Arshad.\nGmail: ranaferoz792@gmail.com\n\nHow may I help you?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const turnstileRef = useRef<any>(null);
  const verifyingRef = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const verifyWithServer = useCallback(async (turnstileToken: string | null) => {
    if (verifyingRef.current) return;
    verifyingRef.current = true;
    setStatus("checking");
    setError("");

    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ turnstileToken: turnstileToken || undefined }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Verification failed.");

      setSessionToken(data.sessionToken);
      setStatus("verified");
    } catch (err) {
      setStatus("failed");
      setError(err instanceof Error ? err.message : "Verification failed. Please try again.");
      turnstileRef.current?.reset();
    } finally {
      verifyingRef.current = false;
    }
  }, []);

  // Kick off verification the first time the widget is opened
  useEffect(() => {
    if (open && status === "idle" && !TURNSTILE_SITE_KEY) {
      verifyWithServer(null);
    }
    // If a site key exists, the invisible Turnstile widget's onWidgetLoad triggers execute() itself.
  }, [open, status, verifyWithServer]);

  async function sendMessage(text: string) {
    if (!sessionToken) return;
    const userMsg: Message = { role: "user", content: text };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Session-Token": sessionToken,
        },
        body: JSON.stringify({
          system: RESUME_CONTEXT,
          messages: nextMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Request failed.");
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: err instanceof Error ? err.message : "Connection mein masla aa gaya — dobara try karein.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading || status !== "verified") return;
    sendMessage(trimmed);
  }

  function handleRetry() {
    setStatus("idle");
    setError("");
    turnstileRef.current?.reset();
    turnstileRef.current?.execute();
  }

  return (
    <>
      {/* Floating toggle button — sits above the WhatsApp button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        className="fixed right-4 bottom-24 z-50 glass glow-cyan rounded-full p-4 text-primary hover:border-primary/40 transition-colors"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        aria-label={open ? "Close chat" : "Chat with me"}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              className="block"
            >
              <X size={26} />
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              className="block"
            >
              <MessageCircle size={26} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed right-4 bottom-40 z-50 w-[92vw] max-w-[380px] glass-strong rounded-2xl overflow-hidden flex flex-col"
            style={{ height: "min(560px, 70vh)" }}
          >
            {/* Header */}
            <div className="px-4 py-3 flex items-center gap-3 border-b border-border">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold text-gradient bg-primary/10 border border-primary/20 shrink-0">
                AF
              </div>
              <div className="flex flex-col leading-tight min-w-0">
                <span className="text-sm font-semibold truncate">Ahmad Feroz Arshad</span>
                <span className="text-xs text-muted-foreground">Junior Software Developer</span>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: status === "verified" ? "#4ADE80" : "#828AA0" }}
                />
                <span className="text-[11px] text-muted-foreground">
                  {status === "verified" ? "Online" : "Connecting"}
                </span>
              </div>
            </div>

            {status !== "verified" ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  {status === "failed" ? (
                    <X size={22} className="text-destructive" />
                  ) : (
                    <div
                      className="w-6 h-6 rounded-full border-2 border-transparent animate-spin"
                      style={{ borderTopColor: "hsl(var(--primary))", borderRightColor: "hsl(var(--secondary))" }}
                    />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {status === "failed" ? error || "Verification failed." : "Verifying you're human…"}
                </p>
                {status === "failed" && (
                  <button
                    onClick={handleRetry}
                    className="text-xs font-medium bg-primary text-primary-foreground px-4 py-1.5 rounded-full"
                  >
                    Try again
                  </button>
                )}

                {TURNSTILE_SITE_KEY &&  (
                  <div className="sr-only" aria-hidden="true">
                    <Turnstile
                      ref={turnstileRef}
                      siteKey={TURNSTILE_SITE_KEY}
                      onSuccess={(token) => verifyWithServer(token)}
                      onError={() => {
                        setStatus("failed");
                        setError("Security check failed. Please try again.");
                      }}
                      onExpire={() => {
                        turnstileRef.current?.reset();
                        turnstileRef.current?.execute();
                      }}
                      onWidgetLoad={() => turnstileRef.current?.execute()}
                      options={{ theme: "dark", size: "invisible", action: "resume-chat-login" }}
                    />
                  </div>
                )}
              </div>
            ) : (
              <>
                <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
                  {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-[13px] leading-relaxed ${
                          m.role === "user" ? "bg-primary text-primary-foreground rounded-br-md" : "glass rounded-bl-md"
                        }`}
                      >
                        <MessageContent content={m.content} />
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex justify-start">
                      <div className="glass rounded-2xl rounded-bl-md px-4 py-3 flex gap-1 items-center">
                        {[0, 1, 2].map((i) => (
                          <span
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"
                            style={{ animationDelay: `${i * 0.15}s` }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {messages.length <= 1 && (
                  <div className="px-4 pb-2 flex flex-wrap gap-2">
                    {STARTERS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => sendMessage(s)}
                        disabled={loading}
                        className="text-[11px] rounded-full px-3 py-1.5 glass text-muted-foreground hover:text-primary transition-colors disabled:opacity-50"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="px-3 py-3 flex items-center gap-2 border-t border-border">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about my skills, projects…"
                    disabled={loading}
                    className="flex-1 rounded-full px-4 py-2 text-[13px] outline-none bg-muted border border-border focus:border-primary/50 transition-colors disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="w-9 h-9 shrink-0 rounded-full flex items-center justify-center bg-primary text-primary-foreground disabled:opacity-40 transition-transform active:scale-95"
                  >
                    <Send size={15} />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
