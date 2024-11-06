import React, { useState } from "react";
import {
  useDeleteReviewMutation,
  useGetAllReviewQuery,
} from "../../redux/features/review/ReviewApi";
import { TReview } from "../../utils/types";
import { FaStar } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import Toast from "../../components/ulittls/Toast";

const ReviewManagement = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 4;

  const { data: allReview } = useGetAllReviewQuery(undefined);
  const [deleteReview] = useDeleteReviewMutation();

  const handleDelete = async (id: string) => {
    const res = await deleteReview(id);
    if (res?.data?.success) {
      setToastMessage("Review deleted successfully");
      setShowDeleteModal(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setSelectedReviewId(id);
    setShowDeleteModal(true);
  };

  const handleCloseToast = () => {
    setToastMessage(null);
  };

  const handleCancelDelete = () => {
    setSelectedReviewId(null);
    setShowDeleteModal(false);
  };

  const totalPages = Math.ceil(allReview?.data?.length / reviewsPerPage);
  const currentReviews = allReview?.data?.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <main className="flex flex-col gap-8">
      {toastMessage && (
        <Toast message={toastMessage} onClose={handleCloseToast} />
      )}
      <p className=" text-lg">Our Total {allReview?.data?.length} Review </p>
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold text-gray-800">
              Confirm Deletion
            </h2>
            <p className="text-gray-600 mt-2">
              Are you sure you want to delete this review?
            </p>
            <div className="flex justify-end mt-4 gap-2">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                onClick={handleCancelDelete}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() =>
                  selectedReviewId && handleDelete(selectedReviewId)
                }
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {currentReviews?.map((review: TReview, index: number) => (
        <div className="bg-slate-50 p-4" key={index}>
          <div className="flex justify-between items-center">
            <ul className="flex">
              <img
                className="w-16 h-16 rounded-full"
                src={review?.user?.profileImage}
                alt=""
              />
              <ul className="text-start ml-4">
                <p>{review?.user?.name}</p>
                <div className="flex items-center mt-2 space-x-1">
                  {[...Array(5)].map((_, i) => {
                    const starValue = i + 1;
                    const isRated = review?.rating > 0;
                    return (
                      <FaStar
                        key={i}
                        className={`cursor-pointer text-lg ${
                          isRated && starValue <= review?.rating
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                      />
                    );
                  })}
                  <span className="text-gray-500 text-sm ml-2"> out of 5</span>
                </div>
              </ul>
            </ul>
            <button onClick={() => handleDeleteClick(review._id)}>
              <MdDeleteOutline className="text-3xl text-deleteColor opacity-70 hover:opacity-100 duration-500" />
            </button>
          </div>
          <div className="text-center">
            <h4
              dangerouslySetInnerHTML={{ __html: review?.title }}
              className="text-lg font-bold text-gray-800"
            ></h4>
            <p
              dangerouslySetInnerHTML={{ __html: review?.description }}
              className="text-gray-600 italic mt-1"
            ></p>
          </div>
        </div>
      ))}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-gray-800">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </main>
  );
};

export default ReviewManagement;
