"use client";
import { Card, CardBody, CardFooter } from "@heroui/react";
import Image from "next/image";
import Sidebar from "../accordion-components/sidebar";
import CategoryHeaderSection from "@/sections/category-header-section";
import { useRouter } from "next/navigation";

const CategoryProductList = ({ products }: { products: IProduct[] }) => {
  const router = useRouter();
  const category = products[0]?.category;
  return (
    <div className="flex flex-col">
      <div className="flex gap-5 relative">
        <Sidebar />
        <div className="flex flex-col justify-center items-center gap-7">
          <CategoryHeaderSection categoryId={category} />
          <div className="grid grid-cols-4 gap-4 px-10">
            {products.map((product) => (
              <Card
                key={product.name}
                isPressable
                radius="sm"
                shadow="md"
                onPress={() => router.push(`/products/${product._id}`)}
              >
                <CardBody className="flex gap-5 size-fit text-start">
                  <Image
                    alt={product.name as string}
                    className="object-cover"
                    src={`http://localhost:8000/images/products/thumbnails/${product.thumbnail}`}
                    width={500}
                    height={500}
                  />
                  <div>
                    <div className="space-y-2">
                      <p className="">{product.name}</p>
                      <p className="text-default-500 text-sm">
                        {product.brand}
                      </p>
                    </div>
                  </div>
                </CardBody>
                <CardFooter className="justify-end bg-danger-50 font-medium text-lg">
                  <p>
                    {new Intl.NumberFormat("fa-IR").format(
                      product.price as number
                    )}{" "}
                    تومان
                  </p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProductList;
