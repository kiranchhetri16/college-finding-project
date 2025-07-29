import AuthLayout from "../../../components/auth/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { Logo } from "../../../assets/images/index";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name == "email") {
      setEmail(event.target.value);
    }
    if (event.target.name == "password") {
      setPassword(event.target.value);
    }
  };
  const doLogin = (e: FormEvent) => {
    e.preventDefault();
    // let isLogin = false;
    if (email == "admin@gmail.com" && password == "admin") {
      // isLogin = true;
      navigate("/home");
      console.log("login success");
    } else {
      console.log("login failed");
    }
  };

  return (
    <AuthLayout>
      <div className="text-[52px] leading-[62px] font-semibold flex  text-[#091E42] tracking-tight font-poppins xl:text-[52px] xl:leading-[62px] md:text-[36px] md:leading-[45px] sm:m-auto max-[426px]:text-3xl md:m-auto ">
        Welcome Back
      </div>
      <p className="text-third xl:-pt-[15px] text-base font-inter font-normal xl:text-base sm:text-sm sm:pt-3  max-[426px]:pt-3 max-[426px]:text-center pb-[34px]">
        Sign in to access your AI-
        <span className="text-base font-normal font-inter text-[#091E42]">
          powered
        </span>{" "}
        knowledge base and streamline your workflow.
      </p>
      <form className="flex flex-col gap-[34px]  xl:gap-[34px] md:gap-4 sm:m-auto sm:gap-3">
        <div className="flex justify-start flex-col">
          <label className="text-base font-normal  text-secondary font-inter">
            Email address
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
        <div className="flex justify-start flex-col relative ">
          <label className="text-base font-normal font-inter">Password</label>
          <input
            type="password"
            name="password"
            onChange={handleInputChange}
            value={password}
            required
            className="p-4 text-sm  border border-[#CBD5E1] bg-[#F8FAFC] rounded-[12px] mt-2 focus:shadow-custom  outline-none xl:p-4 sm:p-3"
          />
          <div className="flex justify-end absolute right-3  top-9 "></div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="checkbox"
              id="checkbox"
              className="h-6 w-6 rounded-[5px] border border-[#94A3B8] cursor-pointer"
            />
            <label
              htmlFor="checkbox"
              className="text-sm leading-[22px] font-normal font-poppins cursor-pointer"
            >
              {" "}
              Remember Me
            </label>
          </div>
          <Link
            to={"/signup"}
            className=" text-primary text-sm leading-[22px] font-normal hover:text-purple-600 cursor-pointer tracking-tight font-poppins"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          onClick={doLogin}
          className="text-base leading-7 font-medium bg-primary text-white p-4 border  rounded-[9px] hover:bg-accent cursor-pointer duration-300 xl:p-4 sm:p-3"
        >
          {" "}
          Sign in
        </button>

        <div className="flex justify-center  text-xs font-light font-inter ">
          OR
        </div>
        <button className="text-sm leading-7 font-semibold  text-black  border border-[#CBD5E1] rounded-[10px]  w-full flex items-center justify-center gap-[25px] font-poppins xl:p-4 sm:p-3 cursor-pointer">
          <img src={Logo} alt="" className="w-[25px] h-[25px] " />
          Sign up with Google
        </button>
      </form>
      <p className="mt-[21px] text-third font-poppins">
        Don't have an account?{" "}
        <Link className="text-primary" to="/signup">
          Create a free account{" "}
        </Link>
      </p>
      <p className="text-base leading-7 font-normal tracking-tight text-center pt-[55px] font-poppins xl:pt-[55px] md:pt-4">
        By continuing, you agree to our{" "}
        <Link className="underline" to="">
          {" "}
          Terms of <br /> Service{" "}
        </Link>{" "}
        and{" "}
        <Link className="underline" to="">
          Privacy Policy.
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Login;
