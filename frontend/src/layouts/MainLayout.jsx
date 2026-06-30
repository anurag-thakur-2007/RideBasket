import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 lg:py-8 pb-24">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;