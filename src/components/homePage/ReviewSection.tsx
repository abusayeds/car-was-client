/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  useGetAllReviewQuery,
  useGetTwoReviewQuery,
} from "../../redux/features/review/ReviewApi";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import ReviewCard from "../../utils/ReviewCard";

const ReviewSection = () => {
  const { data: reviewLength } = useGetAllReviewQuery(undefined);
  const { data } = useGetAllReviewQuery(undefined);
  const { data: TwoReviewData } = useGetTwoReviewQuery(undefined);

  const length = reviewLength?.data ? reviewLength.data.length : 0;
  let total = 0;
  let count = 0;

  if (data?.data && Array.isArray(data.data)) {
    for (const item of data.data) {
      const start = parseFloat(item.rating);
      if (!isNaN(start)) {
        total += start;
        count++;
      }
    }
  }

  const average = count > 0 ? (total / count).toFixed(2) : "0.00";

  return (
    <main className=" md:flex py-20 md:py-20 ">
      <div className=" text-center w-full  font-titlefont ">
        <p className=" py-2 text-2xl md:text-4xl font-titlefont">
          Review & Feedback
        </p>
        <p> Trusted by global companies</p>
        <div className=" flex flex-col  gap-8 md:px-6 mt-10">
          <div className="  md:flex justify-between items-center   border-b-[1px] py-2 ">
            <div className="flex gap-4">
              <ul>
                <p className="text-xl font-bodyfont ">Total review</p>
                <p className=" text-designColor font-bodyfont text-1xl">
                  {length}
                </p>
              </ul>
              <ul>
                <p className="text-xl font-bodyfont ">Avarage rating</p>
                <p className=" text-designColor font-bodyfont text-1xl">
                  {average}% <small> out of {total}</small>
                </p>
              </ul>
            </div>
            <Link
              to={"/review"}
              className=" flex gap-1 md:mt-0 mt-2 rounded  items-center bg-designColor  bg-opacity-80 hover:bg-opacity-100 duration-500 text-white px-2 py-1 "
            >
              <MdEdit />
              <button> Write a Review</button>
            </Link>
          </div>
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 ">
            {TwoReviewData?.data?.map((review: any) => (
              <ReviewCard key={review._id} data={review}></ReviewCard>
            ))}
          </div>
        </div>
        <div className="mt-6 px-6">
          <button className="px-6  py-2 bg-designColor  text-white opacity-80 hover:opacity-100 duration-500  rounded-lg">
            <Link to="/review"> See All Reviews</Link>
          </button>
        </div>
      </div>
    </main>
  );
};

export default ReviewSection;
