import type { ReactNode } from "react";
import { loginView } from "../../assets/images/index";
interface Props {
  children: ReactNode;
}
const AuthLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <div className="w-screen h-screen flex justify-center ">
        <div className="lg:w-1/2 w-full h-full px-[64px] flex justify-center items-center">
          {children}
        </div>
        <div className="w-1/2 lg:block hidden h-full">
          <img src={loginView} className="h-full w-full object-cover" alt="" />
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
