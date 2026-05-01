import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const comboOffers = [
  {
    id: 1,
    title: "Immunity Combo",
    products: ["Moringa Powder", "Turmeric Powder", "Amla Powder"],
    price: 499,
    original: 650,
    image: "/combo1.jpg",
  },
  {
    id: 2,
    title: "Weight Loss Combo",
    products: ["Green Tea Powder", "Flax Seeds Powder", "Millet Mix"],
    price: 599,
    original: 799,
    image: "/combo2.jpg",
  },
  {
    id: 3,
    title: "Daily Nutrition Combo",
    products: ["Ragi Powder", "Dry Fruits Powder", "Sprouts Mix"],
    price: 699,
    original: 950,
    image: "/combo3.jpg",
  },
];

const Offers = () => {
  return (
    <div className="min-h-screen bg-background">

      {/* HEADER */}
      <section className="gradient-warm py-12 text-center">
        <h1 className="font-display text-4xl font-bold mb-2">
          Combo Offers 🔥
        </h1>
        <p className="text-muted-foreground">
          Save more with our specially curated combo packs
        </p>
      </section>

      {/* COMBO CARDS */}
      <section className="container py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {comboOffers.map((combo, i) => {
            const discount = Math.round(
              ((combo.original - combo.price) / combo.original) * 100
            );

            return (
              <motion.div
                key={combo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl shadow-card overflow-hidden hover:shadow-lg transition"
              >

                {/* IMAGE */}
                <img
                  src={combo.image}
                  alt={combo.title}
                  className="w-full h-44 object-cover"
                />

                {/* CONTENT */}
                <div className="p-5 space-y-3">

                  <Badge className="bg-green-600 text-white">
                    {discount}% OFF
                  </Badge>

                  <h3 className="font-display text-lg font-semibold">
                    {combo.title}
                  </h3>

                  {/* PRODUCTS LIST */}
                  <ul className="text-sm text-muted-foreground list-disc pl-4">
                    {combo.products.map((p, index) => (
                      <li key={index}>{p}</li>
                    ))}
                  </ul>

                  {/* PRICE */}
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold">
                      ₹{combo.price}
                    </span>
                    <span className="line-through text-gray-400 text-sm">
                      ₹{combo.original}
                    </span>
                  </div>

                  {/* BUTTON */}
                  <Button className="w-full bg-green-700 hover:bg-green-500 text-white">
                    Add Combo to Cart
                  </Button>

                </div>

              </motion.div>
            );
          })}

        </div>
      </section>

    </div>
  );
};

export default Offers;