import type { ReactNode } from "react";
import { Review } from "../../assets/images/index";
import { Profile } from "../../assets/images/index";
// import Shapes from "../../assets/img/shape-down.png";
interface Props {
  children: ReactNode;
}
const AuthLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <div className="flex gap-[55px] w-screen h-screen  items-center md:flex md:justify-center xl:screen lg:w-[1000px] md:w-[700px] lg:m-0 xl:m-0 md:m-auto m-auto xl:m-auto">
        <div className="h-screen w-[709px]    bg-primary lg:flex flex-col gap-[223px] relative lg:w-[709px] sm:hidden lg:gap-[120px] xl:gap-[223px] max-[426px]:hidden md:hidden xl:pt-[110px] xl: pl-[84px] xl:pr-[85px] lg:pt-[60px] lg:pl-[40px] lg:pr-[40px] ">
          <div className="flex flex-col w-full gap-[43px] lg:gap-[24px] xl:gap-[43px] ">
            <h2 className="text-white font-bold leading-[54px] text-4xl uppercase font-poppins md:text-xl xl:text-4xl ">
              Welcome to Your AI Assistant
            </h2>
            <p className="text-sm font-normal  text-white font-inter">
              Empowering you with instant access to knowledge, insights, and
              AI-driven <br /> support.
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <img className="w-[168px] h-[22px]" src={Review} alt="star" />
            <p className="text-2xl font-medium text-white pt-[30px] font-poppins xl:text-2xl md:text-lg">
              Our team has significantly improved efficiency with this AI
              chatbot. It’s a game-changer!
            </p>
            <div className="flex items-center gap-[17.6px]">
              <img
                className="w-[45px] h-[45px] rounded-full object-fill"
                src={Profile}
                alt="profile"
              />
              <div className="flex flex-col ">
                <p className="text-base leading-[28px] font-semibold text-white font-poppins">
                  Devon Lane
                </p>
                <p className="text-white text-sm  font-normal font-inter">
                  Founder, GlyphAI
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[688px]  max-[426px]:m-auto  m-auto md:p-3 max-[426px]:p-2.5 ">
          {children}
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
