import { useState } from "react";
import { FaCopy, FaPhoneAlt } from "react-icons/fa";
import { useAppSelector } from "../../redux/hooks";
import { useSingleUserQuery } from "../../redux/features/user/userApi";
import moment from "moment";

const UserInfo = () => {
  const { user } = useAppSelector((state) => state.UserDetails);

  const { data: singleUser } = useSingleUserQuery(user?.user?.id);

  const [copyMessage, setCopyMessage] = useState(""); // State for copy message

  const accountCreateDate = moment(singleUser?.data?.createdAt).format(
    "YYYY-MM-DD"
  );
  const accountUpdateDate = moment(singleUser?.data?.updatedAt).format(
    "YYYY-MM-DD"
  );

  // Copy email to clipboard
  const handleCopy = () => {
    const email = singleUser?.data?.email;
    if (email) {
      navigator.clipboard
        .writeText(email)
        .then(() => {
          setCopyMessage("Email copied to clipboard!");

          setTimeout(() => {
            setCopyMessage("");
          }, 2000);
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    }
  };

  return (
    <div className="p-2 mx-auto bg-white rounded-md font-titlefont">
      <div className="flex pb-4 border-b">
        <ul className="text-xs">
          <p>Create Date: {accountCreateDate}</p>
        </ul>
      </div>

      {/* Email Section */}
      <div className="flex items-center justify-between py-4 border-b">
        <span className="text-gray-600 font-bodyfont">E-mail</span>
        <div className="flex flex-col gap-1 items-center space-x-2">
          <ul className=" flex items-center space-x-2">
            <span className="text-gray-800">{singleUser?.data?.email}</span>
            <button
              className="text-blue-500 flex items-center"
              onClick={handleCopy}
            >
              <FaCopy className="mr-1" />
            </button>
          </ul>
          {copyMessage && (
            <small className=" text-designColor text-xs ml-2">
              {copyMessage}
            </small>
          )}
        </div>
      </div>

      {/* Phone Section */}
      <div className="py-4 border-b">
        <div className="flex items-center space-x-2">
          <FaPhoneAlt className="text-gray-500" />
          <span className="text-gray-800">{singleUser?.data?.phone}</span>
          <span className="text-xs text-gray-500 bg-gray-200 rounded-full px-2">
            mobail
          </span>
        </div>
      </div>

      {/* Address Section */}
      <div className="flex items-center justify-between py-4 border-b">
        <span className="text-gray-600 font-bodyfont">Address</span>
        <span className="text-gray-800">{singleUser?.data?.address}</span>
      </div>

      {/* Location Section */}
      <div className="flex items-center gap-1 justify-end py-4 text-xs">
        <p>Last update</p>
        <div className="flex items-center space-x-2">
          <span className="text-gray-800">: {accountUpdateDate}</span>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
