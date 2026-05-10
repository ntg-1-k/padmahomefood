import { Button } from "@/components/ui/button";
import { Menu, Phone, Star, X } from "lucide-react";
import { useEffect, useState } from "react";

const WHATSAPP_URL =
  "https://wa.me/919666817773?text=Hi!%20I%20want%20to%20order%20from%20Padma%20Home%20Food";
const ZOMATO_URL = "https://www.zomato.com/hyderabad";

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-card/95 backdrop-blur-md border-b border-border shadow-elevated"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              type="button"
              data-ocid="nav.logo"
              onClick={() => scrollTo("#hero")}
              className="flex items-center gap-2 transition-smooth hover:opacity-90"
            >
              <div className="w-8 h-8 rounded-full bg-primary/80 flex items-center justify-center spice-glow">
                <span className="text-primary-foreground font-display font-bold text-sm">
                  P
                </span>
              </div>
              <span className="font-display font-semibold text-lg text-foreground tracking-tight">
                Padma Home Food
              </span>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  data-ocid={`nav.${link.label.toLowerCase()}_link`}
                  onClick={() => scrollTo(link.href)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Rating + CTA */}
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-muted/50 rounded-full px-3 py-1">
                <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                <span className="text-sm font-medium text-foreground">4.5</span>
                <span className="text-xs text-muted-foreground">(4k+)</span>
              </div>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="nav.whatsapp_button"
              >
                <Button
                  size="sm"
                  className="bg-[#25D366] hover:bg-[#1ebe5d] text-white gap-1.5 transition-smooth"
                >
                  <Phone className="w-3.5 h-3.5" />
                  WhatsApp
                </Button>
              </a>
              <a
                href={ZOMATO_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="nav.zomato_button"
              >
                <Button
                  size="sm"
                  variant="outline"
                  className="border-primary/40 text-primary hover:bg-primary/10 gap-1.5 transition-smooth"
                >
                  Order Zomato
                </Button>
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              type="button"
              data-ocid="nav.hamburger_button"
              className="md:hidden p-2 rounded-lg hover:bg-muted/40 transition-smooth"
              onClick={() => setIsOpen((v) => !v)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        data-ocid="nav.mobile_drawer"
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <button
          type="button"
          aria-label="Close menu"
          className={`absolute inset-0 w-full bg-background/80 backdrop-blur-sm transition-opacity duration-300 cursor-default ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        />
        {/* Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-card border-l border-border shadow-elevated p-6 pt-20 transition-transform duration-300 ease-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col gap-4">
            {/* Rating in drawer */}
            <div className="flex items-center gap-1.5 mb-2">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="font-medium text-foreground">4.5★</span>
              <span className="text-sm text-muted-foreground">
                4k+ Delivery Ratings
              </span>
            </div>

            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                type="button"
                data-ocid={`nav.mobile_${link.label.toLowerCase()}_link`}
                onClick={() => scrollTo(link.href)}
                className="text-left text-base font-medium text-foreground hover:text-primary transition-smooth py-2 border-b border-border/50"
              >
                {link.label}
              </button>
            ))}

            <div className="flex flex-col gap-3 pt-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="nav.mobile_whatsapp_button"
              >
                <Button className="w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white gap-2">
                  <Phone className="w-4 h-4" />
                  Order on WhatsApp
                </Button>
              </a>
              <a
                href={ZOMATO_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="nav.mobile_zomato_button"
              >
                <Button
                  variant="outline"
                  className="w-full border-primary/40 text-primary hover:bg-primary/10 gap-2"
                >
                  Order on Zomato
                </Button>
              </a>
              <a href="tel:+919666817773" data-ocid="nav.mobile_call_button">
                <Button
                  variant="ghost"
                  className="w-full gap-2 text-muted-foreground"
                >
                  <Phone className="w-4 h-4" />
                  Call Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
