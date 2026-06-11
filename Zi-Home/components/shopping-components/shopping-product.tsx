"use client";

import { Card, CardBody } from "@heroui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface ICartItem {
  product: string;
  name: string;
  count: number;
  price: number;
  thumbnail: string;
}

const CartSummary: React.FC = () => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);

  useEffect(() => {
    const items: ICartItem[] = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setCartItems(items);
  }, []);

  if (cartItems.length === 0) return <p>سبد خرید خالی است</p>;

  return (
    <div className="flex flex-col w-full gap-4">
      {cartItems.map((item) => (
        <Card key={item.product} shadow="sm" className="w-5/6 bg-danger-50/10">
          <CardBody className="p-0">
            <div className="flex gap-4 items-center">
              <div>
                <Image
                  alt={item.name}
                  src={`http://localhost:8000/images/products/thumbnails/${item.thumbnail}`}
                  width={250}
                  height={100}
                />
              </div>
              <div className="flex flex-col items-start h-full py-2 gap-2 font-medium">
                <h4 className="text-xl">{item.name}</h4>
                <p>تعداد: {item.count}</p>
                <p>
                  قیمت کل:{" "}
                  {new Intl.NumberFormat("fa-IR").format(item.count * item.price)} تومان
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default CartSummary;
