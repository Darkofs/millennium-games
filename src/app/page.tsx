import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedGames from "@/components/FeaturedGames";
import TrendingCarousel from "@/components/TrendingCarousel";
import UpcomingReleases from "@/components/UpcomingReleases";
import TrustSection from "@/components/TrustSection";
import Reviews from "@/components/Reviews";
import About from "@/components/About";
import Deals from "@/components/Deals";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TrustSection />
      <FeaturedGames />
      <TrendingCarousel />
      <UpcomingReleases />
      <Reviews />
      <About />
      <Deals />
      <Newsletter />
      <Footer />
    </main>
  );
}
