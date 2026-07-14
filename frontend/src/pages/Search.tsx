import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ProductGrid } from "@/components/product/ProductGrid";
import { mockProducts } from "@/data/mockProducts";
import { SearchSuggestions } from "@/components/search/SearchSuggestions";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleTouch = (e: TouchEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        inputRef.current.blur();
      }
    };

    document.addEventListener("touchstart", handleTouch);

    return () => {
      document.removeEventListener("touchstart", handleTouch);
    };
  }, []);

  const results = mockProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">

      {/* SEARCH HEADER */}
      <section className="gradient-warm py-8 md:py-12">
        <div className="container max-w-2xl">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >

            <h1 className="font-display text-2xl md:text-3xl font-bold text-center">
              Search Products
            </h1>

            <div className="relative">

              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />

              <Input
                ref={inputRef}
                autoFocus
                type="search"
                placeholder="Search pickles, powders, sweets..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    inputRef.current?.blur();
                  }
                }}
                className="pl-12 h-14 text-lg rounded-full"
              />
              

            </div>
             <SearchSuggestions
    query={query}
    onSelect={(value) => {
      setQuery(value);
      inputRef.current?.focus();
    }}
  />

          </motion.div>

        </div>
      </section>

      {/* RESULTS */}
      <section
        className="container py-8 md:py-12"
        onClick={() => inputRef.current?.blur()}
        onTouchStart={() => inputRef.current?.blur()}
      >

        {query ? (
          results.length > 0 ? (
            <>
              <p className="text-muted-foreground mb-6">
                Found{" "}
                <span className="font-semibold">{results.length}</span>{" "}
                results for{" "}
                <span className="font-semibold">"{query}"</span>
              </p>

              <ProductGrid products={results} />
            </>
          ) : (
            <p className="text-center text-muted-foreground text-lg">
              ❌ No products found for <strong>"{query}"</strong>
            </p>
          )
        ) : (
          <p className="text-center text-muted-foreground text-lg">
            🔍 Start typing to search products
          </p>
        )}

      </section>

    </div>
  );
};

export default SearchPage;