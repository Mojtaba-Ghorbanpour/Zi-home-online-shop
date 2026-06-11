"use client";
import { getUserById } from "@/app/apis/user.api";
import { Divider } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

const ProfileDetail = () => {
  const [userId, setUserId] = React.useState<string | null>(null);
  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) setUserId(id);
  }, []);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["userData", userId],
    queryFn: () => getUserById(userId as string),
  });

  const userData = data?.data?.data?.user || null;

  if (isLoading) return <p>در حال بارگذاری اطلاعات...</p>;

  if (isError || !userData)
    return <p className="text-red-500">خطا در دریافت اطلاعات کاربر</p>;

  return (
    <div className="mt-10 p-6 bg-white shadow-lg rounded-lg shadow-danger-500">
      <div className="flex flex-col gap-7 text-gray-700">
        <div className=" flex w-full gap-10 font-semibold">
          <p>
            نام : <span className="text-danger-500">{userData.firstname}</span>
          </p>
          <p>
            نام خانوادگی :{" "}
            <span className="text-danger-500">{userData.lastname}</span>
          </p>
        </div>
        <Divider orientation="horizontal" />
        <div className=" flex w-full gap-10 font-semibold">
          <p>
            نام کاربری :{" "}
            <span className="text-danger-500">{userData.username}</span>
          </p>
          <p>
            نقش کاربر : <span className="text-danger-500">{userData.role}</span>
          </p>
        </div>
        <Divider orientation="horizontal" />
        <div className="flex w-full gap-10 font-semibold">
          <p>
            آدرس: <span className="text-danger-500">{userData.address}</span>
          </p>
        </div>
        <Divider orientation="horizontal" />
        <div className=" flex w-full gap-10 font-semibold">
          <p>
            تاریخ ساخت حساب :{" "}
            <span className="text-danger-500">
              {new Date(userData.createdAt).toLocaleDateString("fa-IR")}
            </span>
          </p>
          <p>
            آخرین بروزرسانی :{" "}
            <span className="text-danger-500">
              {new Date(userData.updatedAt).toLocaleDateString("fa-IR")}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
