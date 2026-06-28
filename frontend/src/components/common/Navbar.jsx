import { Link } from "react-router-dom";
import {
  FaHome,
  FaPlusCircle,
  FaClipboardList,
  FaInbox,
  FaUserCircle,
} from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 shadow-lg">

      <div className="max-w-7xl mx-auto px-5">

        <div className="flex items-center justify-between h-16">

          <Link
            to="/home"
            className="text-2xl font-bold text-white"
          >
            🚖 RideBasket
          </Link>

          <div className="flex gap-6 text-white">

            <Link
              to="/home"
              className="flex items-center gap-2 hover:text-yellow-300 transition"
            >
              <FaHome />
              Home
            </Link>

            <Link
              to="/create-basket"
              className="flex items-center gap-2 hover:text-yellow-300 transition"
            >
              <FaPlusCircle />
              Create
            </Link>

            <Link
              to="/my-baskets"
              className="flex items-center gap-2 hover:text-yellow-300 transition"
            >
              <FaClipboardList />
              My Baskets
            </Link>

            <Link
              to="/my-requests"
              className="flex items-center gap-2 hover:text-yellow-300 transition"
            >
              <FaInbox />
              Requests
            </Link>

            <Link
              to="/profile"
              className="flex items-center gap-2 hover:text-yellow-300 transition"
            >
              <FaUserCircle />
              Profile
            </Link>

          </div>

        </div>

      </div>

    </nav>
  );
};

export default Navbar;