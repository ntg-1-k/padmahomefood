import { Button } from "@/components/ui/button";
import { Clock, ExternalLink, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";

const WHATSAPP_URL =
  "https://wa.me/919666817773?text=Hi!%20I%20want%20to%20order%20from%20Padma%20Home%20Food";
const ZOMATO_URL = "https://www.zomato.com/hyderabad";
const MAP_URL =
  "https://maps.google.com/?q=Shiva+Sai+Enclave,+Nagaram,+Secunderabad";

const INFO_ITEMS = [
  {
    icon: MapPin,
    label: "Address",
    value: "75, 1st Floor, Shiva Sai Enclave,\nNagaram, Secunderabad",
    href: MAP_URL,
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 96668 17773",
    href: "tel:+919666817773",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Breakfast 7AM – 11AM\nDinner 7PM – 10PM",
    href: null,
  },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      data-ocid="contact.section"
      className="py-20 sm:py-28 bg-muted/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
            Reach Us
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Get in <span className="text-primary">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Delivery only. Order online via WhatsApp or Zomato. We deliver fresh
            to your door.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {INFO_ITEMS.map((info, i) => (
            <motion.div
              key={info.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 text-center"
              data-ocid={`contact.info_card.${i + 1}`}
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <info.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">
                {info.label}
              </h3>
              {info.href ? (
                <a
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid={`contact.${info.label.toLowerCase()}_link`}
                  className="text-sm text-muted-foreground hover:text-primary transition-smooth whitespace-pre-line"
                >
                  {info.value}
                </a>
              ) : (
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {info.value}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Order CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="contact.whatsapp_button"
          >
            <Button
              size="lg"
              className="bg-[#25D366] hover:bg-[#1ebe5d] text-white gap-2 px-8 shadow-elevated transition-smooth hover:scale-105 active:scale-95"
            >
              <Phone className="w-5 h-5" />
              Order on WhatsApp
            </Button>
          </a>
          <a
            href={ZOMATO_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="contact.zomato_button"
          >
            <Button
              size="lg"
              variant="outline"
              className="border-primary/50 text-primary hover:bg-primary/10 gap-2 px-8 transition-smooth hover:scale-105"
            >
              <ExternalLink className="w-4 h-4" />
              Find Us on Zomato
            </Button>
          </a>
        </motion.div>

        {/* FSSAI */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs text-muted-foreground/60 mt-10"
        >
          FSSAI Lic. No. 23626029001463
        </motion.p>
      </div>
    </section>
  );
}
