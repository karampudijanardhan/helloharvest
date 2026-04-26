import { motion } from "framer-motion";
import { offers } from "@/data/offers";
import { Badge } from "@/components/ui/badge";

const Offers = () => (
  <div className="min-h-screen bg-background">
    <section className="gradient-hero py-12 text-primary-foreground">
      <div className="container text-center">
        <h1 className="font-display text-4xl font-bold mb-4">Special Offers</h1>
        <p className="opacity-90">Grab the best deals on your favorite products</p>
      </div>
    </section>

    <section className="container py-12">
      <div className="grid md:grid-cols-2 gap-6">
        {offers.map((offer, i) => (
          <motion.div
            key={offer.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-xl overflow-hidden shadow-card"
          >
            <img src={offer.image} alt={offer.title} className="w-full h-40 object-cover" />
            <div className="p-6 space-y-3">
              <Badge className="gradient-saffron">{offer.discount}</Badge>
              <h3 className="font-display font-semibold text-xl">{offer.title}</h3>
              <p className="text-sm text-muted-foreground">{offer.description}</p>
              <div className="flex justify-between text-sm">
                <span className="font-mono bg-muted px-3 py-1 rounded">Code: {offer.code}</span>
                <span className="text-muted-foreground">Min. ₹{offer.minOrder}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  </div>
);

export default Offers;
