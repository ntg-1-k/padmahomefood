import Layout from "./components/Layout";
import AboutSection from "./pages/AboutSection";
import ContactSection from "./pages/ContactSection";
import HeroSection from "./pages/HeroSection";
import MenuSection from "./pages/MenuSection";

export default function App() {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <MenuSection />
      <ContactSection />
    </Layout>
  );
}
