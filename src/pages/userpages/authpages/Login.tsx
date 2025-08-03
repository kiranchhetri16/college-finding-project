import AuthLayout from "../../../components/auth/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import type { ChangeEvent, FormEvent } from "react";
import { useState, useEffect } from "react";
import SiInput from "../../../components/SiInput";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setErrorMsg("");

    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    if (isLogin === "1") {
      navigate("/home"); // Redirect logged-in users to home (or dashboard)
    }
  }, [navigate]);

  const showSuccessMessage = (msg: string) => {
    // Toast or alert (you can integrate react-toastify here)
    alert(msg);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    // Admin bypass login
    if (email === "admin@gmail.com" && password === "admin") {
      localStorage.setItem("isLogin", "1");
      localStorage.setItem("name", email);
      navigate("/admin");
      showSuccessMessage("Admin Login Successful");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Login response data:", data); // Debug output

      if (data.user && data.message === "Login successful") {
        localStorage.setItem("isLogin", "1");
        localStorage.setItem("name", email);
        localStorage.setItem("email", data.user.email); // fix here too
        localStorage.setItem("user", JSON.stringify(data.user));

        navigate("/");
        showSuccessMessage("User Login Successful");
      } else {
        setErrorMsg(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrorMsg("Error during login");
    } finally {
      setLoading(false);
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

        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          {/* Show error message */}
          {errorMsg && (
            <div className="text-red-500 text-sm font-medium">{errorMsg}</div>
          )}

          <div className="flex flex-col gap-[8px]">
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
              label="Password"
              type="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="flex flex-col gap-[8px]">
            <Link
              to={"/forgot-password"}
              className="text-right text-sm leading-5 font-medium font-inter text-primary hover:underline transition-all duration-100"
            >
              Forgot Password?
            </Link>

            <button
              type="submit"
              disabled={loading}
              className={`text-sm font-inter font-medium leading-6 px-4 py-2 rounded-[6px] text-white cursor-pointer transition-all duration-300 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#433D71] hover:bg-[#433D7133] hover:text-[#433D71]"
              }`}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            <p className="mt-[21px] text-third font-poppins">
              Don't have an account?{" "}
              <Link className="text-primary" to="/signup">
                Create an account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
