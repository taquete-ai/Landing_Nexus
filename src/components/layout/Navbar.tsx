"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"

const NAV_LINKS = [
  { label: "Soluções",    href: "#solucoes" },
  { label: "Projetos",    href: "#projetos" },
  { label: "Tecnologias", href: "#tecnologias" },
  { label: "Contato",     href: "#contato" },
] as const

export function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const menuRef                   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false)
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [menuOpen])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    const target = document.querySelector(href)
    target?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[#141416] border-b border-[#2a2a2e]"
            : "bg-transparent border-b border-transparent",
        )}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">

          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
            className="flex items-center gap-2 group"
            aria-label="Nexus Labs — início"
          >
            {/* Mark: quadrado accent com "N" */}
            <span
              className="flex size-7 items-center justify-center bg-[#caff33] text-[#0c0c0e] transition-colors duration-200 group-hover:bg-[#b8e62e]"
              style={{ borderRadius: "4px", fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "13px" }}
              aria-hidden="true"
            >
              N
            </span>
            {/* Text */}
            <span
              className="font-display text-[15px] font-semibold tracking-tight text-[#e8e8e8]"
            >
              Nexus<span className="text-[#555559] font-normal"> Labs</span>
            </span>
          </a>

          {/* Links desktop */}
          <ul className="hidden items-center gap-8 md:flex" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="font-body text-sm text-[#555559] transition-colors duration-200 hover:text-[#e8e8e8]"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* CTA desktop */}
          <div className="hidden items-center md:flex">
            <button
              onClick={() => handleNavClick("#contato")}
              className="inline-flex h-9 items-center gap-2 bg-[#caff33] px-5 font-body text-sm font-semibold text-[#0c0c0e] transition-all duration-200 hover:bg-[#b8e62e] active:scale-[0.98]"
              style={{ borderRadius: "6px" }}
            >
              Falar com a Nexus
            </button>
          </div>

          {/* Hamburguer mobile */}
          <button
            className="flex size-9 items-center justify-center text-[#555559] transition-colors duration-200 hover:text-[#e8e8e8] md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </header>

      {/* Menu mobile overlay */}
      <div
        ref={menuRef}
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-[#0c0c0e] pt-16 transition-all duration-300 md:hidden",
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
        aria-hidden={!menuOpen}
      >
        <div className="flex flex-1 flex-col border-t border-[#2a2a2e] px-6 pt-8">
          {NAV_LINKS.map((link, i) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="group flex w-full items-center justify-between border-b border-[#1e1e22] py-5 text-left transition-colors duration-200"
            >
              {/* Index mono */}
              <span className="font-mono text-xs text-[#555559] group-hover:text-[#caff33] transition-colors duration-200">
                0{i + 1}
              </span>
              {/* Label display */}
              <span className="font-display text-2xl font-bold tracking-tight text-[#e8e8e8] group-hover:text-[#caff33] transition-colors duration-200">
                {link.label}
              </span>
            </button>
          ))}

          <div className="pt-8">
            <button
              onClick={() => handleNavClick("#contato")}
              className="w-full bg-[#caff33] py-4 font-body font-semibold text-[#0c0c0e] transition-colors duration-200 hover:bg-[#b8e62e]"
              style={{ borderRadius: "6px" }}
            >
              Falar com a Nexus
            </button>
          </div>
        </div>

        {/* Rodapé do menu mobile */}
        <div className="px-6 pb-8">
          <p className="font-mono text-xs text-[#555559]">
            NEXUS<span className="text-[#caff33]">LABS</span> · AI SYSTEMS
          </p>
        </div>
      </div>
    </>
  )
}
