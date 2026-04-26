import { motion } from "framer-motion";
import { MapPin, Phone, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { stores } from "@/data/stores";

const FindStore = () => (
  <div className="min-h-screen bg-background">
    <section className="gradient-warm py-12">
      <div className="container text-center">
        <h1 className="font-display text-4xl font-bold mb-4">Find a Store</h1>
        <p className="text-muted-foreground">Visit us at any of our locations</p>
      </div>
    </section>

    <section className="container py-12">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores.map((store, i) => (
          <motion.div
            key={store.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-xl p-6 shadow-card space-y-4"
          >
            <div>
              <h3 className="font-display font-semibold text-lg">{store.name}</h3>
              <p className="text-sm text-primary">{store.city}</p>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="flex items-start gap-2"><MapPin className="w-4 h-4 shrink-0 mt-0.5" />{store.address}</p>
              <p className="flex items-center gap-2"><Phone className="w-4 h-4" />{store.phone}</p>
              <p className="flex items-center gap-2"><Clock className="w-4 h-4" />{store.openHours}</p>
            </div>
            <a href={store.mapLink} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="w-full gap-2">
                <ExternalLink className="w-4 h-4" />Open in Google Maps
              </Button>
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  </div>
);

export default FindStore;
