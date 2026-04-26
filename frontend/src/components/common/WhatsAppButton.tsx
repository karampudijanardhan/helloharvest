import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { openWhatsAppChat } from "@/utils/whatsapp";

export const WhatsAppButton = () => {
  return (
    <motion.button
      onClick={() => openWhatsAppChat()}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-12 right-6 mb-8 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center "
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 fill-current" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-accent animate-pulse"
      />
    </motion.button>
  );
};
