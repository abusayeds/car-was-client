/* eslint-disable @typescript-eslint/no-explicit-any */

import { Link } from "react-router-dom";
import {
  useSingleUserQuery,
  useUserBookingsQuery,
} from "../../redux/features/user/userApi";

import { FaShoppingCart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { useDeletebookingMutation } from "../../redux/features/booking/bookingApi";
const UserBooking = () => {
  const { data: userBookings } = useUserBookingsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const { data: singleUser } = useSingleUserQuery(userBookings?.data[0]?.user);
  const [showModal, setShowModal] = useState(false);
  const [deletebooking] = useDeletebookingMutation();
  const shipping = 10;
  let subTotal = 0;

  const confirmDelete = (id: string) => {
    deletebooking(id);
    setShowModal(false);
  };
  if (userBookings?.data) {
    for (const item of userBookings.data) {
      const price = parseFloat(item.price);
      subTotal += price;
    }
  }
  const total = shipping + subTotal;
  return (
    <main className=" md:my-40 my-20  font-titlefont">
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Service Summary</p>
          <p className="text-gray-400">
            Check your items. And select a suitable shipping method.
          </p>
          <div className="mt-8 space-y-3 rounded-lg  bg-white ">
            {userBookings?.data?.map((item: any) => (
              <div className="flex border rounded-lg bg-white ">
                <img
                  className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                  src={item?.image}
                  alt=""
                />
                <div className="flex w-full flex-col px-4 py-4">
                  <span className="float-right text-gray-400">
                    {item?.service?.name}
                  </span>
                  <p className="mt-auto text-lg font-bold">${item?.price}</p>
                </div>
                <button
                  onClick={() => setShowModal(true)}
                  className=" text-4xl text-designColor  opacity-70  hover:opacity-100 duration-500 mr-6"
                >
                  <MdDelete />
                </button>

                {showModal && (
                  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-20">
                    <div className="bg-white rounded-lg p-6 space-y-4 w-80">
                      <h2 className="text-lg font-bold">Confirm Deletion</h2>
                      <p>Are you sure you want to delete this booking?</p>
                      <div className="flex justify-end space-x-3">
                        <button
                          onClick={() => setShowModal(false)}
                          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => confirmDelete(item._id)}
                          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          {userBookings?.data?.length === 0 && (
            <div className="">
              <div className="flex items-center justify-center ">
                <p className="text-4xl bg-blue-200  text-designColor rounded-full p-6 ">
                  <FaShoppingCart></FaShoppingCart>
                </p>
              </div>
              <div className=" flex flex-col gap-5 text-center md:w-5/6 m-auto">
                <p className="text-2xl md:font-semibold">
                  Opps !!! Your service is empty
                </p>
                <p>
                  No service added . Please select service list.{" "}
                  <Link to="/" className="text-blue-500">
                    {" "}
                    Back to Home
                  </Link>
                </p>
              </div>
            </div>
          )}
          <p className="mt-8 text-lg font-medium">Shipping Methods</p>
          <form className="mt-5 grid gap-6">
            <div className="relative">
              <input
                className="peer hidden"
                type="radio"
                name="radio"
                checked
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4">
                <img
                  className="md:w-14 object-contain"
                  src="/images/naorrAeygcJzX0SyNI4Y0.png"
                  alt=""
                />
                <div className="md:ml-5">
                  <span className="mt-2 font-semibold">Fedex Delivery</span>
                  <p className="text-slate-500 text-sm leading-6">
                    <span className="font-semibold"> On time service</span>
                  </p>
                </div>
              </label>
            </div>
          </form>
        </div>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium"> Details info !</p>
          <p className="text-gray-400">
            Complete your order by providing your payment details.
          </p>
          <div className="">
            <label className="mt-4 mb-2 block text-sm font-medium">Name</label>
            <p>{singleUser?.data?.name}</p>
            <label className="mt-4 mb-2 block text-sm font-medium">Email</label>
            <p>{singleUser?.data?.email}</p>
            <label className="mt-4 mb-2 block text-sm font-medium">Phone</label>
            <p>{singleUser?.data?.phone}</p>

            <label className="mt-4 mb-2 block text-sm font-medium">
              Address
            </label>
            <div className="flex flex-col sm:flex-row">
              <p className="w-full rounded-md bg-gray-50 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500">
                {singleUser?.data?.address}
              </p>
              <p className="w-full rounded-md bg-gray-50 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500">
                city
              </p>
            </div>

            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                <p className="font-semibold text-gray-900">$ {subTotal}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Shipping</p>
                <p className="font-semibold text-gray-900">$ {shipping}.00</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-lg font-serif text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900">$ {total}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserBooking;
