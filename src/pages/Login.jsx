import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Login failed");
      } else {
        alert("Login successful!");
        // Store token in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        // Redirect to dashboard
        navigate("/user/dashboard");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">

        <h2 className="text-3xl font-bold text-center mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email or Phone */}
          <div>
            <label className="block mb-1 font-medium">
              Email or Phone Number
            </label>
            <input
              type="text"
              name="emailOrPhone"
              required
              value={formData.emailOrPhone}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-teal-500 outline-none"
              placeholder="Enter email or phone"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block mb-1 font-medium">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 pr-12 focus:ring-2 focus:ring-teal-500 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-gray-500"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

          <button className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition">
            Login
          </button>

        </form>

        <p className="text-center mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-teal-600 hover:underline">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;
