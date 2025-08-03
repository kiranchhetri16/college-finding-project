import { useState } from "react";
import AuthLayout from "../../../components/auth/AuthLayout";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) return setError(data.message);

      setMessage(data.message);
    } catch (err) {
      setError("Something went wrong.");
    }
  };

  return (
    <AuthLayout>
      <div className="w-md mx-auto p-6 mt-10 border rounded-md shadow-md bg-white">
        <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
        {message && <p className="text-green-600">{message}</p>}
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm font-medium">Email</label>
          <input
            type="email"
            required
            className="w-full p-2 border border-gray-300 rounded mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-[#433D71] hover:bg-[#433D7133] hover:text-[#433D71] text-white p-2 rounded "
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
