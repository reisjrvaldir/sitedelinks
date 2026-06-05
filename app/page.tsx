import Hero from "@/components/Hero";
import MainCTA from "@/components/MainCTA";
import Trust from "@/components/Trust";
import Products from "@/components/Products";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-dark text-white">
      <Hero />
      <MainCTA />
      <Trust />
      <Products />
      <Footer />
    </main>
  );
}
