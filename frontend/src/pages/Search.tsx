import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ProductGrid } from "@/components/product/ProductGrid";
import { mockProducts } from "@/data/mockProducts";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  const results = mockProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <section className="gradient-warm py-12">
        <div className="container max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <h1 className="font-display text-3xl font-bold text-center">Search Products</h1>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search pickles, powders, sweets..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-12 h-14 text-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container py-12">
        {query ? (
          <>
            <p className="text-muted-foreground mb-6">Found {results.length} results for "{query}"</p>
            <ProductGrid products={results} />
          </>
        ) : (
          <p className="text-center text-muted-foreground">Enter a search term to find products</p>
        )}
      </section>
    </div>
  );
};

export default SearchPage;
