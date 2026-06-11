import { getUserById } from "@/app/apis/user.api";
import { useQuery } from "@tanstack/react-query";

const GetUserName = ({ userId }: { userId: string }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["username", userId],
    queryFn: () => getUserById(userId),
  });

  const userFirstName = data?.data?.data?.user.firstname || [];
  const userLastName = data?.data?.data?.user.lastname || [];
  const username = `${userFirstName} ${userLastName}`;

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (isError) return <p>خطا در دریافت نام کاربر</p>;

  return username;
};
export default GetUserName;
