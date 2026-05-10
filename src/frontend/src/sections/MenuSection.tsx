import { Search, ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { MENU_CATEGORIES, MENU_ITEMS } from "../data/menuData";
import type { MenuCategory, MenuItem } from "../types/menu";

const ALL = "All" as const;
const TABS = [ALL, ...MENU_CATEGORIES] as const;
type FilterValue = typeof ALL | MenuCategory;

const FALLBACK =
  "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600&auto=format&fit=crop";

function ItemCard({ item, index }: { item: MenuItem; index: number }) {
  const [imgSrc, setImgSrc] = useState(item.imageUrl);

  return (
    <motion.article
      data-ocid={`menu.item.${index + 1}`}
      className="glass-card rounded-xl overflow-hidden group cursor-pointer flex flex-col"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.07 }}
      whileHover={{ scale: 1.03, boxShadow: "0 24px 48px oklch(0 0 0 / 0.45)" }}
    >
      {/* image */}
      <div className="relative h-44 sm:h-52 overflow-hidden">
        <img
          src={imgSrc}
          alt={item.name}
          loading="lazy"
          onError={() => setImgSrc(FALLBACK)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* price badge */}
        <span className="absolute top-3 right-3 bg-primary/90 text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full shadow-glow backdrop-blur-sm">
          \u20b9{item.price}
        </span>
        {/* veg/non-veg dot */}
        <span
          className={`absolute top-3 left-3 w-5 h-5 rounded-sm border-2 flex items-center justify-center ${
            item.isVeg
              ? "border-green-500 bg-card/80"
              : "border-red-500 bg-card/80"
          }`}
        >
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              item.isVeg ? "bg-green-500" : "bg-red-500"
            }`}
          />
        </span>
        {item.isBestseller && (
          <span className="absolute bottom-3 left-3 text-[10px] font-bold tracking-wider uppercase text-primary-foreground bg-primary/90 px-2 py-0.5 rounded-full">
            Bestseller
          </span>
        )}
        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
      </div>

      {/* body */}
      <div className="p-4 flex flex-col gap-1.5 flex-1">
        <h3 className="font-display text-base font-semibold text-foreground leading-snug">
          {item.name}
        </h3>
        <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2 flex-1">
          {item.description}
        </p>
        <div className="flex items-center justify-between mt-2">
          <span className="font-display text-lg font-bold text-primary">
            \u20b9{item.price}
          </span>
          <a
            href={`https://wa.me/919666817773?text=${encodeURIComponent(`Hi! I'd like to order: ${item.name} (\u20b9${item.price})`)}`}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid={`menu.order_button.${index + 1}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold bg-primary/20 hover:bg-primary/40 text-primary border border-primary/30 px-3 py-1.5 rounded-full transition-smooth"
          >
            <ShoppingBag size={12} />
            Order
          </a>
        </div>
      </div>
    </motion.article>
  );
}

