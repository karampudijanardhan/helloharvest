import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Truck, Shield, Heart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductGrid } from "@/components/product/ProductGrid";
import { mockProducts } from "@/data/mockProducts";
import { categories } from "@/data/categories";

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const featuredProducts = mockProducts
    .filter((p) => p.badges.includes("Bestseller"))
    .slice(0, 4);

  const newArrivals = mockProducts.slice(0, 8);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="min-h-screen">
      
              {/* ✅ MOBILE SEARCH (only on small screens) */}
              <form onSubmit={handleSearch} className="mt-5 w-full max-w-md md:hidden">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search healthy powders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-10 rounded-full w-full"
                  />
                </div>
              </form>
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-warm">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-primary blur-3xl" />
          <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-secondary blur-3xl" />
        </div>

        <div className="container relative py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-600/10 text-green-400 text-sm font-medium backdrop-blur-sm">
                <Sparkles className="w-4 h-4" />
                100% Natural • No Preservatives
              </div>

              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Pure <span>Natural</span> Powders, <span>Crafted</span> for Wellness
              </h1>

              <p className="text-lg text-muted-foreground max-w-xl">
                Healthy powders made from organically sourced greens, roots, fruits and millets —
                clean nutrition for every home, with zero preservatives and zero compromise.
              </p>

              {/* ✅ MOBILE SEARCH (only on small screens) */}
              <form onSubmit={handleSearch} className="mt-2 w-full max-w-md md:hidden">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search healthy powders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-10 rounded-full w-full"
                  />
                </div>
              </form>

              <div className="flex flex-wrap gap-4">
                <Link to="/products">
                  <Button
                    size="lg"
                    className="bg-green-700 hover:bg-green-500 text-white gap-2 transition-all duration-300"
                  >
                    Shop Now
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>

                <Link to="/offers">
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white transition-all duration-300"
                  >
                    Today's Offers
                  </Button>
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-6 pt-6">
                {[
                  { icon: Truck, text: "Free Delivery ₹599+" },
                  { icon: Shield, text: "100% Natural" },
                  { icon: Heart, text: "No Preservatives" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon className="w-5 h-5 text-primary" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 rounded-full gradient-saffron opacity-20 blur-3xl animate-pulse" />
                <img
                  src="https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&h=600&fit=crop"
                  alt="Natural healthy powders"
                  className="relative w-full h-full object-cover rounded-3xl shadow-2xl"
                />

                {/* Floating badges */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -left-4 top-1/4 bg-card px-4 py-3 rounded-xl shadow-lg"
                >
                  <p className="font-display font-bold text-lg">50+</p>
                  <p className="text-xs text-muted-foreground">Products</p>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="absolute -right-4 bottom-1/4 bg-card px-4 py-3 rounded-xl shadow-lg"
                >
                  <p className="font-display font-bold text-lg">4.9★</p>
                  <p className="text-xs text-muted-foreground">Rating</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Shop by Category
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our curated range of natural, organic powders
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/category/${category.slug}`}>
                  <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-shadow">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-cream">
                      <h3 className="font-display text-2xl font-bold mb-1">{category.name}</h3>
                      <p className="text-sm opacity-80 line-clamp-2">{category.description}</p>
                      <p className="text-primary mt-2 font-medium text-sm">
                        {category.productCount} Products →
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 gradient-warm">
        <div className="container">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground">Bestsellers</h2>
              <p className="text-muted-foreground">Our most loved healthy powders</p>
            </div>
            <Link to="/products">
              <Button variant="outline" className="gap-2">
                View All <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Helloharvest Purepowders?
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🌱",
                title: "100% Natural",
                description: "Sourced from clean farms and processed with care",
              },
              {
                icon: "🌿",
                title: "No Preservatives",
                description: "Pure ingredients, no artificial additives or chemicals",
              },
              {
                icon: "💪",
                title: "Daily Nutrition",
                description: "Benefit-rich powders to power your everyday wellness",
              },
              {
                icon: "🚚",
                title: "Fast Delivery",
                description: "Fresh powders delivered right to your doorstep",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card p-6 rounded-xl shadow-card text-center"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-display font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOM & BULK SECTION */}
      <section className="py-12 gradient-warm">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card rounded-xl shadow-card p-6 flex items-start gap-4 hover:shadow-hover transition-all">
              <div className="text-3xl">🎨</div>
              <div>
                <h3 className="font-display text-xl font-semibold text-foreground">
                  Customized Orders Available
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  We offer customized powders based on your requirements — including special blends, packaging, and quantity options.
                </p>
              </div>
            </div>

            <div className="bg-card rounded-xl shadow-card p-6 flex items-start gap-4 hover:shadow-hover transition-all">
              <div className="text-3xl">📦</div>
              <div>
                <h3 className="font-display text-xl font-semibold text-foreground">
                  Bulk Orders Accepted
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  We supply bulk quantities for shops, businesses, and resellers at competitive pricing with consistent quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 gradient-warm">
        <div className="container">
          <ProductGrid
            products={newArrivals}
            title="New Arrivals"
            description="Discover our latest healthy powder additions"
          />
          <div className="text-center mt-8">
            <Link to="/products">
              <Button
                size="lg"
                className="bg-green-700 hover:bg-green-500 text-white gap-2 transition-all duration-300"
              >
                View All Products
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;