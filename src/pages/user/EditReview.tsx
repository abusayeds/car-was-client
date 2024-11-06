/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FaStar } from "react-icons/fa";
import {
  useSingleReviewQuery,
  useUpdateReviewMutation,
} from "../../redux/features/review/ReviewApi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useState, useEffect } from "react";
import Toast from "../../components/ulittls/Toast";
import TinyMCEEditor from "../../utils/TinyMCEEditor";
import { setSingleRreviewId } from "../../redux/features/review/singleReviewSlice";

const EditReview = () => {
  const dispatch = useAppDispatch();
  const { reviewId } = useAppSelector((state) => state.singleREviewId);
  const { data, isLoading } = useSingleReviewQuery(reviewId);
  const [hover, setHover] = useState<number | null>(null);
  const { user } = useAppSelector((state) => state.UserDetails);
  const [rating, setRating] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [contentDescription, setContentDescription] = useState<string>();
  const [contentTitle, setContentTitle] = useState<string>("");

  const [updateReview] = useUpdateReviewMutation();

  useEffect(() => {
    if (data) {
      setRating(data?.data?.rating);
      setContentDescription(data?.data?.description);
      setContentTitle(data?.data?.title);
    }
  }, [data]);

  const handleSubmit = async () => {
    const updateData = {
      title: contentTitle,
      description: contentDescription,
      rating,
    };
    const args = {
      id: reviewId,
      data: updateData,
    };

    try {
      const res: any = await updateReview(args);
      if (res.error) {
        setToastMessage(res?.error?.errorSources[0]?.message);
      } else {
        setToastMessage("Review updated successfully.");
        setHover(null);
        setRating(0);
        dispatch(setSingleRreviewId(""));
      }
    } catch (error) {
      setToastMessage("An unexpected error occurred.");
    }
  };

  const handleDescriptionEditorChange = (content: string) => {
    setContentDescription(content);
  };

  const handleContentTitleEditorChange = (content: string) => {
    setContentTitle(content);
  };

  const handleCloseToast = () => {
    setToastMessage(null);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <main className="font-titlefont">
      {toastMessage && (
        <Toast message={toastMessage} onClose={handleCloseToast} />
      )}

      <div className="relative flex gap-8 w-full p-1">
        <div
          className={`relative flex flex-col gap-4 z-0 w-full ${
            !user ? "pointer-events-none" : ""
          }`}
        >
          <h3 className="text-xl font-semibold">Write your review</h3>
          <div className="flex flex-col gap-2">
            <p>Write Title</p>
            <TinyMCEEditor
              onChange={handleContentTitleEditorChange}
              value={contentTitle}
              height={130}
              toolbar="undo redo | bold italic | alignleft aligncenter"
            />
            <p>Write Description</p>
            <TinyMCEEditor
              onChange={handleDescriptionEditorChange}
              value={contentDescription}
              height={200}
              toolbar="undo redo | bold italic | alignleft aligncenter"
            />
            <h3 className="text-xl font-semibold">Select Star</h3>
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
          <div className="flex gap-2 items-center">
            <button
              onClick={handleSubmit}
              className="p-2 w-36 bg-designColor opacity-80 hover:opacity-100 duration-500 text-white rounded-lg"
            >
              Update Review
            </button>
            <button
              onClick={() => dispatch(setSingleRreviewId(""))}
              className="p-2 w-20 bg-deleteColor opacity-80 hover:opacity-100 duration-500 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EditReview;
