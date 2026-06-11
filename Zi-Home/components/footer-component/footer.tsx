import { Link } from "@heroui/react";
import Image from "next/image";
import FooterCategories from "./footer-categories";

const AppFooter = () => {
  return (
    <footer className="w-full px-28 flex flex-col gap-3 py-7 bg-natural-50 mt-10">
      <div>
        <Image
          src={"/App-logo/logo.png"}
          alt="app logo"
          width={102}
          height={33}
        />
      </div>
      <div className="w-full flex justify-between">
        <div className="w-4/12 flex flex-col justify-between">
          <h4 className="text-xl font-bold">
            درباره <span className="text-danger-500">زی هوم</span>
          </h4>
          <p>
            فروشگاه ما با ارایه مجموعه ای متنوع از محصولات خانه، تجربه ای آسان و
            مطمئن برای خرید آنلاین فراهم کرده است. با ضمانت کیفیت، ارسال سریع و
            پشتیبانی حرفه ای، همراه شما هستیم.برای کسب اطلاعات بیشتر درباره
            خدمات و شرایط فروش،
            <Link color="danger" href={"/"}>
              کلیک کنید
            </Link>
          </p>
          <div className="w-full flex flex-col gap-6">
            <p>تلفن پشتیبانی : 021-44349867</p>
          </div>
        </div>
        <FooterCategories />
      </div>
    </footer>
  );
};

export default AppFooter;
