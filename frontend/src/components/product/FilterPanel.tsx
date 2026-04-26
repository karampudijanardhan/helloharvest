import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  CategoryFilter,
  SpiceLevel,
  SortOption,
  WeightFilter,
} from "@/hooks/useFilter";

interface Filters {
  category: CategoryFilter;
  spiceLevel: SpiceLevel;
  weight: WeightFilter;
  inStockOnly: boolean;
  sortBy: SortOption;
  priceRange: [number, number];
}

interface FilterPanelProps {
  filters: Filters;
  updateFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  resetFilters: () => void;
  filteredCount: number;
  totalProducts: number;
  onClose?: () => void;
}

export const FilterPanel = ({
  filters,
  updateFilter,
  resetFilters,
  filteredCount,
  totalProducts,
  onClose,
}: FilterPanelProps) => {
  return (
    <div className="bg-card rounded-xl p-6 shadow-card space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-lg">Filters</h3>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            Reset
          </Button>
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Showing {filteredCount} of {totalProducts} products
      </p>

      {/* Sort */}
      <div className="space-y-2">
        <Label>Sort By</Label>
        <Select
          value={filters.sortBy}
          onValueChange={(value) => updateFilter("sortBy", value as SortOption)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="name">Name A-Z</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label>Category</Label>
        <Select
          value={filters.category}
          onValueChange={(value) =>
            updateFilter("category", value as CategoryFilter)
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="leaf">Leaf Powders</SelectItem>
            <SelectItem value="fruit-veg">Fruit & Veg Powders</SelectItem>
            <SelectItem value="spices">Spice Powders</SelectItem>
            <SelectItem value="millets">Millets</SelectItem>
            <SelectItem value="others">Honey</SelectItem>
            <SelectItem value="pickles">Pickles</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Intensity */}
      <div className="space-y-2">
        <Label>Intensity</Label>
        <Select
          value={filters.spiceLevel}
          onValueChange={(value) =>
            updateFilter("spiceLevel", value as SpiceLevel)
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="mild">Mild</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hot">Hot</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Weight (FINAL FIX) */}
      <div className="space-y-2">
        <Label>Weight</Label>
        <Select
          value={filters.weight}
          onValueChange={(value) =>
            updateFilter("weight", value as WeightFilter)
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Weights</SelectItem>
            <SelectItem value="100g">100g</SelectItem>
            <SelectItem value="200g">200g</SelectItem>
            <SelectItem value="250g">250g</SelectItem>
            <SelectItem value="500g">500g</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Price */}
      <div className="space-y-4">
        <div className="flex justify-between">
          <Label>Price Range</Label>
          <span className="text-sm text-muted-foreground">
            ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
          </span>
        </div>
        <Slider
          value={filters.priceRange}
          onValueChange={(value) =>
            updateFilter("priceRange", value as [number, number])
          }
          min={0}
          max={1000}
          step={50}
        />
      </div>

      {/* Stock */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="inStock"
          checked={filters.inStockOnly}
          onCheckedChange={(checked) =>
            updateFilter("inStockOnly", !!checked)
          }
        />
        <label htmlFor="inStock" className="text-sm cursor-pointer">
          In Stock Only
        </label>
      </div>

    </div>
  );
};