import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoggingIn } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Email and password are required!");
      return;
    }

    try {
      await login(formData);
      navigate("/chat");
    } catch (error) {
      toast.error(error.message || "Login failed");
    }
  };

  const isFormValid = formData.email && formData.password;

  return (
    <>
      {/* MAIN CONTAINER */}
      <div className="h-screen w-full flex items-center justify-center bg-gradient-to-b from-[#c8dcfc] to-[#e7f0ff]">
        {/* MAIN DIV OF LOGIN FORM */}
        <div className="bg-white/80 shadow-md shadow-blue-100 rounded-2xl p-8 h-[600px] w-[450px]">
          {/* HEADING */}
          <h2 className="text-[#1e3a8a] text-center text-3xl font-semibold mb-[80px]">
            Welcome Back
          </h2>

          {/* SIGNUP FORM */}
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            {/* EMAIL */}
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-blue-700 w-5 h-5" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 p-3 rounded-md bg-[#f0f7ff] text-black placeholder-[#6b7280] outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* PASSWORD */}
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-blue-700 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-10 p-3 rounded-md bg-[#f0f7ff] text-black placeholder-[#6b7280] outline-none focus:ring-2 focus:ring-blue-400"
              />
              {/*  EYE TOGGLE BUTTON */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-blue-700"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!isFormValid || isLoggingIn}
              className={`p-3 rounded-md font-medium transition ${
                isFormValid
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-blue-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isLoggingIn ? `Processing...` : "Login"}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-5 mb-5">
            <h1 className="text-center mb-5 text-gray-500">
              ───────── or ─────────
            </h1>
          </div>

          <div>
            <button
              className="p-3 rounded-md font-medium transition 
                 bg-gray-100 hover:bg-gray-200 text-black w-full border border-gray-300 flex items-center justify-center"
            >
              <img
                src="https://nordichost.fi/wp-content/uploads/2025/02/HiView-Solutions-Google-Workspace-Reseller.-Super-G-Icon-min.png"
                alt=""
                className="w-6 h-6 mr-2"
              />{" "}
              Continue with Google
            </button>
          </div>

          {/* Bottom link */}
          <p className="text-gray-500 text-md text-center mt-4">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-700 underline">
              Sign Up
            </Link>
          </p>
          {/* SIGNUP FORM END HERE */}
        </div>
        {/* MAIN CONTAINER END HERE */}
      </div>
    </>
  );
}

export default LoginPage;
