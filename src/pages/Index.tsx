import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedEvents from "@/components/FeaturedEvents";
import Categories from "@/components/Categories";
import Features from "@/components/Features";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturedEvents />
      <Categories />
      <Features />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
