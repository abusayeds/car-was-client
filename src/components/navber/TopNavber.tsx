import { CiUser } from "react-icons/ci";

import { IoClose } from "react-icons/io5";
import { Link, NavLink, useLocation } from "react-router-dom";
import { pic } from "../../assets";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logOut } from "../../redux/features/authantication/AuthenticationSlice";
import { useEffect, useState } from "react";
import Toast from "../ulittls/Toast";
import { CgProfile } from "react-icons/cg";
import { RiAdminLine } from "react-icons/ri";

const TopNavber = () => {
  //   const [open, setOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleCloseToast = () => {
    setToastMessage(null);
  };
  const { user } = useAppSelector((state) => state.UserDetails);

  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logOut());
    setToastMessage("Log out successful ! ");
  };

  return (
    <section className="">
      {/* Toast Component */}
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => handleCloseToast()} />
      )}
      <main className=" bg-white flex justify-between items-center md:mx-20 px-5 ">
        <div className=" flex justify-around items-center md:w-1/6 w-1/2 ">
          <div className=" md:hidden">
            <IoClose className="text-xl"></IoClose>
          </div>
          <NavLink to="/" className=" uppercase md:text-3xl text-sm ">
            <img
              className="  h-16 sm:h-20 md:h-24 lg:h-28 "
              src={pic.headerlogos}
              alt=""
            />
          </NavLink>
        </div>

        <div className=" md:w-10/12 w-1/2 flex justify-between items-center ">
          <div className=" md:flex w-full  hidden justify-center items-center">
            <div className="flex gap-10">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? " text-designColor duration-500 " : ""
                }
              >
                Home
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? " text-designColor duration-500 " : ""
                }
                to="/servise"
              >
                Servise
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? " text-designColor duration-500 " : ""
                }
                to="/booking"
              >
                Booking
              </NavLink>
            </div>
          </div>
          <div className="flex w-80  gap-4">
            {/* <ul className=" flex gap-1">
              <p className=" md:block hidden"> Search</p>
              <CiSearch className="text-2xl font-bold"></CiSearch>
            </ul> */}
            {user?.user?.role === "user" && (
              <ul className=" flex gap-1">
                <p className=" md:block hidden">Profile</p>
                <CgProfile className=" text-2xl font-bold"></CgProfile>
              </ul>
            )}
            {user?.user?.role === "admin" && (
              <NavLink  className={({ isActive }) =>
                isActive ? " text-designColor duration-500 flex gap-1 " : " flex gap-1"
              } to="/admin-dashboard" >
                <p className=" md:block hidden">Admin Dashboard </p>
                <RiAdminLine className=" text-2xl font-bold"></RiAdminLine>
              </NavLink>
            )}

            {/* {
                !user && <Link to="/login" className=" flex gap-1">
                <p>LogIn</p>
                <CiUser className="text-2xl font-bold"></CiUser>
              </Link>
            } */}
            {!user ? (
              <Link to="/login" className=" flex gap-1">
                <p>LogIn</p>
                <CiUser className="text-2xl font-bold"></CiUser>
              </Link>
            ) : (
              <button onClick={() => handleLogout()}>logout</button>
            )}
          </div>
        </div>
      </main>
    </section>
  );
};

export default TopNavber;
