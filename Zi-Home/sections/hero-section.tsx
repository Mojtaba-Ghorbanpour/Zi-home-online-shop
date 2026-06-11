import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="w-full h-[700px] flex justify-center items-center relative">
      <Image
        alt="hero-section"
        src="/images/hero-section.png"
        fill
        className="object-cover"
      />
    </div>
  );
};

export default HeroSection;
