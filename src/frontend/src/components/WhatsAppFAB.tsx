import { MessageCircle } from "lucide-react";
import { motion } from "motion/react";

const WHATSAPP_URL =
  "https://wa.me/919666817773?text=Hi%20Padma%20Home%20Food%2C%20I%20want%20to%20order";

export default function WhatsAppFAB() {
  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      data-ocid="whatsapp_fab"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 md:hidden flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-elevated"
      style={{ boxShadow: "0 4px 24px #25D36666" }}
    >
      {/* pulse ring */}
      <span
        className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping"
        aria-hidden="true"
      />
      <MessageCircle className="w-7 h-7 text-white relative z-10" />
    </motion.a>
  );
}
