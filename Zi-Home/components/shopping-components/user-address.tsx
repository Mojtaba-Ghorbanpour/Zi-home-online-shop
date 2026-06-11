"use client";

import { getUserById } from "@/app/apis/user.api";
import { Radio, RadioGroup } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

const UserAddress = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) setUserId(id);
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userData", userId],
    queryFn: () => getUserById(userId as string),
    enabled: !!userId, // ❗️فقط وقتی userId داریم اجرا بشه
  });

  const userAddress: string = data?.data?.data?.user?.address || "";

  if (isLoading) return <p>در حال بارگذاری اطلاعات...</p>;

  if (isError)
    return <p className="text-red-500">خطا در دریافت اطلاعات کاربر</p>;

  return (
    <div className="w-full shadow-lg rounded-lg shadow-danger-300 p-4">
      <RadioGroup isDisabled label="آدرس :" defaultValue="userAddress" color="danger">
        <Radio value="userAddress">{userAddress}</Radio>
      </RadioGroup>
    </div>
  );
};

export default UserAddress;
