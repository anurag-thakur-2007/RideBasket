import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">

      <Navbar />

      <main className="flex-1 px-5 py-6 max-w-7xl mx-auto w-full">

        {children}

      </main>

      <Footer />

    </div>
  );
};

export default MainLayout;