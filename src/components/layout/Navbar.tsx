"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"

const NAV_LINKS = [
  { label: "Soluções", href: "#solucoes" },
  { label: "Projetos", href: "#projetos" },
  { label: "Tecnologias", href: "#tecnologias" },
  { label: "Contato", href: "#contato" },
] as const

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

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
            ? "bg-[#111111] border-b border-[#1e1e1e]"
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
            className="flex items-center gap-0.5 font-display text-lg font-bold tracking-tight"
            aria-label="Nexus Labs — início"
          >
            <span className="text-[#f5f5f5]">NEXUS</span>
            <span className="text-[#caff33]">LABS</span>
          </a>

          {/* Links desktop */}
          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="font-body text-sm text-[#6b6b6b] transition-colors duration-200 hover:text-[#f5f5f5]"
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
              className="inline-flex h-9 items-center gap-2 bg-[#caff33] px-5 text-sm font-semibold text-[#0a0a0a] transition-all duration-200 hover:bg-[#a8d400] active:scale-[0.98]"
              style={{ borderRadius: "0.375rem" }}
            >
              Falar com a Nexus
            </button>
          </div>

          {/* Hamburguer mobile */}
          <button
            className="flex size-9 items-center justify-center text-[#6b6b6b] transition-colors duration-200 hover:text-[#f5f5f5] md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>

      {/* Menu mobile overlay */}
      <div
        ref={menuRef}
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-[#0a0a0a] pt-16 transition-all duration-300 md:hidden",
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
        aria-hidden={!menuOpen}
      >
        <div className="flex flex-1 flex-col gap-1 border-t border-[#1e1e1e] px-6 pt-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="w-full border-b border-[#1e1e1e] py-5 text-left font-display text-2xl font-bold tracking-tight text-[#f5f5f5] transition-colors duration-200 hover:text-[#caff33]"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-8">
            <button
              onClick={() => handleNavClick("#contato")}
              className="w-full bg-[#caff33] py-4 font-semibold text-[#0a0a0a] transition-colors duration-200 hover:bg-[#a8d400]"
              style={{ borderRadius: "0.375rem" }}
            >
              Falar com a Nexus
            </button>
          </div>
        </div>

        {/* Rodapé do menu */}
        <div className="px-6 pb-8">
          <p className="font-mono text-xs text-[#6b6b6b]">
            NEXUS<span className="text-[#caff33]">LABS</span> AI SYSTEMS
          </p>
        </div>
      </div>
    </>
  )
}
