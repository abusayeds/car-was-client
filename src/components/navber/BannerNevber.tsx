/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { images } from "../../assets";
import { Link } from "react-router-dom";

const BannerNavber: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [animate, setAnimate] = useState<boolean>(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setAnimate(false);

      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);

        setTimeout(() => {
          setAnimate(true);
        }, 500);
      }, 4000);
    }, 4000);

    return () => clearInterval(intervalId);
  }, [images.length]);

  const currentImage = images[currentImageIndex];

  return (
    <main
      className={`relative h-[400px] sm:h-screen md::h-[550px]  ml-[-20px] mr-[-20px] md:ml-[-80px] md:mr-[-80px] lg:h-[550px] bg-cover md:bg-center transition-all duration-1000 ease-out flex items-center`}
      style={{
        backgroundImage: `url(${currentImage})`,
      }}
    >
      <section
        className={`flex flex-col justify-center items-center md:justify-start gap-20 text-white w-full md:px-20 transform transition-transform duration-1000 ease-in-out ${
          animate ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <div className="text-center md:mt-36">
          <p className="uppercase mt-10 font-bodyfont text-3xl sm:text-3xl font-semibold md:text-4xl lg:text-5xl xl:text-7xl">
            Car Wash For Your Car's
          </p>
        </div>
        <Link
          to="/servise"
          className=" font-titlefont uppercase bg-designColor opacity-80 hover:opacity-100 p-4 rounded"
        >
          Book a Service
        </Link>
      </section>
    </main>
  );
};

export default BannerNavber;