function CategorySection({
  category,
  items,
  startIndex,
}: {
  category: string;
  items: MenuItem[];
  startIndex: number;
}) {
  if (items.length === 0) return null;
  return (
    <div className="mb-12">
      <motion.div
        className="flex items-center gap-4 mb-6"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground whitespace-nowrap">
          {category}
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-primary/60 via-primary/20 to-transparent" />
        <span className="text-xs text-muted-foreground">
          {items.length} items
        </span>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {items.map((item, i) => (
          <ItemCard key={item.id} item={item} index={startIndex + i} />
        ))}
      </div>
    </div>
  );
}

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<FilterValue>(ALL);
  const [search, setSearch] = useState("");
  const tabsRef = useRef<HTMLDivElement>(null);
  const [tabUnderline, setTabUnderline] = useState({ left: 0, width: 0 });

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return MENU_ITEMS.filter((item) => {
      const matchCat =
        activeCategory === ALL || item.category === activeCategory;
      const matchSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  const grouped = useMemo(() => {
    if (activeCategory !== ALL) {
      return [{ category: activeCategory as string, items: filtered }];
    }
    return MENU_CATEGORIES.map((cat) => ({
      category: cat,
      items: filtered.filter((i) => i.category === cat),
    })).filter((g) => g.items.length > 0);
  }, [activeCategory, filtered]);

  const groupStartIndexes = useMemo(() => {
    const acc: number[] = [];
    let count = 0;
    for (const g of grouped) {
      acc.push(count);
      count += g.items.length;
    }
    return acc;
  }, [grouped]);

  useEffect(() => {
    const container = tabsRef.current;
    if (!container) return;
    const active = container.querySelector<HTMLButtonElement>(
      `[data-tab="${activeCategory}"]`,
    );
    if (!active) return;
    const cRect = container.getBoundingClientRect();
    const aRect = active.getBoundingClientRect();
    setTabUnderline({
      left: aRect.left - cRect.left + container.scrollLeft,
      width: aRect.width,
    });
  }, [activeCategory]);

  return (
    <section
      id="menu"
      className="relative py-16 sm:py-24 bg-background"
      data-ocid="menu.section"
    >
      {/* ambient background orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute top-1/4 -left-32 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section title */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-3 font-body">
            Padma Home Food
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-foreground leading-tight">
            Our <span className="text-primary">Menu</span>
          </h1>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
            Home-cooked South Indian flavours, delivered fresh to your door.
          </p>
        </motion.div>

        {/* Search */}
        <div
          className="relative mb-6 max-w-lg mx-auto"
          data-ocid="menu.search_input"
        >
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search dishes\u2026"
            aria-label="Search menu"
            className="w-full bg-card/50 border border-border/60 rounded-full pl-9 pr-9 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-smooth backdrop-blur-sm"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Clear search"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Category tabs */}
        <div
          ref={tabsRef}
          role="tablist"
          aria-label="Menu categories"
          className="relative flex gap-1.5 overflow-x-auto scrollbar-none mb-10 pb-1 -mx-1 px-1"
          data-ocid="menu.filter.tab"
        >
          {TABS.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              data-tab={cat}
              aria-selected={activeCategory === cat}
              data-ocid={`menu.tab.${cat.toLowerCase().replace(/ /g, "_")}`}
              onClick={() => setActiveCategory(cat as FilterValue)}
              className={[
                "relative whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-smooth flex-shrink-0 z-10",
                activeCategory === cat
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
              ].join(" ")}
            >
              {activeCategory === cat && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-full bg-primary shadow-glow -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {cat}
            </button>
          ))}
          <motion.div
            className="absolute bottom-0 h-0.5 bg-primary/40 rounded-full pointer-events-none"
            animate={{ left: tabUnderline.left, width: tabUnderline.width }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        </div>

        {/* Menu grid */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              data-ocid="menu.empty_state"
              className="text-center py-20 text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ShoppingBag size={40} className="mx-auto mb-4 opacity-30" />
              <p className="font-display text-lg">
                No dishes found for &ldquo;{search}&rdquo;
              </p>
              <button
                type="button"
                onClick={() => setSearch("")}
                className="mt-4 text-primary text-sm underline underline-offset-2"
              >
                Clear search
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={`${activeCategory}-${search}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {grouped.map((g, gi) => (
                <CategorySection
                  key={g.category}
                  category={g.category}
                  items={g.items}
                  startIndex={groupStartIndexes[gi]}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Order CTAs */}
        <motion.div
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <a
            href="https://wa.me/919666817773?text=Hi!%20I%20want%20to%20place%20an%20order."
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="menu.whatsapp_button"
            className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold px-6 py-3 rounded-full shadow-elevated transition-smooth text-sm"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Order on WhatsApp
          </a>
          <a
            href="https://www.zomato.com/"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="menu.zomato_button"
            className="flex items-center gap-2.5 bg-[#E23744] hover:bg-[#cc2f3c] text-white font-semibold px-6 py-3 rounded-full shadow-elevated transition-smooth text-sm"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
              aria-hidden="true"
            >
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.75 17.25v-4.5h4.5v-1.5h-4.5V6.75h-1.5v4.5H6.75v1.5h4.5v4.5h1.5z" />
            </svg>
            Find us on Zomato
          </a>
        </motion.div>
      </div>
    </section>
  );
}
