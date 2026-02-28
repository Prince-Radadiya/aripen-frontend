import { useState } from "react";
import { Link } from "react-router-dom";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import toast from "react-hot-toast";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://aripen-backend.onrender.com/api/auth/ForgotPassword.php", {
        method: "POST",
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      console.log(data);``
      
      if (data.success) {
        toast.success("Password reset link sent!");
      } else {
        toast.error("Failed to send reset link.");
      }
    } catch (err) {
      toast.error("Something went wrong.");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
      <div className="mb-5">
        <h1 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">
          Forgot Your Password?
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Enter your email address, and we’ll send you a reset link.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label>Email <span className="text-error-500">*</span></Label>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <Button className="w-full" size="sm" type="submit">
          Send Reset Link
        </Button>
      </form>

      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        Wait, I remember my password…{" "}
        <Link
          to="/login"
          className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
        >
          Click here
        </Link>
      </div>
    </div>
  );
}
