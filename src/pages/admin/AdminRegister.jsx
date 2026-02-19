import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const AdminRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/admin/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
      localStorage.setItem("adminToken", data.token);
      navigate("/admin/login");
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.log(error);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-2xl">

        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Admin Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <label className="block text-gray-300 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-gray-300 mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 pr-12 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-gray-400"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block text-gray-300 mb-1">Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 pr-12 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute right-3 top-10 text-gray-400"
            >
              {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

          <button className="w-full bg-emerald-600 hover:bg-emerald-700 py-3 rounded-lg font-semibold text-white transition">
            Register as Admin
          </button>

        </form>

        <p className="text-center text-gray-400 mt-6">
          Already admin?{" "}
          <Link to="/admin/login" className="text-emerald-400 hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default AdminRegister;
