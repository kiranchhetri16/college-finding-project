import AuthLayout from "../../../components/auth/AuthLayout";
import { Link } from "react-router-dom";
import type { ChangeEvent } from "react";
import { useState } from "react";

import { Logo } from "../../../assets/images/index";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name == "name") {
      setName(event.target.value);
    }
    if (event.target.name == "email") {
      setEmail(event.target.value);
    }
    if (event.target.name == "password") {
      setPassword(event.target.value);
    }
  };
  return (
    <>
      <AuthLayout>
        <div className=" font-semibold flex  text-[#091E42] tracking-tight font-poppins xl:text-[52px] xl:leading-[62px] md:text-[36px] md:leading-[45px] sm:m-auto max-[426px]:text-3xl md:m-auto">
          Create a Free Account
        </div>
        <p className="text-third pt-[15px] text-base font-inter font-normal xl:text-base sm:text-sm sm:pt-3 max-[426px]:pt-3 max-[426px]:text-center pb-[34px]">
          Sign in to access your AI-powered knowledge base and streamline your
          workflow.
        </p>
        <form className="flex flex-col gap-[34px] mt-6 xl:gap-[34px] md:gap-4 sm:m-auto sm:gap-3">
          <div className="flex justify-start flex-col">
            <label className="text-base font-normal leading-5 text-secondary font-inter">
              Your name
            </label>
            <input
              type="text"
              name="name"
              onChange={handleInputChange}
              value={name}
              required
              className="p-4 text-sm  border border-[#CBD5E1] bg-[#F8FAFC] rounded-[12px] mt-2 focus:shadow-custom  outline-none xl:p-4 sm:p-3"
            />
          </div>
          <div className="flex justify-start flex-col">
            <label className="text-base font-normal leading-5 text-secondary font-inter">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={handleInputChange}
              value={email}
              required
              className="p-4 text-sm  border border-[#CBD5E1] bg-[#F8FAFC] rounded-[12px] mt-2 focus:shadow-custom  outline-none xl:p-4 sm:p-3"
            />
          </div>
          <div className="flex justify-start flex-col ">
            <label className="text-base font-normal font-inter">
              Create Password
            </label>
            <input
              type="password"
              name="password"
              onChange={handleInputChange}
              value={password}
              required
              className="p-4 text-sm  border border-[#CBD5E1] bg-[#F8FAFC] rounded-[12px] mt-2 focus:shadow-custom  outline-none xl:p-4 sm:p-3"
            />
            {/* <div className="flex justify-end absolute right-3  top-9 "></div> */}
          </div>

          <button
            type="submit"
            className="text-base leading-7 font-medium bg-primary text-white p-4 border rounded-[9px] hover:bg-accent cursor-pointer duration-300 font-poppins"
          >
            {" "}
            Register
          </button>

          <div className="flex justify-center  text-xs font-light font-inter ">
            OR
          </div>
          <button className="text-sm leading-7 font-semibold  text-black p-4 border border-[#CBD5E1] rounded-[10px]  w-full flex items-center justify-center gap-[25px] font-poppins xl:p-4 sm:p-3 cursor-pointer ">
            <img src={Logo} alt="" className="w-[25px] h-[25px]" />
            Sign up with Google
          </button>
        </form>
        <p className="mt-[21px] text-third font-poppins">
          Don't have an account?{" "}
          <Link className="text-primary" to="/">
            Create a free account{" "}
          </Link>
        </p>
      </AuthLayout>
    </>
  );
};

export default Signup;
