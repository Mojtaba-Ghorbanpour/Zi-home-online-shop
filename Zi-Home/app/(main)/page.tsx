import HeroSection from "@/sections/hero-section";
import CategorySection from "@/sections/category-section";
import KitchenToolsBannerSection from "@/sections/kitchen-tools";
import TabSection from "@/sections/tab-section";
import WoodenSofaBanner from "@/sections/wooden-sofa-banner-section";

export default async function Home() {
  return (
    <section className="flex flex-col items-center justify-center w-full gap-10">
      <HeroSection />
      <div className="w-full h-full flex flex-col px-10 sm:px-14 lg:px-28 gap-10">
        <CategorySection />
        <KitchenToolsBannerSection />
        <TabSection />
        <WoodenSofaBanner />
      </div>
    </section>
  );
}
