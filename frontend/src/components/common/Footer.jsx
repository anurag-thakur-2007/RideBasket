const Footer = () => {
  return (
    <footer className="border-t border-blue-100 bg-gradient-to-r from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-base sm:text-lg text-slate-700">
        
        <p className="font-semibold">
          © {new Date().getFullYear()}{" "}
          <span className="font-bold text-slate-900">
            RideBasket
          </span>
        </p>

        <p className="font-semibold">
          Developed by{" "}
          <span className="font-bold text-blue-600">
            Anurag Thakur
          </span>
        </p>

      </div>
    </footer>
  );
};

export default Footer;