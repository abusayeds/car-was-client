import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { TReview } from "../../utils/types";
import { FaStar } from "react-icons/fa6";
import moment from "moment";
import { useAppDispatch } from "../../redux/hooks";
import { setSingleRreviewId } from "../../redux/features/review/singleReviewSlice";

import Toast from "../../components/ulittls/Toast";
import { useDeleteReviewMutation } from "../../redux/features/review/ReviewApi";
import { Link } from "react-router-dom";

const UserReviedCard = ({ data }: { data: TReview }) => {
  const accountCreateDate = moment(data.createdAt).format("MMMM-DD-YYYY");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  const [deleteReview] = useDeleteReviewMutation();
  const handleDelete = async (id: string) => {
    const res = await deleteReview(id);

    if (res?.data?.success) {
      setToastMessage("Review deleted successfully ");
    }
  };
  const handleCloseToast = () => {
    setToastMessage(null);
  };
  return (
    <div className=" mx-auto md:p-4 border-b border-gray-200 relative">
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => handleCloseToast()} />
      )}

      <div className=" flex justify-between">
        {/* Profile Picture */}
        <div className="flex items-center space-x-4">
          <img
            src={data?.user?.profileImage} // Replace with actual image source
            className="w-12 h-12 rounded-full"
          />

          <div>
            <h3 className=" text-designColor font-semibold">
              {data?.user?.name}
            </h3>
            <p className="text-gray-500 text-sm">{accountCreateDate}</p>
          </div>
        </div>
        <div className="relative">
          <div className="absolute top-4 right-4">
            <button
              onClick={handleToggleMenu}
              className="text-gray-600 hover:text-gray-600 text-2xl focus:outline-none"
            >
              <BsThreeDots />
            </button>
          </div>

          {isMenuOpen && (
            <div className="absolute top-10 right-0 w-32 bg-white shadow-md rounded-md">
              <button
                onClick={() => dispatch(setSingleRreviewId(data._id))}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(data._id)}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Delete
              </button>
              <Link
                to={"/review"}
                className="w-full text-left px-4 p-2 hover:bg-gray-100"
              >
                Add Review
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center mt-2 space-x-1">
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
        <span className="text-gray-500 text-sm ml-2"> out of 5</span>
      </div>

      {/* Review Title and Text */}
      <div className="mt-3">
        <h4
          dangerouslySetInnerHTML={{ __html: data?.title }}
          className="text-lg font-bold text-gray-800"
        ></h4>
        <p
          dangerouslySetInnerHTML={{ __html: data?.description }}
          className="text-gray-600 italic mt-1"
        ></p>
      </div>
    </div>
  );
};

export default UserReviedCard;
