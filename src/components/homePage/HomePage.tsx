import { IoIosCheckmark } from "react-icons/io";
import { pic } from "../../assets";

import { FiPhoneCall } from "react-icons/fi";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import Features from "./Features";
import ReviewSection from "./ReviewSection";
import { NavLink } from "react-router-dom";
import AboutSection from "./AboutSection";
import { useState } from "react";
import { textOptions } from "./constant";
import BannerNavber from "../navber/BannerNevber";

const HomePage = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [direction, setDirection] = useState("right");

  const handleNext = () => {
    setDirection("right");
    setFade(false);
    setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % textOptions.length);
      setFade(true);
    }, 300);
  };

  const handlePrevious = () => {
    setDirection("left");
    setFade(false);
    setTimeout(() => {
      setIndex(
        (prevIndex) => (prevIndex - 1 + textOptions.length) % textOptions.length
      );
      setFade(true);
    }, 300);
  };
  return (
    <main>
      <BannerNavber />
      <AboutSection></AboutSection>
      <section className="md:flex  md:py-20 pt-10 ">
        <div className="md:w-1/2">
          <div className=" flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <p className=" uppercase font-bodyfont"> SERvise message </p>
              <p className="bg-designColor w-24 rounded h-1  "></p>
            </div>
            <p className="  text-gray-700 font-semibold text-4xl ">
              It’s Time to Come and Clean Your Car
            </p>
            <p className=" font-bodyfont">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even.
            </p>
            <div className=" flex flex-col gap-1">
              <li className="flex gap-2 items-center">
                <IoIosCheckmark className=" bg-designColor text-white rounded-s-full"></IoIosCheckmark>
                <p className=" text-gray-800 font-titlefont ">
                  We’re professional and certified car washers
                </p>
              </li>
              <li className="flex gap-2 items-center">
                <IoIosCheckmark className=" bg-designColor text-white rounded-s-full"></IoIosCheckmark>
                <p className=" text-gray-800 font-titlefont ">
                  We use quality material to clean your cars
                </p>
              </li>
              <li className="flex gap-2 items-center">
                <IoIosCheckmark className=" bg-designColor text-white rounded-s-full"></IoIosCheckmark>
                <p className=" text-gray-800 font-titlefont ">
                  We care about our customers satisfaction
                </p>
              </li>
            </div>
            <hr />
            <div>
              <div className=" flex gap-2 items-center text-2xl font-bodyfont">
                <img
                  className="md:w-32 md:h-24 h-12 w-16"
                  src={pic.headerlogos}
                  alt=""
                />
                <p className="  md:text-lg text-xs text-designColor">
                  We have 30+ years of experiences for give you better quality
                  results
                </p>
              </div>
              <div className=" flex items-center gap-4 md:gap-8 mt-4 ">
                <button className=" text-xs md:text-1xl  text-white md:w-52 w-24 h-12 md:h-16 font-titlefont uppercase bg-designColor opacity-80 hover:opacity-100 px-4 py-2 rounded">
                  <NavLink to="/servise"> Book a Service</NavLink>
                </button>
                <div className=" flex items-center gap-4 md:gap-6 md:mt-3 my-5 ">
                  <p className=" text-xl md:text-4xl bg-slate-100 mt-3  p-5 md:w-20 w-16 hover:text-designColor duration-500  rounded-full text-gray-600">
                    <FiPhoneCall></FiPhoneCall>
                  </p>

                  <p className=" font-titlefont text-xs md:text-3xl">
                    +008 8455
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" hidden sm:hidden md:block md:w-1/2">
          <img src={pic.cheanYourCar} alt="" />
        </div>
      </section>
      <Features></Features>
      <section className=" md:text-center flex flex-col md:flex-row justify-between items-center md:pt-20 mt-10 gap-5 md:gap-10  md:px-10">
        <button
          onClick={handlePrevious}
          className="p-4 md:p-6 border rounded-full text-designColor md:block hidden  hover:bg-designColor hover:text-white duration-500"
        >
          <FaChevronLeft />
        </button>

        <div className=" md:mx-auto  md:px-10">
          <div
            className={`transition-all duration-300 flex flex-col md:justify-center md:items-center gap-4 ${
              fade
                ? "opacity-100 translate-x-0"
                : direction === "right"
                ? "-translate-x-10 opacity-0"
                : "translate-x-10 opacity-0"
            }`}
          >
            <div className="flex justify-between items-center">
              <img
                className="h-24 w-24 md:h-32 md:w-32 rounded-full"
                src={textOptions[index][0]}
                alt=""
              />
              <div className="flex text-center gap-4 items-center">
                <button
                  onClick={handlePrevious}
                  className="h-10 w-10 border rounded-full text-designColor flex items-center justify-center md:hidden  hover:bg-designColor hover:text-white duration-500"
                >
                  <FaChevronLeft />
                </button>
                <button
                  onClick={handleNext}
                  className="h-10 w-10 border rounded-full text-designColor flex items-center justify-center md:hidden  hover:bg-designColor hover:text-white duration-500"
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>

            <p className="text-xl md:text-2xl font-semibold">
              {textOptions[index][2]}
            </p>
            <p className="font-titlefont text-gray-400 text-sm md:text-base">
              {textOptions[index][1]}
            </p>
          </div>
        </div>

        <button
          onClick={handleNext}
          className="p-4 md:p-6 border rounded-full text-designColorm md:block hidden hover:bg-designColor hover:text-white duration-500"
        >
          <FaChevronRight />
        </button>
      </section>

      <ReviewSection></ReviewSection>
    </main>
  );
};

export default HomePage;
