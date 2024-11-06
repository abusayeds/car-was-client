import { FaStar } from "react-icons/fa";
import { TReview } from "./types";
import { format } from "date-fns";

const ReviewCard = ({ data }: { data: TReview }) => {
  const formattedDate = format(new Date(data?.createdAt), "MM dd, yyyy");
  return (
    <div className="bg-white shadow-lg  md:h-[300px] flex flex-col   rounded-lg p-6 border  border-gray-200 text-start ">
      <div className=" flex justify-between">
        <div className="flex  mb-4">
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            const isRated = data?.rating > 0;

            return (
              <FaStar
                key={index}
                className={`cursor-pointer text-2xl ${
                  isRated && starValue <= data.rating
                    ? "text-yellow-500"
                    : "text-gray-300"
                }`}
              />
            );
          })}
        </div>
        <p className=" text-xs ">Date: {formattedDate}</p>
      </div>

      {/* Review Title */}
      <h3
        dangerouslySetInnerHTML={{ __html: data?.title }}
        className="text-xl font-semibold  text-designColor mb-2"
      >
        {}
      </h3>

      {/* Review Description */}
      <div className=" md:h-[400px] overflow-y-auto scrollbar-thin   ">
        <h1
          dangerouslySetInnerHTML={{ __html: data?.description }}
          className="text-gray-600 mb-4"
        ></h1>
      </div>

      {/* User Information */}
      <div className="flex items-center mt-4">
        <img
          src={data?.user?.profileImage}
          alt={data?.user?.name}
          className="w-10 h-10 rounded-full border-2 border-blue-500 mr-3"
        />
        <div className="text-left">
          <h4 className=" text-designColor font-semibold">
            {data?.user?.name}
          </h4>
          <h1
            dangerouslySetInnerHTML={{ __html: data?.title }}
            className="text-gray-500 text-sm"
          >
            {}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
