"use client";

import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import NavLink from "@/app/components/NavLink";
import { NAV_LINKS } from "@/app/hooks/constants";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 md:hidden z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end items-center p-4">
          <button
            aria-label="Close menu"
            onClick={onClose}
            className="text-gray-700 hover-primary"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col justify-end gap-2 p-6">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.name}
              href={link.href}
              isActive={pathname === link.href}
              onClick={onClose}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={onClose}
        />
      )}
    </>
  );
}
