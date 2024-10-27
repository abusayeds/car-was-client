import React from "react";

export default function EmpectBookinh() {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:p-6 md:bg-gray-50 min-h-screen">
      {/* Shopping Bag Card */}
      <div className="bg-white rounded-3xl shadow-lg p-6 w-full md:w-1/4 h-[350px] max-w-sm  md:mt-40  flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="">
            <img
              src="https://img.freepik.com/premium-vector/service-logo-template-design-vector_20029-570.jpg"
              alt="Shopping Bag"
              className="w-44 h-44"
            />
          </div>
          <h2 className="text-lg font-semibold mb-2 text-center">
            Your Service is empty
          </h2>
          <p className="text-center text-gray-500 text-sm mb-4">
            Looks likes you haven't made your choice yet
          </p>
          <div className="flex gap-4">
            <button className="bg-teal-400 text-white rounded-full px-4 py-2">
              Back Home
            </button>
          </div>
        </div>
      </div>

      {/* Bear Icon Card */}
      <div className="bg-white rounded-3xl shadow-lg md:p-6 w-full md:w-1/4 h-[350px] max-w-sm  flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="">
            <img
              src="https://thumbs.dreamstime.com/b/oops-emoticons-vector-icon-symbol-isolated-white-background-193475582.jpg"
              alt="Bear Icon"
              className="w-44 h-44"
            />
          </div>
          <h2 className="text-lg font-semibold mb-2 text-center">
            Oops! Service not found
          </h2>
          <p className="text-center text-gray-500 text-sm mb-4">
            Please select a servise
          </p>
          <button className="bg-teal-400 text-white rounded-full px-6 py-2">
            Select Service
          </button>
        </div>
      </div>

      {/* Egg Icon Card */}
      <div className="bg-white rounded-3xl shadow-lg md:p-6 w-full md:w-1/4 h-[350px] max-w-sm md:mt-40 flex items-center justify-center">
        <div className="flex h-auto flex-col items-center justify-center">
          <div className="">
            <img
              src="https://www.shutterstock.com/image-vector/no-orders-concept-character-can-260nw-1617887866.jpg"
              alt="Egg Icon"
              className="w-44 h-44"
            />
          </div>
          <h2 className="text-lg font-semibold mb-2 text-center">
            No order Yet
          </h2>
          <p className="text-center text-gray-500 text-sm mb-4">
            Your booking is empty . Add something from the service
          </p>
          <button className="bg-teal-400 text-white rounded-full px-6 py-2">
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}
