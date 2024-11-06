import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { RiAdminLine } from "react-icons/ri";
import { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import Toast from "../../components/ulittls/Toast";
import { logOut } from "../../redux/features/authantication/AuthenticationSlice";
const AdmiDashboard = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logOut());
    setToastMessage("Log out successful ! ");
    navigate("/login");
  };
  const handleCloseToast = () => {
    setToastMessage(null);
  };
  return (
    <main className=" my-24 md:flex gap-8 w-full md:p-5 font-titlefont md:bg-slate-100">
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => handleCloseToast()} />
      )}
      <section className=" md:w-1/4 flex flex-col gap-5 bg-slate-50">
        <ul className=" flex items-center  gap-1 p-2   ">
          <RiAdminLine />
          <p className=" font-bodyfont  uppercase">AdMIN DASHBOARD</p>
        </ul>
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            isActive ? "bg-designColor text-white p-2 rounded" : "p-2"
          }
          end
        >
          Service Management
        </NavLink>
        <NavLink
          to="/admin-dashboard/slot-management"
          className={({ isActive }) =>
            isActive ? "bg-designColor text-white p-2 rounded" : "p-2"
          }
        >
          Slot Management
        </NavLink>
        <NavLink
          to="/admin-dashboard/user-management"
          className={({ isActive }) =>
            isActive ? "bg-designColor text-white p-2 rounded" : "p-2"
          }
        >
          User Management
        </NavLink>
        <NavLink
          to="/admin-dashboard/review-management"
          className={({ isActive }) =>
            isActive ? "bg-designColor text-white p-2 rounded" : "p-2"
          }
        >
          Review Management
        </NavLink>
        <button
          className=" hover:bg-gray-300 p-2 duration-500 w-full "
          onClick={() => handleLogout()}
        >
          logout
        </button>
      </section>
      <section className="text-center w-full md:mt-0 mt-8  ">
        <Outlet />
      </section>
    </main>
  );
};

export default AdmiDashboard;
