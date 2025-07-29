import type { ReactNode } from "react";
import { FaSearch, FaUser, FaBars } from "react-icons/fa";
import { Logo } from "../../assets/images/index";
interface Props {
  children: ReactNode;
}

const UserLayout: React.FC<Props> = ({ children }) => {
  const Menus = ["Find universities", "Find programs", "Guides"];
  return (
    <>
      <div className="flex flex-col gap-4 px-[64px] m-auto max-w-[1440px]">
        <div className="flex px-5 p-2.5 items-center bg-[#fff] md:w-full gap-[40px] justify-between">
          <div className="w-[100px] h-[60px] ">
            <img
              className="w-[100%] h-[100%] object-fill"
              src={Logo}
              alt="logo"
            />
          </div>
          <div className="flex items-center gap-4">
            {Menus.map((item) => (
              <ul className="flex  items-center">
                <li className="text-base leading-6 ">
                  <a href="#" className="decoration-0">
                    {item}
                  </a>
                </li>
              </ul>
            ))}
          </div>

          <div className="flex items-center w-full max-w-md bg-purple-50 rounded-full px-4 py-2 mx-6">
            <FaSearch className="text-purple-500 mr-3" />
            <input
              type="text"
              placeholder="Find a country, city or university"
              className="w-full bg-transparent focus:outline-none text-sm text-gray-800 placeholder-gray-500"
            />
          </div>
          <div className="flex items-center space-x-1 cursor-pointer">
            <FaUser className="text-lg" />
            <span>Account</span>
          </div>
        </div>
        <div className="w-full">{children}</div>
      </div>
    </>
  );
};

export default UserLayout;
