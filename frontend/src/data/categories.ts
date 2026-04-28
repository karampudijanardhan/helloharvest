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
      "Pure green leaf powders like moringa, spinach, mint, and curry leaves — rich in nutrients for daily health and wellness.",
    image:
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&h=400&fit=crop",
    productCount: 9,
  },
  {
    id: "cat2",
    name: "Fruit & Veg Powders",
    slug: "fruit-veg",
    description:
      "Natural fruit and vegetable powders like banana, beetroot, carrot, and tomato — perfect for clean nutrition and energy.",
    image:
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&h=400&fit=crop",
    productCount: 9,
  },
  {
    id: "cat3",
    name: "Spice Powders",
    slug: "spices",
    description:
      "Fresh and aromatic spice powders like garlic, ginger, and lemon — enhancing taste while supporting healthy living.",
    image:
      "/garlic powder.png",
    productCount: 5,
  },
  {
    id: "cat4",
    name: "Millets",
    slug: "millets",
    description:
      "Wholesome millet powders like ragi, jowar, and bajra — traditional grains packed with fiber and nutrition.",
    image:
      "/image.png",
    productCount: 4,
  },
  {
    id: "cat5",
    name: "Natural Honey",
    slug: "others",
    description:
      "Pure, raw honey sourced from trusted farms — rich in antioxidants and perfect for boosting immunity naturally.",
    image:
      "/IMG-20260426-WA0029.jpg",
    productCount: 2,
  },
  {
    id: "cat6",
    name: "Traditional Pickles",
    slug: "pickles",
    description:
      "Authentic homemade pickles with rich flavors — crafted using traditional recipes for a true taste experience.",
    image:
      "/image (1).png",
    productCount: 9,
  },
];