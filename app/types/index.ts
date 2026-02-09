import { StaticImport } from "next/dist/shared/lib/get-img-props";
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

// Database types
export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string | null; 
  description: string | null;
  category: string | null;
  featured: boolean;
  created_at?: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type AdminUser = {
  id: string;
  user_id: string;
  email: string;
  created_at: string;
};

export type User = {
  id: string;
  email?: string;
};

// Form types
export type ProductFormData = {
  slug: string;
  name: string;
  price: string;
  description: string;
  category: string;
  featured: boolean;
};

export type ProductFormProps = {
  initialData?: Product;
  onSubmit: (formData: ProductFormData, imageFile: File | null) => Promise<void>;
  loading: boolean;
  submitLabel?: string;
};

// Page props types
export type PageProps<T = {}> = {
  params: Promise<T>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export type ProductPageParams = {
  id: string;
};

export type ProductSlugParams = {
  slug: string;
};

// Context types
export type AdminAuthContextType = {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  checkAdminStatus: () => Promise<boolean>;
};

// Component prop types
export type ImageUploadProps = {
  currentImage: string | null;
  preview: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
};

export type ProductTableProps = {
  products: Product[];
  loading: boolean;
  onDelete: (id: string, imageUrl: string | null) => void;
};

export type AdminHeaderProps = {
  onLogout: () => void;
};