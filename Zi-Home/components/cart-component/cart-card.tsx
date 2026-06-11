"use client";

import { Button, Card, CardBody } from "@heroui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import CounterBox from "../counter-box-component/counter-box";
import DeleteCartItem from "./delete-cart-item";
import Link from "next/link";

interface ICartItem {
  product: string;
  name: string;
  count: number;
  price: number;
  thumbnail: string;
}

const CartCard: React.FC = () => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const loadCartItems = () => {
    const items: ICartItem[] = JSON.parse(localStorage.getItem("cartItems") || "[]");

    setCartItems(items);

    const total = items.reduce((sum, item) => sum + item.count * item.price, 0);
    setTotalPrice(total);
  };

  useEffect(() => {
    loadCartItems();
  }, []);

  const handleQuantityChange = (productId: string, newCount: number) => {
    const updatedItems = cartItems.map((item) => {
      if (item.product === productId) {
        return { ...item, count: newCount };
      }
      return item;
    });

    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));

    const total = updatedItems.reduce((sum, item) => sum + item.count * item.price, 0);
    setTotalPrice(total);
  };

  const handleDelete = (productId: string) => {
    const updatedItems = cartItems.filter((item) => item.product !== productId);
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));

    const total = updatedItems.reduce((sum, item) => sum + item.count * item.price, 0);
    setTotalPrice(total);
  };

  if (cartItems.length === 0) return <p>سبد خرید خالی است</p>;

  return (
    <div className="flex justify-between w-full">
      <div className="w-3/4 space-y-5">
        {cartItems.map((item) => (
          <Card key={item.product} shadow="sm" className="bg-danger-50/10">
            <CardBody className="p-0">
              <div className="flex justify-between">
                <div className="flex gap-4 items-center">
                  <div>
                    <Image
                      alt={item.name}
                      src={`http://localhost:8000/images/products/thumbnails/${item.thumbnail}`}
                      width={250}
                      height={100}
                    />
                  </div>
                  <div className="flex flex-col items-start h-full py-2 gap-4 font-medium">
                    <h4 className="text-xl">{item.name}</h4>
                    <CounterBox
                      count={item.count}
                      onChange={(val) => handleQuantityChange(item.product, val)}
                    />
                    <p>
                      قیمت کل:{" "}
                      {new Intl.NumberFormat("fa-IR").format(item.count * item.price)} تومان
                    </p>
                  </div>
                </div>
                <div className="p-2 cursor-pointer">
                  <DeleteCartItem
                    itemName={item.name}
                    itemId={item.product}
                    onDelete={() => handleDelete(item.product)}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
      <div className="bg-danger-50/10 p-4 shadow-lg rounded-lg font-medium text-lg h-fit flex flex-col gap-4">
        <p>
          قیمت کل:{" "}
          <span className="text-danger-500">
            {new Intl.NumberFormat("fa-IR").format(totalPrice)} تومان
          </span>
        </p>
        <Button color="danger" className="font-semibold">
          <Link href="/cart/shopping">ادامه و ثبت سفارش</Link>
        </Button>
      </div>
    </div>
  );
};

export default CartCard;
