import { getProductByCategory } from "@/app/apis/product.api";
import { Card, CardBody, CardFooter } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CategoryContent = ({ categoryId }: { categoryId: string }) => {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["ProductByCategory"],
    queryFn: () => getProductByCategory(categoryId, 1, 4),
  });

  const ProductByCategory = (data?.data?.data?.products || []).map(
    (p: IProductByCategory) => ({
      id: p._id,
      name: p.name,
      price: p.price,
      brand: p.brand,
      thumbnail: p.thumbnail,
    })
  );

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (isError) return <p>خطا در دریافت کالاها</p>;

  return (
    <div className="gap-6 grid grid-cols-2 sm:grid-cols-4 w-full">
      {ProductByCategory.map((product: IProductByCategory) => (
        <Card
          key={product.name}
          isPressable
          radius="sm"
          shadow="md"
          onPress={() => router.push(`/products/${product.id}`)}
        >
          <CardBody className="flex gap-2 size-fit text-start">
            <Image
              alt={product.name}
              className="object-cover"
              src={`http://localhost:8000/images/products/thumbnails/${product.thumbnail}`}
              width={500}
              height={500}
            />
            <div>
              <div>
                <p className="">{product.name}</p>
                <p className="text-default-500">{product.brand}</p>
              </div>
            </div>
          </CardBody>
          <CardFooter className="justify-end pt-0 bg-danger-50 text-lg font-medium">
            <p> {new Intl.NumberFormat("fa-IR").format(product.price)} تومان</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
export default CategoryContent;
