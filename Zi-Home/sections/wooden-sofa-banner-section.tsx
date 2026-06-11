import Image from "next/image";
import Link from "next/link";

const WoodenSofaBanner = () => {
  return (
    <div className="w-full flex justify-center relative h-[200] rounded-2xl mb-10">
      <Link href="/categories/6899c00d140d101bd2968f65">
        <Image
          alt="banner"
          src="/images/mobl-banner.png"
          fill
          className="object-fill"
        />
      </Link>
    </div>
  );
};
export default WoodenSofaBanner;
