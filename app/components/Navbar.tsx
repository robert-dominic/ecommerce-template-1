"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import NavLink from "./NavLink";
import MobileMenu from "./MobileMenu";
import NavbarCartCount from "./NavbarCartCount";
import { NAV_LINKS } from "@/app/hooks/constants";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
              <span className="logo-text text-xl md:text-2xl uppercase">OTAKU</span>
            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-2">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.name}
                  href={link.href}
                  isActive={pathname === link.href}
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* Cart & Hamburger */}
            <div className="flex items-center gap-4">
              {/* Cart Icon */}
              <NavbarCartCount />

              {/* Hamburger Menu (Mobile) */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden text-primary"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
      />
    </>
  );
}
