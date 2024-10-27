/* eslint-disable @typescript-eslint/no-explicit-any */

import { Link } from "react-router-dom";
import { useUserBookingsQuery } from "../../redux/features/user/userApi";
import { useAppSelector } from "../../redux/hooks";
import { FaShoppingCart } from "react-icons/fa";

const UserBooking = () => {
  const { data: userBookings } = useUserBookingsQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnFocus: false,
    pollingInterval: 2,
  });
  const { user } = useAppSelector((state) => state.UserDetails);
  const shipping = 10;
  let subTotal = 0;

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
                    {item?.name}
                  </span>
                  <p className="mt-auto text-lg font-bold">${item?.price}</p>
                </div>
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
            <label className="mt-4 mb-2 block text-sm font-medium">Email</label>
            <p>{user?.user?.userEmail}</p>
            <label className="mt-4 mb-2 block text-sm font-medium">Email</label>
            <p>{user?.user?.user?.phone}</p>

            <label className="mt-4 mb-2 block text-sm font-medium">
              Billing Address
            </label>
            <div className="flex flex-col sm:flex-row">
              <p className="w-full rounded-md  border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500">
                {user?.user?.user?.address}
              </p>
              <p className="w-full rounded-md  border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500">
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
