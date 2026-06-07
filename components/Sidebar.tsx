"use client";

import { useEffect, useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  User,
  Briefcase,
  Code2,
  FolderOpen,
  Phone,
} from "lucide-react";

const navItems = [
  { id: "about", label: "About", icon: User },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "contact", label: "Contact", icon: Phone },
];

export default function Sidebar() {
  const [active, setActive] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -65% 0px" }
    );
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
    setMenuOpen(false);
  };

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-56 border-r border-border bg-surface flex-col p-6 z-40">
        {/* Avatar + name */}
        <div className="mb-8">
          <div className="w-16 h-16 rounded-full bg-muted mb-4 flex items-center justify-center text-base font-semibold text-bg select-none">
            AS
          </div>
          <p className="text-sm font-semibold text-text leading-snug">
            Aadith S
          </p>
          <p className="text-xs text-muted mt-0.5">Backend Software Engineer</p>
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-4 mb-8">
          <a
            href="https://linkedin.com/in/aadith-s"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-text transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={14} />
          </a>
          <a
            href="https://github.com/AadithS13"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-text transition-colors"
            aria-label="GitHub"
          >
            <Github size={14} />
          </a>
          <a
            href="mailto:aadithsuresh10@gmail.com"
            className="text-muted hover:text-text transition-colors"
            aria-label="Email"
          >
            <Mail size={14} />
          </a>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-0.5">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`flex items-center gap-2.5 px-3 py-2 rounded text-xs w-full text-left transition-colors ${
                active === id
                  ? "bg-border text-text"
                  : "text-muted hover:text-subtle hover:bg-border/40"
              }`}
            >
              <Icon size={13} className="flex-shrink-0" />
              {label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 h-12 border-b border-border bg-surface/95 backdrop-blur-sm px-5 flex items-center justify-between">
        <span className="text-xs font-mono text-text">Aadith S</span>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-xs font-mono text-muted"
        >
          {menuOpen ? "close" : "menu"}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden fixed top-12 left-0 right-0 z-40 bg-surface border-b border-border">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="flex items-center gap-3 w-full text-left text-sm text-subtle px-5 py-3 border-b border-border last:border-0 hover:text-text transition-colors"
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
