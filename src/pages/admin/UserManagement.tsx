/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetAllBookingQuery } from "../../redux/features/admin/adminApi";

const UserManagement = () => {
  const { data } = useGetAllBookingQuery(undefined);
  const [role, setRole] = useState("");

  return (
    <div className="relative overflow-x-auto font-titlefont">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              User Name
            </th>
            <th scope="col" className="px-6 py-3">
              Phone No :
            </th>
            <th scope="col" className="px-6 py-3">
              Address :
            </th>
            <th scope="col" className="px-6 py-3">
              vehicleType
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Time
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((booking: any) => (
            <tr
              key={booking._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 "
            >
              <td className="px-6 py-4">{booking.name}</td>
              <td className="px-6 py-4">{booking.phone}</td>
              <td className="px-6 py-4">{booking.address}</td>
              <td className="px-6 py-4">{booking.vehicleType}</td>
              <td className="px-6 py-4">{booking.date}</td>
              <td className="px-6 py-4">{booking.time}</td>
              <select
                onChange={(e: any) => setRole(e.target.value)}
                className="border my-4 p-2 rounded-lg outline-none"
              >
                <option selected disabled>
                  Edit role
                </option>
                <option value="admin">admin</option>
                <option value="user">user</option>
              </select>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
