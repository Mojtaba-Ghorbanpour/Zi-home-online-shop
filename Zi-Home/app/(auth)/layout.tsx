import Image from "next/image";

const AuthLayout: React.FC<IChildren> = ({ children }) => {
  return (
    <div className="bg-natural-200 bg-[url('/Background/Texture.png')] bg-no-repeat bg-cover h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-stretch gap-1.5">
            <h3 className="text-3xl">زیبایی به سبک</h3>
            <Image
              src="/App-logo/logo.png"
              alt="zi_home_logo"
              width={102}
              height={33}
            />
          </div>
          <p className="font-medium">
            متنوع ترین کالکشن خانه و آشپزخانه و دکوراسیون
          </p>
        </div>
        <div className="bg-white w-full p-6 rounded-2xl flex flex-col gap-12 border-2 border-natural-200">
          {children}
        </div>
      </div>
    </div>
  );
};
export default AuthLayout;
