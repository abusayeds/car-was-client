/* eslint-disable @typescript-eslint/no-explicit-any */
import { MdTimer } from "react-icons/md";
import {
  useAddbookingMutation,
  useBookingQuery,
} from "../../redux/features/booking/bookingApi";
import { useAppSelector } from "../../redux/hooks";

import Toast from "../../components/ulittls/Toast";
import { useState } from "react";
import { useServiseDetailsQuery } from "../../redux/features/servise/ServiseApi";
import EmpectBookinh from "./EmpectBookinh";

const Booking = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const { user } = useAppSelector((state) => state.UserDetails);
  const { booking } = useAppSelector((state) => state);
  const [addBooking] = useAddbookingMutation();
  const { data: service } = useServiseDetailsQuery(booking?.service);

  const { data } = useBookingQuery(booking.slotId);
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const form = event.target;
    const formData = {
      name: form.name.value,
      phone: Number(form.phone.value),
      email: form.email.value,
      slotId: booking.slotId,
      price: service?.data?.price,
      image: service?.data?.image,
      vehicleType: form.vehicleType.value,
      vehicleBrand: form.vehicleBrand.value,
      date: form.date.value,
      startTime: booking.startTime,
      endTime: booking.endTime,
      time: form.time.value,
      address: form.address.value,
      city: form.city.value,
    };

    try {
      const res: any = await addBooking(formData);
      //   console.log(res?.data.data?.verifyPaymentMethod?.pay_status);

      if (res.error) {
        setToastMessage(res.error.data.errorSources[0].message);
      } else {
        setToastMessage(" Booking successful!");
        window.location.href = res?.data?.data?.paymentSession?.payment_url;

        form.reset();
      }
    } catch {
      setToastMessage("Something went wrong");
      form.reset();
    }
  };
  const handleCloseToast = () => {
    setToastMessage(null);
  };
  return (
    <main className="md:my-40 my-20 ">
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => handleCloseToast()} />
      )}
      {booking.slotId === "" ? (
        <div>
          <p className=" font-serif text-4xl">Please Selected a servise ! </p>
        </div>
      ) : (
        <p className=" font-serif text-4xl"> Your are almost down ! </p>
      )}

      {booking?.slotId === "" ? (
        <EmpectBookinh />
      ) : (
        <section className="md:flex  border-t pt-5 ">
          <section className="md:w-1/2 w-full flex flex-col gap-4 font-titlefont">
            <div className=" flex flex-col gap-4">
              <img className="w-full" src={data?.data?.service?.image} alt="" />
              <div className="flex justify-between">
                <p>
                  <span className=" text-gray-500 text-xl">$ </span>
                  <span className="text-xl font-bold">
                    {data?.data?.service?.price}
                  </span>
                  <span className="text-gray-700">
                    /{data?.data?.service?.name}
                  </span>
                </p>
                <p>{booking.date}</p>
              </div>

              <p>{data?.data?.service?.description}</p>
            </div>

            <div className="border p-2">
              <div className="flex items-center gap-1">
                <MdTimer className="text-xl"></MdTimer>
                <p className="font-bold text-xl"> Service info </p>
              </div>
              <p className=" text-sm">
                A car service typically includes inspections, maintenance and/or
                repairs to ensure that your car is running safely and
                efficiently
              </p>
            </div>
          </section>
          <section className="md:w-1/2 w-full md:mt-0 mt-5 md:px-6">
            <div className="flex items-center justify-center ">
              <form
                onSubmit={handleSubmit}
                className="mx-auto w-full max-w-[550px] bg-white"
              >
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={user?.user?.name}
                    id="name"
                    placeholder="Enter your name"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="Enter your phone no"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={user?.user?.userEmail}
                    id="email"
                    placeholder="Enter your email"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>

                <div className="-mx-3 flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label className="mb-3 block text-base font-medium text-[#07074D]">
                        Date
                      </label>
                      <input
                        type="text"
                        name="Date"
                        defaultValue={booking.date}
                        id="date"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label className="mb-3 block text-base font-medium text-[#07074D]">
                        Time
                      </label>
                      <input
                        type="text"
                        name="time"
                        defaultValue={`${booking.startTime} To ${booking.endTime}`}
                        id="time"
                        className="w-full  rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </div>
                  </div>
                </div>
                <div className="-mx-3 flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label className="mb-3 block text-base font-medium text-[#07074D]">
                        VehicleType
                      </label>
                      <select
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        name="vehicleType"
                      >
                        <option selected>Defult</option>
                        <option value="car">car</option>
                        <option value="truck">truck</option>
                        <option value="SUV">SUV</option>
                        <option value="van">van</option>
                        <option value="motorcycle">motorcycle</option>
                        <option value="electricVehicle">electricVehicle</option>
                        <option value="hybridVehicle">hybridVehicle</option>
                        <option value="bicycle">bicycle</option>
                        <option value="tractor">tractor</option>
                      </select>
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label className="mb-3 block text-base font-medium text-[#07074D]">
                        VehicleBrand
                      </label>
                      <input
                        name="vehicleBrand"
                        defaultValue="100"
                        placeholder="vehicleBrand"
                        id="vehicleBrand"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </div>
                  </div>
                </div>
                <p className="mb-3 block text-center text-base font-medium text-[#07074D]">
                  Address{" "}
                </p>
                <div className="-mx-3 flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label className="mb-3 block text-base font-medium text-[#07074D]">
                        Address
                      </label>
                      <input
                        name="address"
                        placeholder="Your address"
                        id="address"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label className="mb-3 block text-base font-medium text-[#07074D]">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        id="city"
                        className="w-full  rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className={`hover:shadow-form w-full rounded-md duration-500 ${
                      booking.slotId === ""
                        ? "opacity-40 cursor-not-allowed"
                        : "opacity-90 hover:opacity-100"
                    } bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none`}
                  >
                    <span>Pay Now</span>
                  </button>
                </div>
              </form>
            </div>
          </section>
        </section>
      )}
    </main>
  );
};

export default Booking;
