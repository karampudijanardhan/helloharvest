import { useState, useMemo } from "react";
import { Product, mockProducts, PowderCategory } from "@/data/mockProducts";

export type SortOption = "default" | "price-low" | "price-high" | "rating" | "name";
export type SpiceLevel = "all" | "mild" | "medium" | "hot";
export type CategoryFilter = "all" | PowderCategory;
export type WeightFilter = "all" | "100g" | "250g" | "500g";

interface FilterState {
  category: CategoryFilter;
  spiceLevel: SpiceLevel;
  weight: WeightFilter;
  inStockOnly: boolean;
  sortBy: SortOption;
  priceRange: [number, number];
}

const initialState: FilterState = {
  category: "all",
  spiceLevel: "all",
  weight: "all",
  inStockOnly: false,
  sortBy: "default",
  priceRange: [0, 1000],
};

export const useFilter = (products: Product[] = mockProducts) => {
  const [filters, setFilters] = useState<FilterState>(initialState);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (filters.category !== "all") {
      result = result.filter((p) => p.category === filters.category);
    }

    // Spice level filter
    if (filters.spiceLevel !== "all") {
      result = result.filter((p) => p.spiceLevel === filters.spiceLevel);
    }

    // Weight filter
    if (filters.weight !== "all") {
      result = result.filter((p) => p.weightOptions.includes(filters.weight));
    }

    // In stock filter
    if (filters.inStockOnly) {
      result = result.filter((p) => p.stock > 0);
    }

    // Price range filter (using 250g price as base)
    result = result.filter((p) => {
      const basePrice = p.prices["100g"] ?? p.prices["250g"];
      return basePrice >= filters.priceRange[0] && basePrice <= filters.priceRange[1];
    });

    // Sorting
    switch (filters.sortBy) {
      case "price-low":
        result.sort((a, b) => (a.prices["100g"] ?? a.prices["250g"]) - (b.prices["100g"] ?? b.prices["250g"]));
        break;
      case "price-high":
        result.sort((a, b) => (b.prices["100g"] ?? b.prices["250g"]) - (a.prices["100g"] ?? a.prices["250g"]));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [products, filters]);

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(initialState);
  };

  return {
    filters,
    filteredProducts,
    updateFilter,
    resetFilters,
    totalProducts: products.length,
    filteredCount: filteredProducts.length,
  };
};
