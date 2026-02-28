import { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Button from "../ui/button/Button";
import toast from "react-hot-toast";

export default function ResetPasswordForm() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://aripen-backend.onrender.com/api/auth/ResetPassword.php", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Password updated! Please login.");
        navigate("/login");
      } else toast.error(data.message);
    } catch (err) {
      toast.error("Something went wrong")
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
      <div className="mb-5">
        <h1 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">
          Reset Your Password
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Enter your new password below and confirm it to reset.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label>
            New Password <span className="text-error-500">*</span>
          </Label>
          <Input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <Label>
            Confirm Password <span className="text-error-500">*</span>
          </Label>
          <Input
            type="password"
            placeholder="Confirm new password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </div>
        <Button className="w-full" size="sm" type="submit">
          Reset Password
        </Button>
      </form>

      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        Remembered your password?{" "}
        <Link
          to="/login"
          className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
        >
          Login here
        </Link>
      </div>
    </div>
  );
}
 