"use client";

import { useState, useRef, useEffect } from "react";
import { Send, X } from "lucide-react";
import { checkRateLimit, sendChatMessage, extractLeadData, submitLeadToPipeFlow } from "@/lib/chat";
import type { ChatMessage, LeadCollectionForm } from "@/types/chat";
import type { OrbState, SmartEvent } from "@/types/orb";
import { NexusOrb } from "./NexusOrb";
import { ThoughtBubble } from "./ThoughtBubble";
import { useSmartAttention } from "@/hooks/useSmartAttention";
import { createInitialOrbState, transitionOrbState } from "@/lib/orb-state";
import { selectPromptByEvent } from "@/data/thought-prompts";

export function ChatWidget() {
  // ─── M9 States (untouched) ──────────────────────────────────
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCollecting, setIsCollecting] = useState(false);
  const [collectForm, setCollectForm] = useState<LeadCollectionForm>({
    name: "",
    email: "",
    company: "",
    whatsapp: "",
  });
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  // ─── M10 Orb States ────────────────────────────────────────
  const [orbState, setOrbState] = useState(createInitialOrbState());
  const [bubbleMessage, setBubbleMessage] = useState("");
  const [showBubble, setShowBubble] = useState(false);

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

  useEffect(() => {
    if (isCollecting) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isCollecting]);

  // ─── M10: Smart Attention System ───────────────────────────
  useSmartAttention({
    onEvent: (event: SmartEvent) => {
      if (isOpen) return; // Não mostrar bubbles se chat está aberto

      // Transicionar para thinking
      setOrbState((prev) => transitionOrbState(prev, "thinking"));

      // Selecionar frase
      const prompt = selectPromptByEvent(event);
      setBubbleMessage(prompt);

      // Mostrar bubble após delay
      setTimeout(() => {
        setShowBubble(true);
        setOrbState((prev) => transitionOrbState(prev, "bubble_show"));
      }, 50);
    },
    enabled: !isOpen, // Desativar quando chat está aberto
  });

  const handleOrbClick = () => {
    setShowBubble(false);
    setOrbState((prev) => transitionOrbState(prev, "chat_open"));
    setIsOpen(true);
  };

  const handleCloseBubble = () => {
    setShowBubble(false);
    setOrbState((prev) => transitionOrbState(prev, "bubble_hide"));
  };

  const handleCloseChat = () => {
    setIsOpen(false);
    setOrbState((prev) => transitionOrbState(prev, "chat_close"));
  };

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

    if (!response.error) {
      inputRef.current?.focus();
    }

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

    if (!collectForm.name || !collectForm.email || !collectForm.whatsapp) {
      setSubmitError("Nome, e-mail e WhatsApp são obrigatórios");
      return;
    }

    setIsLoading(true);
    setSubmitError("");

    // Extract conversation summary and identified pain/solution
    const assistantMessages = messages.filter((m) => m.role === "assistant");
    const conversationSummary = assistantMessages
      .map((m, i) => `${i + 1}. ${m.content}`)
      .join("\n");

    // Build lead data from form + conversation context
    const fullLead = {
      name: collectForm.name,
      email: collectForm.email,
      company: collectForm.company || "",
      whatsapp: collectForm.whatsapp,
      source: "Nexus Chat Widget" as const,
      conversationSummary,
      identifiedPain: "Desafio operacional identificado durante diagnóstico",
      suggestedSolution: "Explorar soluções Nexus personalizadas",
    };

    const result = await submitLeadToPipeFlow(fullLead);
    setIsLoading(false);

    if (result.success) {
      const leadName = collectForm.name.split(" ")[0]; // Primeiro nome

      const goodbyeMessage: ChatMessage = {
        role: "assistant",
        content: `Perfeito, ${leadName}! ✓ Seus dados foram registrados com sucesso. Em breve, um especialista da Nexus entrará em contato via WhatsApp. Posso ajudá-lo com mais algo?`,
      };

      const updatedMessages = [...messages, goodbyeMessage];
      setMessages(updatedMessages);
      saveHistory(updatedMessages);

      setIsCollecting(false);
      setCollectForm({ name: "", email: "", company: "", whatsapp: "" });
      setInput("");
    } else {
      setSubmitError(result.error || "Erro ao enviar lead");
    }
  };

  if (!isMounted) return null;

  const hasStarted = messages.length > 0;

  return (
    <div className="fixed bottom-20 right-6 z-50 font-body">
      {/* M10: Nexus Orb (visible when chat is closed) */}
      {!isOpen && (
        <>
          <NexusOrb
            isThinking={orbState.isThinking}
            isBubbleVisible={orbState.isBubbleVisible}
            showLabel={true}
            onClick={handleOrbClick}
          />
          <ThoughtBubble
            message={bubbleMessage}
            isVisible={showBubble}
            onClose={handleCloseBubble}
          />
        </>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div className={`w-full max-w-sm bg-surface border border-border rounded-xl shadow-2xl flex flex-col-reverse transition-all duration-300 animation-in fade-in slide-in-from-bottom-4 ${
          isCollecting ? "h-[32rem] sm:h-[36rem]" : "h-96 sm:h-[28rem]"
        }`}>
          {/* Input Area — aparece embaixo (primeiro no JSX com flex-col-reverse) */}
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
                <input
                  type="tel"
                  placeholder="WhatsApp *"
                  value={collectForm.whatsapp}
                  onChange={(e) =>
                    setCollectForm({ ...collectForm, whatsapp: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-bg border border-border rounded-lg text-text text-sm placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
                />
                {submitError && (
                  <p className="text-negative text-xs">{submitError}</p>
                )}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-accent text-bg py-2 rounded-lg font-semibold text-sm hover:bg-opacity-90 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? "Enviando..." : "Enviar"}
                  {!isLoading && <Send size={16} />}
                </button>
              </form>
            ) : (
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <textarea
                  ref={inputRef}
                  autoFocus
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    // Auto-resize: ajusta altura conforme digita
                    e.target.style.height = "auto";
                    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e as unknown as React.FormEvent);
                    }
                  }}
                  placeholder="Digite sua resposta..."
                  disabled={isLoading}
                  rows={1}
                  className="flex-1 px-3 py-2 bg-bg border border-border rounded-lg text-text text-sm placeholder-text-muted focus:outline-none focus:border-accent transition-colors disabled:opacity-50 resize-none overflow-hidden"
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

            <div ref={messagesEndRef} />
          </div>

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
              onClick={handleCloseChat}
              className="text-text-secondary hover:text-text transition-colors"
              aria-label="Fechar chat"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
