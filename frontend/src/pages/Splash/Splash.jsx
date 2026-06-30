import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/common/Loader";
import useAuth from "../../hooks/useAuth";
import logo from "../../assets/logo.png";

const Splash = () => {
  const navigate = useNavigate();
  const { loading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (loading) return;

    const timer = setTimeout(() => {
      navigate(
        isAuthenticated ? "/home" : "/login",
        { replace: true }
      );
    }, 1500);

    return () => clearTimeout(timer);
  }, [loading, isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex flex-col items-center justify-center text-white">
      
      <div className="mb-6">
        <img
          src={logo}
          alt="RideBasket"
          className="h-24 w-24 object-contain mx-auto"
        />
      </div>

      <h1 className="text-5xl font-bold">
        RideBasket
      </h1>

      <p className="mt-3 text-lg text-blue-100">
        Share rides. Save money. Travel together.
      </p>

      <div className="mt-12">
        <Loader />
      </div>

    </div>
  );
};

export default Splash;