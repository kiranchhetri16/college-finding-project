import AuthLayout from "../../../components/auth/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import SiInput from "../../../components/SiInput";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });

  const navigate = useNavigate();

  const { fullname, email, password, address, phone } = formData;

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Signup successful");
        setFormData({
          fullname: "",
          email: "",
          password: "",
          address: "",
          phone: "",
        });
        navigate("/login"); // redirect to login
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[400px] rounded-[6px] border border-[#E2E8F0] flex flex-col gap-4 p-[25px]">
        <div className="flex flex-col gap-[6px]">
          <h2 className="text-3xl font-bold font-inter">Welcome to FindMe</h2>
          <p className="text-[#64748B] text-sm leading-5 font-medium font-inter">
            Manage your workplace
          </p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-[8px]">
            <SiInput
              label="Full Name"
              type="text"
              name="fullname"
              placeholder="Enter full name"
              value={fullname}
              onChange={handleInputChange}
              required
            />
            <SiInput
              label="Email"
              type="email"
              name="email"
              placeholder="Enter email"
              value={email}
              onChange={handleInputChange}
              required
            />
            <SiInput
              label="Create Password"
              type="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={handleInputChange}
              required
            />
            <SiInput
              label="Address"
              type="text"
              name="address"
              value={address}
              placeholder="Enter address"
              onChange={handleInputChange}
              required
            />
            <SiInput
              label="Phone Number"
              type="tel"
              name="phone"
              value={phone}
              placeholder="Enter phone number"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex flex-col gap-[8px]">
            <button
              type="submit"
              className="text-sm font-inter font-medium leading-6 px-4 py-2 bg-[#433D71] rounded-[6px] text-[#FFFFFF] cursor-pointer hover:bg-[#433D7133] transition-all duration-300 hover:text-[#433D71]"
            >
              Sign up
            </button>
            <p className="mt-[21px] text-third font-poppins">
              Already have account?{" "}
              <Link className="text-primary" to="/">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Signup;
