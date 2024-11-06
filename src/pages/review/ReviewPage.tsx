/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaStar } from "react-icons/fa";
import {
  useAddReviewMutation,
  useGetAllReviewQuery,
  useGetTwoReviewQuery,
} from "../../redux/features/review/ReviewApi";

import { useAppSelector } from "../../redux/hooks";
import { useEffect, useState } from "react";
import Toast from "../../components/ulittls/Toast";
import { useNavigate } from "react-router-dom";
import TinyMCEEditor from "../../utils/TinyMCEEditor";
import ReviewCard from "../../utils/ReviewCard";
import { TReview } from "../../utils/types";
import Paginate from "../../ui/Paginate";
import { reviewPaginateOption } from "./Review-constant";

const ReviewPage = () => {
  const { page } = useAppSelector((state) => state.page);
  const { totalItem } = useAppSelector((state) => state.totalItem);
  const [paginateValue, setPaginateValue] = useState<any[]>([]);
  const navigate = useNavigate();
  const { data } = useGetAllReviewQuery(paginateValue);
  const { data: reviewLength } = useGetAllReviewQuery(undefined);
  const { data: twoReviewData } = useGetTwoReviewQuery(undefined);

  const [hover, setHover] = useState<number | null>(null);
  const { user } = useAppSelector((state) => state.UserDetails);
  const [rating, setRating] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [contentDescription, setContentDescription] = useState("");
  const [contentTitle, setContentTitle] = useState("");
  const [addReview] = useAddReviewMutation();

  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
    rating?: string;
  }>({});

  const length = reviewLength?.data ? reviewLength?.data?.length : 0;
  let total = 0;
  let count = 0;

  const handleSubmit = async () => {
    if (!user) {
      navigate("/login", { state: { from: "/review" } });
    }
    let validationErrors = {};
    if (!contentTitle) {
      validationErrors = { ...validationErrors, title: "Title is required." };
    }
    if (!contentDescription) {
      validationErrors = {
        ...validationErrors,
        description: "Description is required.",
      };
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const reviewData = {
      title: contentTitle,
      description: contentDescription,
      rating,
    };
    const res: any = await addReview(reviewData);
    if (res.error) {
      setToastMessage(res.error.data.message);
    } else {
      setToastMessage("Feedback sent successfully");
      setHover(null);
      setRating(0);
      setContentTitle("");
      setContentDescription("");
    }
  };

  const handleDescriptionEditorChange = (content: any) => {
    setContentDescription(content);
    setErrors((prev) => ({ ...prev, description: "" }));
  };
  const handleContentTitleEditorChange = (content: any) => {
    setContentTitle(content);
    setErrors((prev) => ({ ...prev, title: "" }));
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

  const handleCloseToast = () => {
    setToastMessage(null);
  };

  const average = count > 0 ? (total / count).toFixed(2) : "0.00";
  useEffect(() => {
    const paginate = [
      { name: "page", value: page },
      { name: "limit", value: totalItem },
    ];
    setPaginateValue(paginate);
  }, [page, totalItem]);

  return (
    <main className=" md:mt-20 py-20 md:py-20 font-titlefont">
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => handleCloseToast()} />
      )}

      <div className="relative flex gap-8 w-full bg-gray-50 md:p-6 p-1">
        <div className={`relative flex flex-col gap-4 z-0 md:w-1/2 w-full  `}>
          <h3 className="text-xl font-semibold ">Write your review</h3>
          <div className=" flex flex-col gap-2">
            <p>Write Title</p>
            <TinyMCEEditor
              onChange={handleContentTitleEditorChange}
              value={contentTitle}
              height={130}
              toolbar="undo redo | bold italic | alignleft aligncenter"
            />
            {errors.title && <p className="text-red-500">{errors.title}</p>}
            <p>Write description</p>
            <TinyMCEEditor
              onChange={handleDescriptionEditorChange}
              value={contentDescription}
              height={200}
              toolbar="undo redo | bold italic | alignleft aligncenter"
            />
            {errors.description && (
              <p className="text-red-500">{errors.description}</p>
            )}
            <h3 className="text-xl font-semibold ">Select star</h3>
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
          </div>
          <button
            onClick={handleSubmit}
            className="px-4 py-2  bg-designColor opacity-80 hover:opacity-100 duration-500 text-white rounded-lg"
          >
            Submit Review
          </button>
        </div>
        <div className="md:w-1/2 md:flex flex-col hidden gap-8">
          {twoReviewData?.data?.slice(0, 2).map((review: any) => (
            <ReviewCard key={review._id} data={review} />
          ))}
        </div>
      </div>
      <div>
        <div className=" md:flex  justify-between items-center border-b-[1px] py-6  ">
          <div className="">
            <p className=" uppercase font-bodyfont text-xl md:text-4xl text-designColor ">
              our most popular review
            </p>
          </div>

          <div className="flex justify-between gap-8 mt-4 md:mt-0 ">
            <div>
              <p className="md:text-xl text-sm">Total review</p>
              <p className=" font-bodyfont text-2xl mt-3 md:text-4xl">
                {length}
              </p>
            </div>
            <div>
              <p className="md:text-xl text-sm">Avarage rating </p>
              <p className=" font-bodyfont text-2xl mt-3 md:text-4xl">
                {" "}
                {average}%
              </p>
            </div>
          </div>
        </div>

        <div className=" mt-8 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4  justify-between items-center">
          {data?.data?.map((review: TReview) => (
            <ReviewCard data={review} />
          ))}
        </div>
      </div>
      <Paginate
        totalItems={reviewLength?.data?.length}
        limit={6}
        options={reviewPaginateOption}
      ></Paginate>
    </main>
  );
};

export default ReviewPage;
