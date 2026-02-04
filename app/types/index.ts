import type { ReactNode } from "react";

export type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export type NavLinkProps = {
  href: string;
  children: ReactNode;
  isActive?: boolean;
  className?: string;
  onClick?: () => void;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  featured?: boolean;
};

export type CartItem = {
  product: Product;
  quantity: number;
};