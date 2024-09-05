import { Outlet, useLocation } from "react-router-dom";
import TopNavber from "./components/navber/TopNavber";
import { useState, useEffect } from "react";

function App() {
  const [scrollColor, setScrollColor] = useState(false);
  const [hasContent, setHasContent] = useState(false);
  const location = useLocation();

  const handleScrollColor = () => {
    if (window.scrollY >= 40) {
      setScrollColor(true);
    } else {
      setScrollColor(false);
    }
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
    <main className="text-black">
      <section
        className={`fixed z-50 w-full ${
          scrollColor || hasContent
            ? "top-0 bg-white duration-1000"
            : "md:top-16 transition ease-in-out delay-150 duration-500"
        }`}
      >
        <TopNavber />
      </section>
      <div className="px-5 md:px-20">
        <Outlet />
      </div>
    </main>
  );
}

export default App;
