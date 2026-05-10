import { Button } from "@/components/ui/button";
import { Float, MeshDistortMaterial, Sphere, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { ChevronDown, Phone, Star } from "lucide-react";
import { motion } from "motion/react";
import { useRef } from "react";
import type * as THREE from "three";

const WHATSAPP_URL =
  "https://wa.me/919666817773?text=Hi!%20I%20want%20to%20order%20from%20Padma%20Home%20Food";
const ZOMATO_URL = "https://www.zomato.com/hyderabad";

function SpiceOrb({
  position,
  scale,
  speed,
  color,
}: {
  position: [number, number, number];
  scale: number;
  speed: number;
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.4;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
    meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
  });
  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.8}>
      <Sphere ref={meshRef} args={[scale, 24, 24]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.45}
          speed={2}
          roughness={0.1}
          metalness={0.6}
          transparent
          opacity={0.75}
        />
      </Sphere>
    </Float>
  );
}

function ParticleField() {
  const count = 160;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 22;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
  }
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#d4801a"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 4]} intensity={2} color="#f59e0b" />
      <pointLight position={[-4, -2, 2]} intensity={1} color="#c2410c" />
      <Stars
        radius={60}
        depth={40}
        count={800}
        factor={3}
        saturation={0.5}
        fade
        speed={0.8}
      />
      <SpiceOrb
        position={[-3.5, 0.5, -1]}
        scale={0.9}
        speed={0.8}
        color="#c2410c"
      />
      <SpiceOrb
        position={[3.8, -0.3, -2]}
        scale={0.7}
        speed={1.1}
        color="#d97706"
      />
      <SpiceOrb
        position={[0.5, 2, -3]}
        scale={0.5}
        speed={1.4}
        color="#92400e"
      />
      <SpiceOrb
        position={[-1.5, -2, -1.5]}
        scale={0.4}
        speed={0.9}
        color="#b45309"
      />
      <ParticleField />
    </>
  );
}

export default function HeroSection() {
  const scrollToMenu = () => {
    document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      data-ocid="hero.section"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Canvas Background */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <Scene />
        </Canvas>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/20 to-background/80" />
      </div>

      {/* Hero image */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/assets/generated/hero-food-spread.dim_1600x900.jpg"
          alt="Padma Home Food spread"
          className="w-full h-full object-cover opacity-25"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Rating pill */}
          <div className="inline-flex items-center gap-2 bg-card/60 backdrop-blur-sm border border-border rounded-full px-4 py-1.5 mb-6">
            <Star className="w-4 h-4 fill-primary text-primary" />
            <span className="text-sm font-medium text-foreground">
              4.5★ Delivery Rating
            </span>
            <span className="text-xs text-muted-foreground">• 4k+ Reviews</span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground mb-4 leading-tight tracking-tight">
            Padma{" "}
            <span
              className="text-primary"
              style={{
                textShadow: "0 0 40px oklch(0.68 0.18 25 / 0.5)",
              }}
            >
              Home Food
            </span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto mb-3">
            Authentic South Indian, North Indian & Street Food
          </p>
          <p className="text-sm text-muted-foreground/70 mb-8">
            75, 1st Floor, Shiva Sai Enclave, Nagaram, Secunderabad
          </p>

          {/* Cuisine tags */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {[
              "South Indian",
              "North Indian",
              "Street Food",
              "Breakfast",
              "Home Meals",
            ].map((tag) => (
              <span
                key={tag}
                className="bg-primary/10 border border-primary/20 rounded-full px-3 py-1 text-xs text-primary font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="hero.whatsapp_button"
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
              data-ocid="hero.zomato_button"
            >
              <Button
                size="lg"
                variant="outline"
                className="border-primary/50 text-primary hover:bg-primary/10 gap-2 px-8 transition-smooth hover:scale-105 active:scale-95"
              >
                Order on Zomato
              </Button>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll arrow */}
      <button
        type="button"
        onClick={scrollToMenu}
        data-ocid="hero.scroll_down_button"
        aria-label="Scroll to menu"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float text-muted-foreground hover:text-primary transition-smooth"
      >
        <ChevronDown className="w-7 h-7" />
      </button>
    </section>
  );
}
