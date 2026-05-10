import { Clock, MapPin, Phone, Utensils } from "lucide-react";
import { motion } from "motion/react";

const STATS = [
  { icon: Utensils, value: "25+", label: "Menu Items" },
  { icon: Clock, value: "7AM", label: "Opens Daily" },
  { icon: Phone, value: "100%", label: "Home Made" },
  { icon: MapPin, value: "Nagaram", label: "Secunderabad" },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      data-ocid="about.section"
      className="py-20 sm:py-28 bg-muted/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
              Our Story
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-5 leading-tight">
              Cloud Kitchen, <span className="text-primary">Home Heart</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Padma Home Food brings you the authentic flavours of Andhra and
              Telangana — cooked fresh every morning with time-honoured recipes
              passed down through generations. Every dish carries the warmth of
              a home-cooked meal.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              From crispy dosas and fluffy idlis to rich chicken curries and
              traditional ragi sangati — our cloud kitchen delivers comfort,
              culture, and incredible taste straight to your doorstep.
            </p>
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              75, 1st Floor, Shiva Sai Enclave, Nagaram, Secunderabad
            </div>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid grid-cols-2 gap-4"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="glass-card rounded-2xl p-6 text-center"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="font-display text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
