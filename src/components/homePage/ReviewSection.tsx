/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FaHeart, FaRegUser, FaStar } from "react-icons/fa";

import { useAppSelector } from "../../redux/hooks";
import {
  useAddReviewMutation,
  useGetAllReviewQuery,
  useGetTwoReviewQuery,
} from "../../redux/features/review/ReviewApi";
import Toast from "../ulittls/Toast";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const ReviewSection = () => {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const [addReview] = useAddReviewMutation();
  const { data } = useGetAllReviewQuery(undefined);
  const { data: TwoReviewData } = useGetTwoReviewQuery(undefined);
  const { user } = useAppSelector((state) => state.UserDetails);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const length = data?.data ? data.data.length : 0;
  let total = 0;
  let count = 0;

  const handleCloseToast = () => {
    setToastMessage(null);
  };

  const handleSubmit = async () => {
    const reviewData = {
      description: feedback,
      name: user?.user.name,
      email: user?.user?.userEmail,
      rating: rating,
    };
    const res: any = await addReview(reviewData);
    if (res.error) {
      setToastMessage(res.error.data.message);
    } else {
      setToastMessage(" Feedback sending ...");
      setHover(null);
      setRating(0);
      setFeedback("");
    }
  };

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
    <main className=" md:flex py-20 md:py-20 ">
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => handleCloseToast()} />
      )}

      <div className="relative md:w-3/6 w-full bg-gray-50 md:p-6 p-1">
        {!user && (
          <div className="absolute inset-0 flex justify-center items-center z-10">
            <div className="bg-black bg-opacity-0 text-transparent w-full h-full flex justify-center items-center transition duration-300 ease-in-out hover:bg-opacity-75 hover:text-white">
              <span className="text-xl font-titlefont">
                Please log in to leave a review
                <Link
                  className="underline uppercase font-bodyfont ml-2"
                  to="/login"
                >
                  Login
                </Link>
              </span>
            </div>
          </div>
        )}
        <div className={`relative z-0 ${!user && "pointer-events-none"}`}>
          <h3 className="text-xl font-semibold mb-4 up">Write your review</h3>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            placeholder="Write your feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <h3 className="text-xl font-semibold mb-4 up">Select star</h3>
          <div className="flex mb-4">
            {[...Array(5)].map((_, index) => {
              const starValue = index + 1;
              return (
                <FaStar
                  key={index}
                  className={`cursor-pointer text-2xl ${
                    starValue <= (hover || rating)
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                  onMouseEnter={() => setHover(starValue)}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => setRating(starValue)}
                />
              );
            })}
          </div>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 opacity-80 hover:opacity-100 duration-500 text-white rounded-lg"
          >
            Submit Review
          </button>
        </div>
      </div>

      <div className=" md:w-5/6 w-full px-6 font-titlefont md:mt-0 mt-4">
        <p className=" py-2 text-2xl md:text-4xl font-titlefont">
          Review & Feedback
        </p>
        <div className=" flex flex-col  gap-8 md:px-6">
          <div className=" flex justify-between  border-b-[1px] py-2 ">
            <div>
              <p className="md:text-xl text-sm">Total review</p>
              <p className=" font-bodyfont text-2xl md:text-4xl">{length}</p>
              <p className=" md:text-sm text-xs text-gray-500">
                Lorem ipsum dolor sit amet.
              </p>
            </div>
            <div>
              <p className="md:text-xl text-sm">Avarage rating</p>
              <p className=" font-bodyfont text-2xl md:text-4xl"> {average}%</p>
              <p className="  md:text-sm text-xs text-gray-500">
                Lorem ipsum dolor sit amet.
              </p>
            </div>
          </div>
          {TwoReviewData?.data?.map((review: any) => (
            <div key={review._id} className="  md:flex gap-10 py-2 border-b-[1px]">
              <div className=" flex gap-4 ">
                <div className=" bg-slate-100 w-20 h-20   flex justify-center items-center p-4">
                  <FaRegUser className=" text-slate-600 text-5xl"></FaRegUser>
                </div>
                <div className=" md:w-52 w-full flex flex-col gap-2">
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
                </div>
              </div>
              <div className=" flex flex-col gap-2">
                <p className="text-xs">
                  {" "}
                  {format(new Date(review.createdAt), "MMMM dd, yyyy")}
                </p>
                <p className=" text-sm font-titlefont">{review.description}</p>
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
        <div className="mt-6 px-6">
          <button className="px-6  py-2 bg-slate-100 opacity-80 hover:opacity-100 duration-500 text-black rounded-lg">
            <Link to="/review"> See All Reviews</Link>
          </button>
        </div>
      </div>
    </main>
  );
};

export default ReviewSection;
