import CategoryCard from "@/components/card-components/category-card";

const CategorySection = () => {
  return (
    <div className="flex flex-col gap-8 w-full items-center">
      <h3 className="text-2xl font-bold">دسته بندی محصولات</h3>
      <CategoryCard />
    </div>
  );
};

export default CategorySection;
