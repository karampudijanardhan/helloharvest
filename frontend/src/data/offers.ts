export interface Offer {
  id: string;
  title: string;
  description: string;
  code: string;
  discount: string;
  validTill: string;
  minOrder: number;
  image: string;
}

export const offers: Offer[] = [
  {
    id: "offer1",
    title: "First Order Special",
    description: "Get 20% off on your first order! Valid on all products.",
    code: "FIRST20",
    discount: "20%",
    validTill: "2024-12-31",
    minOrder: 299,
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&h=300&fit=crop",
  },
  {
    id: "offer2",
    title: "Pickle Festival",
    description: "Buy 2 pickles and get 1 free! Mix and match any variety.",
    code: "PICKLE3",
    discount: "Buy 2 Get 1",
    validTill: "2024-12-15",
    minOrder: 500,
    image: "https://images.unsplash.com/photo-1589647363585-f4a7d3877b10?w=600&h=300&fit=crop",
  },
  {
    id: "offer3",
    title: "Sweet Diwali Combo",
    description: "Festive combo pack with assorted sweets at 15% off.",
    code: "DIWALI15",
    discount: "15%",
    validTill: "2024-11-30",
    minOrder: 999,
    image: "https://images.unsplash.com/photo-1666190053309-25f2c7e0ba15?w=600&h=300&fit=crop",
  },
  {
    id: "offer4",
    title: "Free Shipping",
    description: "Free shipping on orders above ₹599. No code needed!",
    code: "AUTO",
    discount: "Free Shipping",
    validTill: "2024-12-31",
    minOrder: 599,
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&h=300&fit=crop",
  },
  {
    id: "offer5",
    title: "Weekend Special",
    description: "Extra 10% off on all powders every Saturday & Sunday.",
    code: "WEEKEND10",
    discount: "10%",
    validTill: "2024-12-31",
    minOrder: 199,
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&h=300&fit=crop",
  },
];
