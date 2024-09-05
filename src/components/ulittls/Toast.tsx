import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

const Toast = ({ message, duration = 3000, onClose }: ToastProps) => {
  const [width, setWidth] = useState("100%");

  useEffect(() => {
    const startTransition = setTimeout(() => {
      setWidth("0%");
    }, 100);

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      clearTimeout(startTransition);
      clearTimeout(timer);
    };
  }, [duration, onClose]);

  return (
    <div
      className={`fixed top-[-10px] left-1/2 transform -translate-x-1/2 p-4 rounded shadow-lg z-50 transition-all duration-300 ${
        message ? "top-[10px]" : "top-[-80px]"
      } bg-blue-500 w-auto text-white flex items-center`}
    >
      <p className=" text-lg">{message}</p>
      <div
        className="h-1 bg-designColor mt-2 absolute bottom-0 left-0"
        style={{
          width: width,
          transition: `width ${duration}ms linear`,
        }}
      ></div>
    </div>
  );
};

export default Toast;

//  <div className=" md:w-3/6 w-full bg-gray-50 md:p-6 p-1">
     
//         <div>
//           <h3 className="text-xl font-semibold mb-4 up">Write your review</h3>

//           <textarea
//             className="w-full p-2 border border-gray-300 rounded-md mb-4"
//             placeholder="Write your feedback here..."
//             value={feedback}
//             onChange={(e) => setFeedback(e.target.value)}
//           />
//           <h3 className="text-xl font-semibold mb-4 up">Selects star</h3>
//           <div className="flex mb-4">
//             {[...Array(5)].map((_, index) => {
//               const starValue = index + 1;
//               return (
//                 <FaStar
//                   key={index}
//                   className={`cursor-pointer text-2xl ${
//                     starValue <= (hover || rating)
//                       ? "text-yellow-500"
//                       : "text-gray-300"
//                   }`}
//                   onMouseEnter={() => setHover(starValue)}
//                   onMouseLeave={() => setHover(null)}
//                   onClick={() => setRating(starValue)}
//                 />
//               );
//             })}
//           </div>

//           <button
//             onClick={handleSubmit}
//             className="px-4 py-2 bg-green-600 text-white rounded-lg"
//           >
//             Submit Review
//           </button>
//         </div>
//       </div> 