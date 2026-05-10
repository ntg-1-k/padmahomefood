import { MapPin, MessageCircle, Phone } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/919666817773?text=Hi%20Padma%20Home%20Food%2C%20I%20want%20to%20order";
const ZOMATO_URL = "https://www.zomato.com";
const CAFFEINE_URL = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

const cuisines = ["South Indian", "North Indian", "Street Food"];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-card border-t border-border py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-bold text-foreground mb-2">
              Padma Home Food
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {cuisines.map((c) => (
                <span
                  key={c}
                  className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium"
                >
                  {c}
                </span>
              ))}
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Home-cooked meals delivered with love in Nagaram, Secunderabad.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 uppercase tracking-widest text-xs">
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                <span>
                  75, 1st Floor, Shiva Sai Enclave,
                  <br />
                  Nagaram, Secunderabad
                </span>
              </li>
              <li>
                <a
                  href="tel:+919666817773"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-smooth"
                >
                  <Phone className="w-4 h-4 text-primary" /> +91 9666817773
                </a>
              </li>
            </ul>
          </div>

          {/* Order */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 uppercase tracking-widest text-xs">
              Order Now
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="footer.whatsapp_button"
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#25D366]/10 text-[#25D366] text-sm font-semibold hover:bg-[#25D366]/20 border border-[#25D366]/20 transition-smooth"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp Order
              </a>
              <a
                href={ZOMATO_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="footer.zomato_button"
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#E23744]/10 text-[#E23744] text-sm font-semibold hover:bg-[#E23744]/20 border border-[#E23744]/20 transition-smooth"
              >
                <span className="font-bold text-base leading-none">Z</span>{" "}
                Zomato Order
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-muted-foreground text-center">
            <span>© {year} Padma Home Food. All rights reserved.</span>
            <span className="flex items-center gap-1.5">
              FSSAI Lic. No.{" "}
              <span className="font-mono font-semibold text-muted-foreground">
                23626029001463
              </span>
            </span>
          </div>
          <a
            href={CAFFEINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground transition-smooth"
          >
            Built with love using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
