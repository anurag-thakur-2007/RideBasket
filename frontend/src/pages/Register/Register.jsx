import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Select from "../../components/common/Select";

import { registerUser } from "../../services/authService";
import logo from "../../assets/logo.png";

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    gender: "",
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

    const { name, phone, gender, password } = formData;

    if (!name || !phone || !gender || !password) {
      toast.error("Please fill all fields.");
      return;
    }

    const phoneRegex = /^[6789]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      toast.error("Phone number must be exactly 10 digits and start with 6, 7, 8, or 9.");
      return;
    }

    try {
      setLoading(true);

      const data = await registerUser(formData);

      toast.success(data.message);

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-200 flex items-center justify-center p-4 sm:p-6 md:p-10 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-blue-400/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-indigo-400/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-6xl grid lg:grid-cols-2 items-center gap-8 lg:gap-20 relative z-10">

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
            Join the community. Share rides. Travel smarter.
          </p>
        </div>

        <div className="hidden lg:flex flex-col justify-center">
          <img
            src={logo}
            alt="RideBasket"
            className="h-20 w-20 object-contain mb-6 drop-shadow-md"
          />
          <h1 className="text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
            Join us. <br />
            <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Travel smarter.</span>
          </h1>
          <p className="mt-6 text-xl text-slate-600 font-medium leading-relaxed max-w-md">
            Create an account to search for student-run rides, create your own ride baskets, and split taxi fares.
          </p>

          <div className="mt-12 space-y-4 text-base font-semibold text-slate-700">
            <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm px-4 py-3 rounded-2xl border border-white/80 shadow-sm w-fit">
              <span className="text-green-600 text-lg">✓</span>
              <span>Safe student rides</span>
            </div>
            <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm px-4 py-3 rounded-2xl border border-white/80 shadow-sm w-fit">
              <span className="text-green-600 text-lg">✓</span>
              <span>Save travel costs</span>
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
              Register
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-550 font-medium">
              Create your RideBasket account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              autoComplete="name"
            />

            <Input
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="9876543210"
              required
              autoComplete="username"
            />

            <Select
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Select>

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create password"
              required
              autoComplete="new-password"
            />

            <div className="pt-3">
              <Button type="submit" loading={loading} className="w-full">
                Create Account
              </Button>
            </div>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <p className="text-sm sm:text-base text-slate-600 font-medium">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                Login
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Register;