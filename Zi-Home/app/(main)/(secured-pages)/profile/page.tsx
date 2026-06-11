import ProfileDetail from "@/components/profile-component/profile-detail";

export default function ProfilePage() {
  return (
    <div className="px-28 flex flex-col items-center">
      <h3 className="text-2xl font-semibold">اطلاعات کاربر</h3>
      <ProfileDetail />
    </div>
  );
}
