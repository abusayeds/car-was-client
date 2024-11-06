/* eslint-disable @typescript-eslint/no-explicit-any */
import { CiUser } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logOut } from "../../redux/features/authantication/AuthenticationSlice";
import { useState } from "react";
import Toast from "../ulittls/Toast";

import { CgProfile } from "react-icons/cg";

import { FaBarsStaggered } from "react-icons/fa6";

const TopNavber = () => {
  const [open, setOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleCloseToast = () => {
    setToastMessage(null);
  };
  const { user } = useAppSelector((state) => state.UserDetails);

  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logOut());
    setToastMessage("Log out successful ! ");
    navigate("/login");
  };
  const [proflieOpen, setProfileOpen] = useState(false);

  const handleToggle = () => {
    setProfileOpen(!proflieOpen);
  };

  const handleDropdown = () => {
    setProfileOpen(false);
  };
  return (
    <section className="   font-titlefont">
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => handleCloseToast()} />
      )}
      <main className="  flex justify-between items-center md:mx-20 px-5 ">
        <div className=" flex justify-around items-center md:w-2/6 w-1/2 ">
          <div className=" md:hidden">
            {open ? (
              <IoClose
                onClick={() => setOpen(!open)}
                className="text-3xl"
              ></IoClose>
            ) : (
              <FaBarsStaggered
                onClick={() => setOpen(!open)}
                className="text-2xl"
              ></FaBarsStaggered>
            )}
          </div>
          <NavLink to="/" className=" uppercase md:text-3xl text-sm ">
            <p>car service</p>
          </NavLink>
        </div>

        <div className=" md:w-10/12  flex justify-between items-center ">
          <div className=" md:flex w-full justify-center items-center">
            <div className="md:flex hidden gap-10">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "relative text-white before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-white before:transition-all before:duration-500"
                    : "relative text-white hover:before:content-[''] hover:before:absolute hover:before:bottom-0 hover:before:left-0 hover:before:w-0 hover:before:h-[2px] hover:before:bg-blue-500 hover:before:transition-all hover:before:duration-500 "
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/servise"
                className={({ isActive }: { isActive: boolean }) =>
                  isActive
                    ? "relative text-white before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-white before:transition-all before:duration-500"
                    : "relative text-white hover:before:content-[''] hover:before:absolute hover:before:bottom-0 hover:before:left-0 hover:before:w-0 hover:before:h-[2px] hover:before:bg-blue-500 hover:before:transition-all hover:before:duration-500 "
                }
              >
                <div className="inline-block">
                  <p>Service</p>
                </div>
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "relative text-white before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-white before:transition-all before:duration-500"
                    : "relative text-white hover:before:content-[''] hover:before:absolute hover:before:bottom-0 hover:before:left-0 hover:before:w-0 hover:before:h-[2px] hover:before:bg-blue-500 hover:before:transition-all hover:before:duration-500 "
                }
                to="/booking"
              >
                Booking
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "relative text-white before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-white before:transition-all before:duration-500"
                    : "relative text-white hover:before:content-[''] hover:before:absolute hover:before:bottom-0 hover:before:left-0 hover:before:w-0 hover:before:h-[2px] hover:before:bg-blue-500 hover:before:transition-all hover:before:duration-500 "
                }
                to="/review"
              >
                Review
              </NavLink>
            </div>
          </div>
          <div className="flex md:w-80  gap-4">
            {user?.user?.role === "user" && (
              <div className="relative inline-block text-left">
                <ul
                  onClick={handleToggle}
                  className=" flex md:gap-6   md:justify-between  items-center "
                >
                  <div className=" ">{/* <Count></Count> */}</div>
                  <div className="flex gap-1">
                    <p>Profile</p>
                    <CgProfile className=" text-2xl font-bold"></CgProfile>
                  </div>
                </ul>

                <div
                  className={`absolute right-0 mt-2  font-titlefont z-50  bg-white border  text-black rounded-md shadow-lg  transition-opacity duration-300 ease-in-out ${
                    proflieOpen
                      ? "opacity-100"
                      : "opacity-0 pointer-events-none"
                  }`}
                >
                  <ul className=" flex flex-col justify-center items-center text-center gap-3 text-sm w-36 h-36">
                    <NavLink
                      to="/user-dashboard"
                      className=" hover:bg-gray-300 p-1 duration-500 w-full "
                      onClick={() => handleDropdown()}
                    >
                      Account info
                    </NavLink>
                    <NavLink
                      to="/my-bookings"
                      className=" hover:bg-gray-300 p-1 duration-500 w-full "
                      onClick={() => handleDropdown()}
                    >
                      Your booking
                    </NavLink>
                    {user && (
                      <button
                        className=" hover:bg-gray-300 p-1 duration-500 w-full "
                        onClick={() => handleLogout()}
                      >
                        logout
                      </button>
                    )}
                  </ul>
                </div>
              </div>
            )}
            {user?.user?.role === "admin" && (
              <div className=" w-full flex items-center">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "relative text-white before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-white before:transition-all before:duration-500"
                      : "relative text-white hover:before:content-[''] hover:before:absolute hover:before:bottom-0 hover:before:left-0 hover:before:w-0 hover:before:h-[2px] hover:before:bg-blue-500 hover:before:transition-all hover:before:duration-500 "
                  }
                  to="/admin-dashboard"
                >
                  Admin
                </NavLink>
              </div>
            )}

            {!user && (
              <Link to="/login" className=" flex gap-1">
                <p>LogIn</p>
                <CiUser className="text-2xl font-bold"></CiUser>
              </Link>
            )}
          </div>
        </div>
      </main>
      {/* small devise */}
      <div
        className={`bg-black md:hidden h-screen gap-10 fixed top-0 transition-all duration-1000 ease-in-out z-50 ${
          open ? "right-0 left-0 top-16" : " right-0 left-0 top-[-100%]"
        } flex flex-col justify-start items-center p-10 space-y-4 overflow-y-auto`}
      >
        <NavLink
          onClick={() => setOpen(!open)}
          className="text-white text-lg "
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          onClick={() => setOpen(!open)}
          className="text-white text-lg "
          to="/servise"
        >
          Service
        </NavLink>
        <NavLink
          onClick={() => setOpen(!open)}
          className="text-white text-lg "
          to="/booking"
        >
          Booking
        </NavLink>
        <NavLink
          onClick={() => setOpen(!open)}
          className="text-white text-lg "
          to="/review"
        >
          Review
        </NavLink>
      </div>
    </section>
  );
};

export default TopNavber;
