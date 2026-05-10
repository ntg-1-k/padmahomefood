import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { MENU_CATEGORIES, MENU_ITEMS } from "../data/menuData";
import type { MenuCategory } from "../types/menu";

const WHATSAPP_URL =
  "https://wa.me/919666817773?text=Hi!%20I%20want%20to%20order%20from%20Padma%20Home%20Food";

const ALL = "All" as const;
type FilterValue = typeof ALL | MenuCategory;

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<FilterValue>(ALL);

  const filtered =
    activeCategory === ALL
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section
      id="menu"
      data-ocid="menu.section"
      className="py-20 sm:py-28 bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
            Explore Our Kitchen
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Today's <span className="text-primary">Menu</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Fresh, authentic home-style meals prepared every day. Order via
            WhatsApp or Zomato.
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <div
          data-ocid="menu.filter_tabs"
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {[ALL, ...MENU_CATEGORIES].map((cat) => (
            <button
              key={cat}
              type="button"
              data-ocid={`menu.filter.${cat.toLowerCase().replace(/ /g, "_")}_tab`}
              onClick={() => setActiveCategory(cat as FilterValue)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-smooth border ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground border-primary shadow-glow"
                  : "bg-muted/30 text-muted-foreground border-border hover:bg-muted/60 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                data-ocid={`menu.item.${index + 1}`}
                className="glass-card rounded-2xl overflow-hidden group hover:border-primary/30 hover:-translate-y-1 transition-smooth"
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "/assets/images/placeholder.svg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
                  {/* Veg/Non-veg indicator */}
                  <div
                    className={`absolute top-3 left-3 w-5 h-5 rounded-sm border-2 flex items-center justify-center ${
                      item.isVeg
                        ? "border-green-500 bg-background/80"
                        : "border-red-500 bg-background/80"
                    }`}
                  >
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${
                        item.isVeg ? "bg-green-500" : "bg-red-500"
                      }`}
                    />
                  </div>
                  {item.isBestseller && (
                    <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs">
                      Bestseller
                    </Badge>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-display font-semibold text-foreground text-base mb-1 line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2 min-h-[2.4rem]">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-lg text-primary">
                      ₹{item.price}
                    </span>
                    <a
                      href={`${WHATSAPP_URL}%20-%20${encodeURIComponent(item.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-ocid={`menu.order_button.${index + 1}`}
                    >
                      <Button
                        size="sm"
                        className="bg-primary/90 hover:bg-primary text-primary-foreground text-xs transition-smooth"
                      >
                        Order
                      </Button>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="menu.whatsapp_order_button"
          >
            <Button
              size="lg"
              className="bg-[#25D366] hover:bg-[#1ebe5d] text-white gap-2 px-10 shadow-elevated transition-smooth hover:scale-105"
            >
              <Phone className="w-5 h-5" />
              Order Full Menu on WhatsApp
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
