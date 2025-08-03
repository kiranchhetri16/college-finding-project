import { useParams } from "react-router-dom";
import { useState } from "react";
import AuthLayout from "../../../components/auth/AuthLayout";

const ResetPassword = () => {
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/reset-password/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newPassword: password }), // FIXED: match backend field
        }
      );

      const data = await res.json();
      console.log("Reset token from URL:", token);

      if (!res.ok) {
        setMessage(data.message || "Failed to reset password");
        return;
      }

      setMessage("Password reset successful! You can now log in.");
    } catch (error) {
      setMessage("Something went wrong");
    }
  };

  return (
    <AuthLayout>
      <div className="w-md mx-auto p-6 mt-10 border rounded-md shadow-md bg-white">
        <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit} className="flex flex-col pt-2 gap-4">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#433D71] hover:bg-[#433D7133] hover:text-[#433D71] text-white p-2 rounded "
          >
            Reset Password
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
