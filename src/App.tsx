import { Outlet, useLocation } from "react-router-dom";
import TopNavber from "./components/navber/TopNavber";
import { useState, useEffect } from "react";
import Footer from "./components/footer/Footer";

function App() {
  const [scrollColor, setScrollColor] = useState(false);
  const [hasContent, setHasContent] = useState(false);
  const location = useLocation();

  const handleScrollColor = () => {
    setScrollColor(window.scrollY >= 40);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollColor);

    return () => {
      window.removeEventListener("scroll", handleScrollColor);
    };
  }, []);

  useEffect(() => {
    setHasContent(location.pathname !== "/");
    setScrollColor(false);
  }, [location]);

  return (
    <main className="">
      <section
        className={`fixed top-0 w-full bg-designColor z-50 text-white  ${
          hasContent ? " " : " "
        }   py-4  duration-300 ${
          scrollColor ? " opacity-100 " : " opacity-95 "
        }`}
      >
        <TopNavber />
      </section>
      <div className="md:px-20 px-6">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}

export default App;
