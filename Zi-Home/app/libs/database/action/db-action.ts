"use server";
import client from "@/app/libs/database/connection";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

const db = await client.db("maktab90");
const carts = db.collection("carts");

export async function getCartItems() {
  const res = await fetch("/api/cart");
  if (!res.ok) throw new Error("خطا در دریافت اطلاعات");
  return res.json();
}

export async function addToCart(item: {
  productId: string;
  name: string;
  thumbnail: string;
  quantity: number;
  price: number;
}) {
  const existingItem = await carts.findOne({ productId: item.productId });

  if (existingItem) {
    await carts.updateOne(
      { productId: item.productId },
      {
        $set: {
          thumbnail: item.thumbnail,
          price: item.price,
          updatedAt: new Date(),
          quantity: item.quantity,
          totalPrice: item.price * item.quantity,
        },
      }
    );
  } else {
    const cartItem = {
      ...item,
      totalPrice: item.price * item.quantity,
      createdAt: new Date(),
    };

    await carts.insertOne(cartItem);
  }

  revalidatePath("/cart");
}

export async function removeFromCart(id: string) {
  await carts.deleteOne({ _id: new ObjectId(id) });
  revalidatePath("/cart");
}

export async function updateCartItem(id: string, quantity: number) {
  const item = await carts.findOne({ _id: new ObjectId(id) });
  if (!item) return;

  await carts.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        quantity,
        totalPrice: item.price * quantity,
        updatedAt: new Date(),
      },
    }
  );

  revalidatePath("/cart");
}
