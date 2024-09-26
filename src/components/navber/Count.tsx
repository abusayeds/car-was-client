/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useMemo } from "react";
import { useUserBookingsQuery } from "../../redux/features/user/userApi";


interface CountTimeEvent {
  date: string;
  startTime: string;
  endTime: string;
}

const Count = () => {
  const { data: userBookings } = useUserBookingsQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnFocus: false,
    pollingInterval: 3000,
  });

  const CountTime: CountTimeEvent[] = useMemo(() => {
    return (
      userBookings?.data?.map((booking: any) => {
        const date = new Date(booking?.date);
        const formattedDate = `${String(date.getDate()).padStart(
          2,
          "0"
        )}-${String(date.getMonth() + 1).padStart(
          2,
          "0"
        )}-${date.getFullYear()}`;

        return {
          date: formattedDate || "",
          startTime: booking.startTime || "",
          endTime: booking.endTime || "",
        };
      }) || []
    );
  }, [userBookings]);

  const [currentEventIndex, setCurrentEventIndex] = useState<number>(0);

  const [date, setDate] = useState<string>("");
  const [hours, setHours] = useState<string>("");
  const [minutes, setMinutes] = useState<string>("");
  const [second, setSecond] = useState<string>("");

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const event = CountTime[currentEventIndex];

      if (!event) {
        return;
      }

      const eventDateTime = new Date(
        `${event.date.split("-").reverse().join("-")}T${event.startTime}`
      );
      const timeDifference = eventDateTime.getTime() - now.getTime();

      if (timeDifference <= 0) {
        if (currentEventIndex < CountTime.length - 1) {
          setCurrentEventIndex(currentEventIndex + 1);
        }
      } else {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
        const seconds = Math.floor((timeDifference / 1000) % 60);
     
        setDate(`${days}`);
        setHours(`${hours}`);
        setMinutes(`${minutes}`);
        setSecond(`${seconds}`);
      }
    };

    calculateCountdown();

    const interval = setInterval(() => {
      calculateCountdown();
    }, 1000);

    return () => clearInterval(interval);
  }, [currentEventIndex, CountTime]);


  if(second === '' ) {
    return null
  }
  console.log(second);
  
  return (
    <div>
      <h2 className="  text-designColor text-xs">Upcoming </h2>
      {currentEventIndex < CountTime.length && (
        <div className=" flex md:gap-2 gap-1">
          <p className="  font-titlefont font-semibold  text-xs">{date}<span>d</span></p>
          <p className="  font-titlefont font-semibold  text-xs">{hours}<span>h</span></p>
          <p className="  font-titlefont font-semibold  text-xs">{minutes}<span>m</span> </p>
          <p className="  font-titlefont font-semibold w-8  text-xs">{second} <span>s</span></p>
        </div>
      )}
    </div>
  );
};

export default Count;
