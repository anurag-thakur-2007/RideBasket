import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import useAuth from "../../hooks/useAuth";
import { loginUser } from "../../services/authService";
import logo from "../../assets/logo.png";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const cleaned = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({
        ...prev,
        [name]: cleaned,
      }));
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.phone || !formData.password) {
      toast.error("Please fill all fields.");
      return;
    }

    if (formData.phone.length !== 10) {
      toast.error("Phone number must be exactly 10 digits.");
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser(formData);

      login(data.token, data.user);

      toast.success(data.message);

      navigate("/home");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-200 flex items-center justify-center p-4 sm:p-6 md:p-10 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-blue-400/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-indigo-400/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 lg:gap-20 items-center relative z-10">
        
        <div className="lg:hidden text-center mb-2">
          <img
            src={logo}
            alt="RideBasket"
            className="h-12 w-12 object-contain mx-auto"
          />
          <h1 className="text-3xl font-extrabold text-blue-600 mt-2 tracking-tight">
            RideBasket
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 font-medium">
            Share rides. Save money. Travel together.
          </p>
        </div>

        <div className="hidden lg:flex flex-col justify-center">
          <img
            src={logo}
            alt="RideBasket"
            className="h-20 w-20 object-contain mb-6 drop-shadow-md"
          />
          <h1 className="text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
            Share rides. <br />
            <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Save money.</span>
          </h1>
          <p className="mt-6 text-xl text-slate-600 font-medium leading-relaxed max-w-md">
            The premium ride sharing app built exclusively for VIT students. Travel together and split costs seamlessly.
          </p>

          <div className="mt-12 space-y-4 text-base font-semibold text-slate-700">
            <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm px-4 py-3 rounded-2xl border border-white/80 shadow-sm w-fit">
              <span className="text-green-600 text-lg">✓</span>
              <span>Safe student community</span>
            </div>
            <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm px-4 py-3 rounded-2xl border border-white/80 shadow-sm w-fit">
              <span className="text-green-600 text-lg">✓</span>
              <span>Affordable cab sharing</span>
            </div>
            <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm px-4 py-3 rounded-2xl border border-white/80 shadow-sm w-fit">
              <span className="text-green-600 text-lg">✓</span>
              <span>Built exclusively for VIT students</span>
            </div>
          </div>
        </div>

        <div className="w-full max-w-md mx-auto bg-white border border-slate-200 shadow-md rounded-3xl p-6 sm:p-10 transition-all hover:shadow-lg">
          <div className="text-center mb-6 sm:mb-8">
            <img
              src={logo}
              alt="RideBasket"
              className="h-12 w-12 object-contain mx-auto mb-3"
            />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-955 tracking-tight">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-500 font-medium">
              Login to continue your journey
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <Input
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
              autoComplete="username"
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
              autoComplete="current-password"
            />

            <div className="pt-3">
              <Button type="submit" loading={loading} className="w-full">
                Login
              </Button>
            </div>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <p className="text-sm sm:text-base text-slate-600 font-medium">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                Register
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;