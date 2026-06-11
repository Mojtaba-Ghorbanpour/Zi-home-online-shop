import Image from "next/image";
import Link from "next/link";

const KitchenToolsBannerSection = () => {
  return (
    <div className="w-full lg:flex justify-center relative hidden lg:h-[200] rounded-2xl">
      <Link href="/categories/6899c02e140d101bd2968f6d">
        <Image
          alt="banner"
          src="/images/abzar-aspazkhaneh.png"
          fill
          className="object-fill"
        />
      </Link>
    </div>
  );
};

export default KitchenToolsBannerSection;
