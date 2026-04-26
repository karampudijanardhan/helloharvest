import { useState, useMemo } from "react";
import { Product, mockProducts } from "@/data/mockProducts";

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    return mockProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.badges.some((badge) => badge.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    hasResults: searchResults.length > 0,
  };
};
