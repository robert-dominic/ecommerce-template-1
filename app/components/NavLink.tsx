import Link from "next/link";
import type { NavLinkProps } from "@/app/types";

export default function NavLink({ 
  href, 
  children, 
  isActive,
  className = "",
  onClick,
}: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`px-4 py-2 transition-colors rounded-md hover-primary font-medium ${
        isActive ? "text-primary font-semibold" : "text-gray-600"
      } ${className}`}
    >
      {children}
    </Link>
  );
}