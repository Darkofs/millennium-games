import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DealOfTheMonth from "@/components/DealOfTheMonth";
import UbisoftBundle from "@/components/UbisoftBundle";
import FeaturedGames from "@/components/FeaturedGames";
import VideoCatalogue from "@/components/VideoCatalogue";
import TrendingCarousel from "@/components/TrendingCarousel";
import UpcomingReleases from "@/components/UpcomingReleases";
import TrustSection from "@/components/TrustSection";
import Reviews from "@/components/Reviews";
import About from "@/components/About";
import Deals from "@/components/Deals";
import SupportSection from "@/components/SupportSection";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TrustSection />
      <DealOfTheMonth />
      <UbisoftBundle />
      <FeaturedGames />
      <VideoCatalogue />
      <TrendingCarousel />
      <UpcomingReleases />
      <Reviews />
      <About />
      <Deals />
      <SupportSection />
      <Newsletter />
      <Footer />
    </main>
  );
}
