import { Link } from "react-router-dom";

function EmptyReview() {
  return (
    <div className="flex flex-col items-center justify-center  p-4 text-center bg-gray-100">
      {/* Icon */}
      <Link
        to={"/review"}
        className="flex items-center justify-center w-16 h-16 mb-4 bg-gray-200 rounded-full"
      >
        <span className="text-3xl text-gray-500">+</span>
      </Link>

      {/* Main message */}
      <h2 className="mb-2 text-xl font-semibold text-gray-800">
        No associated review
      </h2>

      {/* Secondary message */}
      <p className="mb-6 text-gray-500">
        To add review to this press the 'Add Review' button
      </p>

      {/* Button */}
      <Link
        to={"/review"}
        className="px-6 py-2 text-white bg-designColor rounded hover:bg-designColor  focus:outline-none"
      >
        Add review
      </Link>
    </div>
  );
}

export default EmptyReview;
