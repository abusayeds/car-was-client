import { IoIosCheckmark } from "react-icons/io";
import { pic } from "../../assets";
import BannerNavber from "../navber/BannerNevber";
import { FiPhoneCall } from "react-icons/fi";
import Features from "./Features";
import ReviewSection from "./ReviewSection";
import {  NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <main>
      <BannerNavber></BannerNavber>
      <section className="md:flex  md:py-20 py-10 ">
        <div className="md:w-1/2">
          <div className=" flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <p className=" uppercase font-bodyfont"> SERvise message </p>
              <p className="bg-designColor w-24 rounded h-1  "></p>
            </div>
            <p className="  text-gray-700 font-semibold text-4xl ">
              It’s Time to Come and Clean Your Car
            </p>
            <p className=" font-titlefont">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even.
            </p>
            <div className=" flex flex-col gap-1">
              <li className="flex gap-2 items-center">
                <IoIosCheckmark className=" bg-teal-400 text-white rounded-s-full"></IoIosCheckmark>
                <p className=" font-titlefont text-designColor">
                  We’re professional and certified car washers
                </p>
              </li>
              <li className="flex gap-2 items-center">
                <IoIosCheckmark className=" bg-teal-400 text-white rounded-s-full"></IoIosCheckmark>
                <p className=" font-titlefont text-designColor">
                  We use quality material to clean your cars
                </p>
              </li>
              <li className="flex gap-2 items-center">
                <IoIosCheckmark className=" bg-teal-400 text-white rounded-s-full"></IoIosCheckmark>
                <p className=" font-titlefont text-designColor">
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
                <p className="  md:text-lg text-xs text-teal-600">
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
      <ReviewSection></ReviewSection>
    </main>
  );
};

export default HomePage;
