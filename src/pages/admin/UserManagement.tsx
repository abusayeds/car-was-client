/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import {
  useGetAllBookingQuery,
  useUpdateuserMutation,
} from "../../redux/features/admin/adminApi";
import Toast from "../../components/ulittls/Toast";

const UserManagement = () => {
  const { data } = useGetAllBookingQuery(undefined);
  console.log(data);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [role, setRole] = useState<any>(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  );
  const [updateUserRole] = useUpdateuserMutation();
  const handleRoleChange = (e: any, bookingId: string) => {
    setRole({
      data: e.target.value,
      id: bookingId,
    });
    // Set the selected booking ID to disable other selects
    setSelectedBookingId(bookingId);
  };

  const handleupdate = async () => {
    const data = {
      role: role.data,
    };
    const args = {
      data: data,
      id: role.id,
    };
    console.log(args);

    try {
      const res: any = await updateUserRole(args);

      if (res.error) {
        setToastMessage(res?.error?.data.message);
      } else {
        setToastMessage("Role update successfully");
      }
    } catch {
      setToastMessage("Something went wrong");
    }
  };

  const handleCloseToast = () => {
    setToastMessage(null);
  };
  return (
    <main>
      <p className="  text-lg py-4">User Management</p>
      <div className="relative overflow-x-auto font-titlefont">
        {toastMessage && (
          <Toast message={toastMessage} onClose={() => handleCloseToast()} />
        )}
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
                <td className="px-6 py-4">{booking?.name}</td>
                <td className="px-6 py-4">{booking?.phone}</td>
                <td className="px-6 py-4">{booking?.address}</td>
                <td className="px-6 py-4">{booking?.vehicleType}</td>
                <td className="px-6 py-4">{booking?.date}</td>
                <td className="px-6 py-4">{booking?.time}</td>
                <select
                  onChange={(e) => handleRoleChange(e, booking.user._id)}
                  className="border my-4 p-2 rounded-lg outline-none"
                  disabled={
                    !!selectedBookingId &&
                    selectedBookingId !== booking?.user?._id
                  }
                >
                  <option selected disabled>
                    {booking?.user?.role}
                  </option>
                  <option value="admin">admin</option>
                  <option value="user">user</option>
                </select>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        className={` ${
          role === false && " hidden"
        }  opacity-80 mt-5 flex items-end gap-6 justify-end`}
      >
        <button
          onClick={() => {
            setSelectedBookingId(null);
            setRole(false);
          }}
          className="  opacity-90 px-6 py-1 font-titlefont rounded-lg  text-white  hover:opacity-100 bg-designColor"
        >
          close
        </button>
        <button
          onClick={() => {
            handleupdate();
            setRole(false);
          }}
          className="  opacity-80 px-6 py-1 font-titlefont  rounded-lg text-white  hover:opacity-100 bg-green-600"
        >
          update
        </button>
      </div>
    </main>
  );
};

export default UserManagement;
