import BestSellingTab from "@/components/tab-components/best-selling/best-selling-tab";
import MostPopularTab from "@/components/tab-components/most-popular/most-popular-tab";

const TabSection = () => {
  return (
    <div className="w-full flex flex-col gap-8">
      <BestSellingTab />
      <MostPopularTab />
    </div>
  );
};

export default TabSection;
