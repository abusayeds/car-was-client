/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import { pic } from "../../assets";
import { useEffect, useState } from "react";

const About = () => {
  const statsData = [
    { endValue: 100, label: "CUSTOMER SATISFACTION" },
    { endValue: 15, label: "CARS REPAIRED PER DAY" },
    { endValue: 702, label: "TIRES REPAIRED A YEAR" },
    { endValue: 5125, label: "TIGHTENED BOLTS" },
  ];

  const [counts, setCounts] = useState(statsData.map(() => 0));
  useEffect(() => {
    const intervalIds = statsData.map((stat, index) => {
      const interval = setInterval(() => {
        setCounts((prevCounts) => {
          const newCounts = [...prevCounts];
          if (newCounts[index] < stat.endValue) {
            newCounts[index] += Math.ceil(stat.endValue / 100);
            if (newCounts[index] >= stat.endValue) {
              newCounts[index] = stat.endValue;
              clearInterval(interval); // Clear interval when target reached
            }
          }
          return newCounts;
        });
      }, 30);

      return interval;
    });

    return () => intervalIds.forEach(clearInterval);
  }, [statsData]);

  return (
    <main className="md:mt-36 mt-20 pb-5 px-4 sm:px-8 md:px-12 lg:px-16">
      <section className="flex flex-col md:flex-row gap-8">
        <div className="w-full flex flex-col gap-6 md:w-1/2">
          <p className="text-gray-400 font-bodyfont text-sm sm:text-base">
            We offer a full range of garage services to vehicle owners located
            in Tucson area. All mechanic services are performed by highly
            qualified mechanics. We can handle any car problem.
          </p>
          <p className="text-gray-700 font-titlefont text-sm sm:text-base">
            We offer a full range of garage services to vehicle owners in
            Tucson. Our professionals know how to handle a wide range of car
            services. Whether you drive a passenger car, medium-sized truck, or
            SUV, our mechanics ensure your vehicle will perform at its best
            before leaving our car shop.
          </p>
          <p className="text-gray-800 font-semibold text-base sm:text-lg">
            WHY CHOOSE US
          </p>
          <div className="font-titlefont flex flex-col gap-4 text-gray-600 text-sm sm:text-base">
            <p>
              ✔️ We make auto repair and maintenance more convenient for you
            </p>
            <p>
              ✔️ We are a friendly, helpful, and professional group of people
            </p>
            <p>
              ✔️ Our professionals know how to handle a wide range of car
              services
            </p>
            <p>✔️ We get the job done right — the first time</p>
            <p>✔️ Same-day service for most repairs and maintenance</p>
          </div>
          <Link
            className="text-center uppercase text-white bg-teal-500 p-3 sm:p-4 w-32 sm:w-36 rounded hover:bg-teal-700 duration-500"
            to="/servise"
          >
            our service
          </Link>
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <img
            className="w-full h-auto object-cover"
            src={pic?.about7}
            alt="Description of about7 image"
          />
          <div className="flex gap-4">
            <img
              className="w-1/2 transition-transform duration-300 hover:scale-105"
              src={pic?.about6}
              alt="Description of about6 image"
            />
            <img
              className="w-1/2 transition-transform duration-300 hover:scale-105"
              src={pic?.about8}
              alt="Description of about8 image"
            />
          </div>
        </div>
      </section>
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 items-center justify-between bg-gray-100 p-8 mt-10 text-center gap-4 sm:gap-6 md:gap-8">
        {statsData.map((stat, index) => (
          <div
            key={stat.label}
            className="flex flex-col items-center justify-center gap-1 w-full text-center "
          >
            <p className="text-3xl sm:text-4xl font-bold text-teal-600">
              {stat.label === "CUSTOMER SATISFACTION"
                ? `${counts[index]}%`
                : counts[index]}
            </p>
            <p className="text-xs sm:text-sm md:text-base font-medium text-gray-700">
              {stat.label}
            </p>
          </div>
        ))}
      </section>
    </main>
  );
};

export default About;
