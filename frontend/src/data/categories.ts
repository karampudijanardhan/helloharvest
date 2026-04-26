import type { PowderCategory } from "./mockProducts";

export interface Category {
  id: string;
  name: string;
  slug: PowderCategory;
  description: string;
  image: string;
  productCount: number;
}

export const categories: Category[] = [
  {
    id: "cat1",
    name: "Leaf Powders",
    slug: "leaf",
    description:
      "Nutrient-rich leaf powders like moringa, spinach, mint, and curry leaves for daily wellness.",
    image:
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&h=400&fit=crop",
    productCount: 9,
  },
  {
    id: "cat2",
    name: "Fruit & Vegetable Powders",
    slug: "fruit-veg",
    description:
      "Natural fruit and vegetable powders like banana, beetroot, carrot, and tomato for healthy nutrition.",
    image:
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&h=400&fit=crop",
    productCount: 9,
  },
  {
    id: "cat3",
    name: "Spice Powders",
    slug: "spices",
    description:
      "Flavorful spice powders like garlic, ginger, lemon, and jaggery for cooking and health benefits.",
    image:
      "/garlic powder.png",
    productCount: 5,
  },
  {
    id: "cat4",
    name: "Millets",
    slug: "millets",
    description:
      "Healthy millet powders like ragi, jowar, bajra, and foxtail millet for balanced nutrition.",
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=400&fit=crop",
    productCount: 4,
  },
  {
    id: "cat5",
    name: "Honey",
    slug: "others",
    description:
      "Pure and natural honey varieties collected from trusted sources for better health and immunity.",
    image:
      "/IMG-20260426-WA0029.jpg",
    productCount: 2,
  },
  {
    id: "cat6",
    name: "Pickles",
    slug: "pickles",
    description:
      "Traditional homemade pickles including veg and non-veg varieties with authentic taste.",
    image:
      "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?w=400",
    productCount: 9,
  },
];