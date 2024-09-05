import { NavLink, Outlet } from "react-router-dom";


const AdmiDashboard = () => {
   
   return (
    <main className="md:my-40 my-20 md:flex gap-8 w-full font-titlefont">
      <section className="md:w-1/5 flex flex-col gap-5">
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            isActive ? "bg-blue-500 text-white p-2 rounded" : "p-2"
          }
          end
        >
          Service Management
        </NavLink>
        <NavLink
          to="/admin-dashboard/slot-management"
          className={({ isActive }) =>
            isActive ? "bg-blue-500 text-white p-2 rounded" : "p-2"
          }
        >
          Slot Management
        </NavLink>
        <NavLink
          to="/admin-dashboard/user-management"
          className={({ isActive }) =>
            isActive ? "bg-blue-500 text-white p-2 rounded" : "p-2"
          }
        >
          User Management
        </NavLink>
      </section>
      <section className="text-center w-full ">
        <Outlet />
      </section>
    </main>
  );
};

export default AdmiDashboard;
