import type { ReactNode } from "react";
import {Logo} from "../../assets/images/index";
interface Props{
    children: ReactNode;

}

const UserLayout:React.FC<Props>=({children})=>{
    const Menus=["Find universities", "Find programs", "Guides"];
    return(
        <>
     <div className="flex px-5 p-2.5 items-center bg-[#fff] md:w-full justify-between">
        <div className="flex px-5 p-2.5 items-center bg-[#fff] md:w-full justify-between">
            <div className="w-[283px] ">
                <img src={Logo} alt="logo" />
            </div>
            {Menus.map((item)=>(
            <ul className="flex gap-3 items-center"><li className="text-base leading-6 "><a href="#" className="decoration-0">{item}</a></li></ul>
            ))};
<div className="flex items-center w-[300px]">
    <input type="text" className="w-[80%] p-2 rounded-[25px]"></input>
</div>
        </div>
     <div className="flex px-5 p-2.5 items-center bg-[#fff] md:w-full justify-between">{children}</div>
        </div>
        </>
    );
}

export default UserLayout;