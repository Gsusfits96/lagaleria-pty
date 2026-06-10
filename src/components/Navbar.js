"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/galeria", label: "Galería" },
    { href: "/artistas", label: "Artistas" },
    { href: "/contacto", label: "Contacto" },
  ];

  return (
    <>
      <nav
        className="navbar"
        style={{
          background: scrolled
            ? "rgba(255, 255, 255, 0.95)"
            : "rgba(255, 255, 255, 0.6)",
          borderBottomColor: scrolled
            ? "rgba(0, 0, 0, 0.06)"
            : "transparent",
        }}
      >
        <div className="navbar-inner">
          <Link href="/" className="navbar-logo" id="navbar-logo">
            La Galería <span>PTY</span>
          </Link>

          <ul className="navbar-links" id="navbar-links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  style={{
                    color:
                      pathname === link.href
                        ? "var(--color-text-primary)"
                        : undefined,
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            className={`navbar-toggle ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú de navegación"
            id="navbar-toggle"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`} id="mobile-menu">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </div>
    </>
  );
}
