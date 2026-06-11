import ProductCategory from "../list-components/product-categories";

const Sidebar = () => {
  return (
    <div className="flex flex-col w-2/5 gap-4 shadow-xl p-5 h-fit rounded-b-md sticky right-0 top-40">
      <h3 className="font-medium">دسته بندی ها</h3>
      <ProductCategory />
    </div>
  );
};
export default Sidebar;
