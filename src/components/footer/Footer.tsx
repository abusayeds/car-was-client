import { FaFacebook, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

import { BsGithub } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <main className=" bg-black opacity-90  font-titlefont md:px-16 p-6 text-gray-400 tracking-wide py-10">
      <div className="max-w-7xl mx-auto">
        <div className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
          <div className="mb-5 flex flex-col gap-4  ">
            <p className="  font-semibold text-white  font-serif">Our Self</p>
            <div className="flex flex-col gap-2 ">
              <p className="tracking-wide">Car servise</p>
              <p className=" tracking-wide uppercase">Dhaka  uttora / C10</p>
            </div>
            <div className="flex flex-col gap-2 tracking-wide">
              <p>Phone : (+088) 1843425697</p>
              <p>Email : carservice@gmail.com</p>
            </div>
          </div>

          <div className="mb-5 flex flex-col gap-4 ">
            <p className="  font-semibold text-white font-serif">Useful Links</p>
            <NavLink
              to="/"
              className=" flex items-center text-base font-normal text-gray-400 tracking-wide cursor-pointer hover:text-designColor duration-300"
            >
              Home
            </NavLink>
            <NavLink
              to="/servise"
              className=" flex items-center text-base font-normal text-gray-400 tracking-wide cursor-pointer hover:text-designColor duration-300"
            >
              service
            </NavLink>
            <NavLink
              to="/review"
              className=" flex items-center text-base font-normal text-gray-400 tracking-wide cursor-pointer hover:text-designColor duration-300"
            >
              Our review
            </NavLink>
            <NavLink
              to="login"
              className=" flex items-center text-base font-normal text-gray-400 tracking-wide cursor-pointer hover:text-designColor duration-300"
            >
              Login
            </NavLink>
            <NavLink
              to="/singnup"
              className=" flex items-center text-base font-normal text-gray-400 tracking-wide cursor-pointer hover:text-designColor duration-300"
            >
              Sign up
            </NavLink>
          </div>
          <div className="mb-5 flex flex-col gap-4 ">
            <p className="  font-semibold text-white">My Services</p>
            <div className=" flex flex-col gap-2">
              <li className="flex items-center">
                <IoIosArrowForward className=" text-yellow-600 font-semibold "></IoIosArrowForward>
                <p className=" text-base font-normal text-gray-400 tracking-wide cursor-pointer hover:text-designColor duration-300">
                  Car Wash
                </p>
              </li>
              <li className="flex items-center">
                <IoIosArrowForward className=" text-yellow-600 font-semibold "></IoIosArrowForward>
                <p className=" text-base font-normal text-gray-400 tracking-wide cursor-pointer hover:text-designColor duration-300">
                  Oil Change
                </p>
              </li>
              <li className="flex items-center">
                <IoIosArrowForward className=" text-yellow-600 font-semibold "></IoIosArrowForward>
                <p className=" text-base font-normal text-gray-400 tracking-wide cursor-pointer hover:text-designColor duration-300">
                  Tire Rotation
                </p>
              </li>
              <li className="flex items-center">
                <IoIosArrowForward className=" text-yellow-600 font-semibold "></IoIosArrowForward>
                <p className=" text-base font-normal text-gray-400 tracking-wide cursor-pointer hover:text-designColor duration-300">
                  Auto Detailing
                </p>
              </li>
              <li className="flex items-center">
                <IoIosArrowForward className=" text-yellow-600 font-semibold "></IoIosArrowForward>
                <p className=" text-base font-normal text-gray-400 tracking-wide cursor-pointer hover:text-designColor duration-300">
                  Interior Polish
                </p>
              </li>
              <li className="flex items-center">
                <IoIosArrowForward className=" text-yellow-600 font-semibold "></IoIosArrowForward>
                <p className=" text-base font-normal text-gray-400 tracking-wide cursor-pointer hover:text-designColor duration-300">
                  Tire Shine
                </p>
              </li>
              <li className="flex items-center">
                <IoIosArrowForward className=" text-yellow-600 font-semibold "></IoIosArrowForward>
                <p className=" text-base font-normal text-gray-400 tracking-wide cursor-pointer hover:text-designColor duration-300">
                  Engine Wash
                </p>
              </li>
            </div>
          </div>
          <div className="mb-5 flex flex-col gap-4 ">
            <p className="font-semibold text-white">Get in Touch</p>

            <div>
              <p>
                A car service typically includes inspections, maintenance and/or
                repairs to ensure that your car is running safely and
                efficiently
              </p>
              <div className="flex gap-8 mt-5">
                <a
                  className=" hover:text-red-600 text-2xl duration-500"
                  href="https://www.facebook.com/profile.php?id=100074503997052"
                  target="_blank "
                >
                  <FaFacebook />
                </a>
                <a
                  className=" hover:text-red-600 text-2xl duration-500"
                  href=""
                  target="_blank "
                >
                  <BsGithub />
                </a>
                <a
                  className=" hover:text-red-600 text-2xl duration-500"
                  href=""
                  target="_blank "
                >
                  <FaWhatsapp />
                </a>
                <a
                  className=" hover:text-red-600 text-2xl duration-500"
                  href="https://www.linkedin.com/in/abu-sayed96/"
                  target="_blank "
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Footer;
