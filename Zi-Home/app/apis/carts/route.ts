import { NextResponse } from "next/server";
import client from "@/app/libs/database/connection";

export async function GET() {
  try {
    const db = await client.db("maktab90");
    const carts = db.collection("carts");
    const items = await carts.find().toArray();
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json(
      { error: "خطا در دریافت اطلاعات" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    const db = await client.db("maktab90");
    const carts = db.collection("carts");
    await carts.deleteOne({ id });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "خطا در حذف کالا" }, { status: 500 });
  }
}
