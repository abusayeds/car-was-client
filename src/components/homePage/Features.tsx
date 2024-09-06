/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { useHomePageFeaturesQuery } from "../../redux/features/HomePageApi";

const Features = () => {
  const { data, isLoading } = useHomePageFeaturesQuery(undefined);
  if (isLoading) {
    return <p>Loading ...</p>;
  }
  const serviseId = (id : any) => {
    localStorage.setItem("serviseDetailsId", JSON.stringify(id));
  }

  return (
    <main> 
        <p className=" text-xl md:text-4xl text-gray-700 pb-10 text-center uppercase font-titlefont ">OUR,s most popular servise</p>
      <section
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-8 items-center justify-center"
      >
        {data?.data?.map((item: any) => (
          <div
            className="border md:h-[410px] md:overflow-y-auto flex flex-col gap-8 relative overflow-hidden group"
            key={item._id}
          >
            <img
              className="w-full h-60  transition-transform duration-300 ease-in-out group-hover:scale-110"
              src={item.image}
              alt=""
            />
            <div className="flex flex-col gap-4 justify-center items-center px-8 md:pb-0 pb-2">
              <p className="font-bodyfont text-designColor">{item.name}</p>
              <p className="font-titlefont">{item.description}</p>
            </div>
            <div
              className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-40 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
            >
              <Link to= '/servise-details'
                onClick={() => serviseId(item._id)}
                className="text-white bg-designColor px-4 py-2 rounded-full transform translate-y-20 transition-all duration-1000 ease-in-out group-hover:translate-y-0 group-hover:blur-none"
              >
                  View details
              </Link >
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Features;
