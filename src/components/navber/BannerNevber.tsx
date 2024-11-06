/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { images } from "../../assets";
import { Link } from "react-router-dom";

const BannerNavber: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 4000);
    }, 4000);

    return () => clearInterval(intervalId);
  }, [images.length]);

  const currentImage = images[currentImageIndex];

  return (
    <main
      className={` relative h-[400px] sm:h-screen md:h-[450px]  ml-[-20px] mr-[-20px] md:ml-[-80px] md:mr-[-80px]  bg-cover md:bg-center transition-all duration-1000 ease-out flex items-center`}
      style={{
        backgroundImage: `url(${currentImage})`,
      }}
    >
      <section
        className={`flex flex-col justify-center items-center md:justify-start gap-20 text-white w-full md:px-20 transform transition-transform duration-1000 ease-in-out `}
      >
        <div className="text-center ">
          <p className="uppercase mt-10 font-bodyfont text-3xl sm:text-3xl font-semibold md:text-4xl lg:text-5xl xl:text-7xl">
            Car Wash For Your Car's
          </p>
        </div>
        <Link
          to="/servise"
          className=" font-titlefont uppercase bg-designColor  hover:opacity-100 p-4 rounded"
        >
          Book a Service
        </Link>
      </section>
    </main>
  );
};

export default BannerNavber;
