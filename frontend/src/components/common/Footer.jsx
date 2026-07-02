import { FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-blue-100 bg-gradient-to-r from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-base sm:text-lg text-slate-700">

        <p className="font-semibold">
          © {new Date().getFullYear()}{" "}
          <span className="font-bold text-slate-900">
            RideBasket
          </span>{" "}
          | Developed by{" "}
          <span className="font-bold text-blue-600">
            Anurag Thakur
          </span>
        </p>

        <div className="flex items-center gap-5">
          <a
            href="https://www.linkedin.com/in/anurag-thakur-9b6805346/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-700 hover:text-blue-600 transition-colors duration-200 font-medium"
          >
            <FaLinkedin className="text-xl" />
            LinkedIn
          </a>

          <a
            href="https://www.instagram.com/a_uragt_akur/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-700 hover:text-pink-600 transition-colors duration-200 font-medium"
          >
            <FaInstagram className="text-xl" />
            Instagram
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;