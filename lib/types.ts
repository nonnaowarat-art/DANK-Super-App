export interface Product {
  id: string;
  handle: string;
  name: string;
  description: string;
  price: number;
  category: string;
  grade: string;
  imageUrl: string | null;
  tags: string;
  stock: number;
  strainType: string | null;
  thc: number | null;
  cbd: number | null;
  featured: boolean;
  createdAt: Date;
  variants: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  productId: string;
  label: string;
  price: number;
}

export interface CartItem {
  product: Product;
  variant: ProductVariant | null;
  quantity: number;
}

export const GRADES = [
  "Super Exotic",
  "Exotic",
  "Top Shelf",
  "Mid Grade",
] as const;

export const CATEGORIES = [
  "Flower",
  "Edibles",
  "Vapes",
  "Concentrates",
  "Accessories",
  "Merch",
] as const;

export const STRAINS = ["Sativa", "Indica", "Hybrid"] as const;

export const GRADE_COLORS: Record<string, string> = {
  "Super Exotic": "text-purple-400 bg-purple-400/10 border-purple-400/30",
  Exotic: "text-amber-400 bg-amber-400/10 border-amber-400/30",
  "Top Shelf": "text-dank-green bg-dank-green/10 border-dank-green/30",
  "Mid Grade": "text-sky-400 bg-sky-400/10 border-sky-400/30",
};

export const STRAIN_COLORS: Record<string, string> = {
  Sativa: "text-orange-400",
  Indica: "text-purple-400",
  Hybrid: "text-green-400",
};
