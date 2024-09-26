/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import {
  useServiseDetailsQuery,
  useSlotsQuery,
} from "../../redux/features/servise/ServiseApi";
import Calendar from "react-calendar";
import { SlCalender } from "react-icons/sl";
import { useAppDispatch } from "../../redux/hooks";
import { booking } from "../../redux/features/booking/bookingSlice";
import { Link } from "react-router-dom";
export type TBookingData = {
  slotId: string;
  date: string;
  startTime: string;
  endTime: string;
  service: string;
};
const ServiseDetails = () => {
  const [serviseId] = useState(() => {
    const savedRengeValue = localStorage.getItem("serviseDetailsId");
    return savedRengeValue ? JSON.parse(savedRengeValue) : "";
  });
  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | null>(
    null
  );
  const dispatch = useAppDispatch();
  const [bookingData, setBookingData] = useState<any>(null);

  const { data } = useServiseDetailsQuery(serviseId);
  const { data: slots } = useSlotsQuery(serviseId);

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const today = new Date();
  const sixMonthsFromToday = new Date(
    today.getFullYear(),
    today.getMonth() + 6,
    today.getDate()
  );

  const handleDateChange = (value: any) => {
    if (value instanceof Date) {
      setSelectedDate(value);
    } else if (Array.isArray(value) && value[0] instanceof Date) {
      setSelectedDate(value[0]);
    }
    setIsCalendarOpen(false);
  };

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const handleBookingClick = (index: number) => {
    setSelectedSlotIndex(index);
  };
  return (
    <main className=" md:my-40 my-20 md:flex font-titlefont">
      <section className=" flex flex-col gap-4 md:w-1/2">
        <div>
          <img className="w-full" src={data?.data?.image} alt="" />
        </div>
        <p className=" font-bodyfont"> Servise Over view</p>
        <div className=" flex flex-col gap-1">
          <p className=" text-4xl text-designColor">{data?.data?.name}</p>
          <p> Price : {data?.data?.price}</p>
          <p>The time of this serise is {data?.data?.duration} minutes</p>
        </div>
        <p className=" text-sm">{data?.data?.description}</p>
      </section>
      <section className="md:w-1/2 mt-5 md:mt-0 md:px-10  flex flex-col gap-4">
        <p className=" text-3xl">Time slots booking </p>

        <table className="table-auto w-full">
          <thead>
            <tr className="bg-slate-200 text-gray-700 font">
              <th className="text-start px-2 md:text-lg text-xs py-1 sm:px-4 sm:py-2">
                Start Time
              </th>
              <th className="text-start px-2 md:text-lg text-xs py-1 sm:px-4 sm:py-2">
                End Time
              </th>
              <th className="text-start px-2 md:text-lg text-xs py-1 sm:px-4 sm:py-2">
                Status
              </th>
              <th className="relative text-start px-2 md:text-lg text-xs py-1 sm:px-4 sm:py-2">
                <div className="flex items-center gap-2">
                  <p>Date</p>
                  <SlCalender
                    className=" text-designColor"
                    onClick={toggleCalendar}
                  ></SlCalender>
                </div>
                {isCalendarOpen && (
                  <div className="absolute z-10 right-0 bg-white p-5 flex gap-5">
                    <Calendar
                      onChange={handleDateChange}
                      value={selectedDate}
                      minDate={today}
                      maxDate={sixMonthsFromToday}
                      className=" md:w-96 text-xs md:text-lg"
                    />
                  </div>
                )}
              </th>
              <th className="text-start px-2 md:text-lg text-xs py-1 sm:px-4 sm:py-2">
                Selected
              </th>
            </tr>
          </thead>
          <tbody className="mt-4 sm:mt-8">
            {slots?.data?.map((slot: any, index: number) => (
              <tr key={index} className="border-b">
                <td className="px-2 md:text-sm text-xs py-2 sm:px-4 sm:py-4">
                  {slot.startTime}
                </td>
                <td className="px-2 md:text-sm text-xs py-2 sm:px-4 sm:py-4">
                  {slot.endTime}
                </td>
                <td
                  className={`px-2 md:text-sm text-xs py-2 sm:px-4 sm:py-4 ${
                    slot.isBooked === "booked" &&
                    "text-designColor font-bodyfont"
                  } ${
                    selectedSlotIndex === index
                      ? "text-designColor font-bodyfont"
                      : ""
                  } `}
                >
                  {" "}
                  {slot.isBooked}
                </td>
                <td className="px-2 md:text-sm text-xs py-2 sm:px-4 sm:py-4">
                  {selectedDate.toLocaleDateString()}.
                </td>
                <td className="md:text-sm text-xs py-2 sm:px-4 sm:py-4">
                  <button
                    type="button"
                    className={`bg-blue-600 rounded   md:px-4 p-2 text-center md:py-3 text-white ${
                      slot.isBooked === "booked" &&
                      "opacity-40 cursor-not-allowed hidden "
                    } ${
                      selectedSlotIndex !== null && selectedSlotIndex !== index
                        ? "opacity-40 cursor-not-allowed "
                        : ""
                    }`}
                    onClick={() => {
                      handleBookingClick(index);
                      setBookingData({
                        slotId: slot._id,
                        date: selectedDate.toLocaleDateString(),
                        startTime: slot.startTime,
                        endTime: slot.endTime,
                        service: slot.service,
                      });
                    }}
                    disabled={
                      selectedSlotIndex !== null &&
                      selectedSlotIndex !== index &&
                      slot.isBooked === "booked"
                    }
                  >
                    Booking
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          className={` flex gap-4 mt-6 ${
            selectedSlotIndex !== null ? " " : " duration-1000 hidden"
          } `}
        >
          <button
            onClick={() => dispatch(booking(bookingData))}
            className=" text-white rounded bg-blue-600 px-6 py-2 opacity-80 hover:opacity-100 duration-500"
          >
            <Link to="/booking"> Book This Service</Link>
          </button>
          <button
            onClick={() => {
              setSelectedSlotIndex(null);
              setBookingData(null);
            }}
            className=" rounded bg-designColor text-white px-6 py-2 opacity-80 hover:opacity-100 duration-500"
          >
            Close
          </button>
        </div>
      </section>
    </main>
  );
};

export default ServiseDetails;
