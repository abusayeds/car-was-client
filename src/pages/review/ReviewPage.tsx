/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaHeart, FaRegUser, FaStar } from "react-icons/fa";
import {
  useGetAllReviewQuery,
 
} from "../../redux/features/review/ReviewApi";
import { format } from "date-fns";

const ReviewPage = () => {
  const { data } = useGetAllReviewQuery(undefined);

  const length = data?.data ? data.data.length : 0;
  let total = 0;
  let count = 0;
  if (data?.data && Array.isArray(data.data)) {
    for (const item of data.data) {
      const price = parseFloat(item.rating);
      if (!isNaN(price)) {
        total += price;
        count++;
      }
    }
  }

  const average = count > 0 ? (total / count).toFixed(2) : "0.00";
  return (
    <main className=" md:mt-20 py-20 md:py-20">
      <div>
        <div className=" md:flex  justify-between items-center border-b-[1px] py-6  ">
          <div className="">
            <p className=" uppercase font-bodyfont text-xl md:text-4xl text-designColor ">our most popular review</p>
          </div>

          <div className="flex justify-between gap-8 mt-4 md:mt-0 ">
          <div>
            <p className="md:text-xl text-sm">Total review</p>
            <p className=" font-bodyfont text-2xl mt-3 md:text-4xl">{length}</p>
          
          </div>
          <div>
            <p className="md:text-xl text-sm">Avarage rating</p>
            <p className=" font-bodyfont text-2xl mt-3 md:text-4xl"> {average}%</p>
           
          </div>
          </div>
        </div>

        <div className=" mt-8 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4  justify-between items-center">
          {data?.data?.map((review: any) => (
            <div className=" p-6 border-[1px] rounded flex flex-col gap-8">
              <div className=" flex gap-4 ">
                <div className=" bg-slate-100 w-20 h-20   flex justify-center items-center p-4">
                  <FaRegUser className=" text-slate-600 text-5xl"></FaRegUser>
                </div>
                <div className=" w-full flex justify-between gap-2 ">
                  <div>
                    <p>{review.name}</p>
                    <p className=" text-sm">
                      Total Review <span>1</span>
                    </p>
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, index) => {
                        const starValue = index + 1;
                        return (
                          <FaStar
                            key={index}
                            className={`cursor-pointer text-2xl ${
                              starValue <= review.rating
                                ? "text-yellow-500"
                                : "text-gray-300"
                            }`}
                          />
                        );
                      })}
                    </div>
                    <p className="text-xs sm:block md:hidden">
                      {format(new Date(review.createdAt), "MMMM dd yyyy")}
                    </p>
                  </div>
                  <div className=" text-center">
                    <p className="text-xs md:block hidden">
                      {format(new Date(review.createdAt), "MMMM dd yyyy")}
                    </p>
                  </div>
                </div>
              </div>
              <div className=" h-10 overflow-y-auto">
              <p className=" text-sm font-titlefont"> Review : lore {review.description}</p>
              </div>
              <div className=" flex flex-col gap-2">
                
                <div className=" flex gap-4 items-center">
                  <button className=" text-xs uppercase px-2 py-1 bg-designColor opacity-70  hover:opacity-100 font-titlefont text-white duration-500 ">
                    DElete review
                  </button>
                  <button className=" text-2xl uppercase px-2 py-1  opacity-70  hover:opacity-100 font-titlefon text-blue-600  duration-500 ">
                    <FaHeart></FaHeart>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ReviewPage;
