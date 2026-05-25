"use client";

import { useState, useRef, useEffect } from "react";
import { Send, X, MessageCircle } from "lucide-react";
import { checkRateLimit, sendChatMessage, extractLeadData, submitLeadToPipeFlow } from "@/lib/chat";
import type { ChatMessage, LeadCollectionForm } from "@/types/chat";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCollecting, setIsCollecting] = useState(false);
  const [collectForm, setCollectForm] = useState<LeadCollectionForm>({
    name: "",
    email: "",
    company: "",
  });
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Load chat history from sessionStorage
    const stored = sessionStorage.getItem("nexus_chat_history");
    if (stored) {
      try {
        const history = JSON.parse(stored);
        setMessages(history);
        if (history.length >= 9) {
          setIsCollecting(true);
        }
      } catch {
        // Reset if corrupted
        sessionStorage.removeItem("nexus_chat_history");
      }
    } else {
      // Clear rate limit state on new session — permite primeira mensagem sem blockeio
      localStorage.removeItem("nexus_chat_rate_limit");
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const saveHistory = (msgs: ChatMessage[]) => {
    sessionStorage.setItem("nexus_chat_history", JSON.stringify(msgs));
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: input.trim(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);
    setSubmitError("");

    // Rate limit check — movido após setIsLoading para melhor UX
    const rateCheck = checkRateLimit();
    if (!rateCheck.allowed) {
      setIsLoading(false);
      setSubmitError(rateCheck.message || "Muitas requisições");
      return;
    }

    const response = await sendChatMessage(newMessages);
    setIsLoading(false);

    if (response.error) {
      setSubmitError(response.error);
      return;
    }

    const assistantMessage: ChatMessage = {
      role: "assistant",
      content: response.message,
    };

    const updatedMessages = [...newMessages, assistantMessage];
    setMessages(updatedMessages);
    saveHistory(updatedMessages);

    // Check if we should enter collection phase (Turn 5)
    if (updatedMessages.length >= 9) {
      setIsCollecting(true);
    }
  };

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!collectForm.name || !collectForm.email) {
      setSubmitError("Nome e e-mail são obrigatórios");
      return;
    }

    setIsLoading(true);
    setSubmitError("");

    // Extract conversation data
    const leadData = extractLeadData(messages);
    if (!leadData) {
      setSubmitError("Erro ao processar conversa");
      setIsLoading(false);
      return;
    }

    // Merge form data with extracted data
    const fullLead = {
      ...leadData,
      name: collectForm.name,
      email: collectForm.email,
      company: collectForm.company || leadData.company,
    };

    const result = await submitLeadToPipeFlow(fullLead);
    setIsLoading(false);

    if (result.success) {
      setSubmitSuccess(true);
      setIsCollecting(false);
      // Clear history after successful submission
      setTimeout(() => {
        setMessages([]);
        setCollectForm({ name: "", email: "", company: "" });
        setSubmitSuccess(false);
        sessionStorage.removeItem("nexus_chat_history");
      }, 3000);
    } else {
      setSubmitError(result.error || "Erro ao enviar lead");
    }
  };

  if (!isMounted) return null;

  const hasStarted = messages.length > 0;

  return (
    <div className="fixed bottom-20 right-6 z-50 font-body">
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-accent text-bg flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
          aria-label="Abrir chat Nexus"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div className="w-full max-w-sm bg-surface border border-border rounded-xl shadow-2xl flex flex-col h-96 sm:h-[28rem] animation-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-positive animate-pulse" />
              <div>
                <h3 className="text-sm font-semibold text-text font-display">
                  NEX
                </h3>
                <p className="text-xs text-text-secondary">Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-text-secondary hover:text-text transition-colors"
              aria-label="Fechar chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-bg">
            {!hasStarted && (
              <div className="flex items-center justify-center h-full">
                <p className="text-center text-text-secondary text-sm max-w-xs">
                  Olá! Sou o NEX, um consultor da Nexus. Como posso ajudar sua operação hoje?
                </p>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-accent text-bg"
                      : "bg-surface-2 text-text border border-border"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-text-secondary animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-text-secondary animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                />
                <div className="w-2 h-2 rounded-full bg-text-secondary animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                />
              </div>
            )}

            {submitSuccess && (
              <div className="bg-positive/10 border border-positive/30 rounded-lg p-3">
                <p className="text-positive text-sm font-semibold">
                  ✓ Lead capturado com sucesso!
                </p>
                <p className="text-text-secondary text-xs mt-1">
                  Em breve, um especialista da Nexus entrará em contato.
                </p>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-border p-4 bg-surface">
            {isCollecting ? (
              <form onSubmit={handleSubmitLead} className="space-y-3">
                <input
                  type="text"
                  placeholder="Seu nome *"
                  value={collectForm.name}
                  onChange={(e) =>
                    setCollectForm({ ...collectForm, name: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-bg border border-border rounded-lg text-text text-sm placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
                />
                <input
                  type="email"
                  placeholder="seu@email.com *"
                  value={collectForm.email}
                  onChange={(e) =>
                    setCollectForm({ ...collectForm, email: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-bg border border-border rounded-lg text-text text-sm placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
                />
                <input
                  type="text"
                  placeholder="Empresa (opcional)"
                  value={collectForm.company}
                  onChange={(e) =>
                    setCollectForm({ ...collectForm, company: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-bg border border-border rounded-lg text-text text-sm placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
                />
                {submitError && (
                  <p className="text-negative text-xs">{submitError}</p>
                )}
                <button
                  type="submit"
                  disabled={isLoading || submitSuccess}
                  className="w-full bg-accent text-bg py-2 rounded-lg font-semibold text-sm hover:bg-opacity-90 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? "Enviando..." : "Enviar"}
                  {!isLoading && <Send size={16} />}
                </button>
              </form>
            ) : (
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Digite sua resposta..."
                  disabled={isLoading}
                  className="flex-1 px-3 py-2 bg-bg border border-border rounded-lg text-text text-sm placeholder-text-muted focus:outline-none focus:border-accent transition-colors disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-accent text-bg p-2 rounded-lg hover:bg-opacity-90 transition-all duration-200 disabled:opacity-50"
                  aria-label="Enviar mensagem"
                >
                  <Send size={18} />
                </button>
              </form>
            )}
            {submitError && !isCollecting && (
              <p className="text-negative text-xs mt-2">{submitError}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
