/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { useAppSelector } from "../../redux/hooks";
import { CiLocationOn } from "react-icons/ci";
import { Link, Outlet } from "react-router-dom";
import { useSingleUserQuery } from "../../redux/features/user/userApi";
import { uploadImageToImgBB } from "../../utils/ImageUpload";
import { useUpdateuserMutation } from "../../redux/features/admin/adminApi";
import Toast from "../../components/ulittls/Toast";

const AccountInfo = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const { user } = useAppSelector((state) => state.UserDetails);

  const { data: singleUser } = useSingleUserQuery(user?.user?.id);

  const [coverImgLoading, setCoverImgLoading] = useState(false);
  const [ProfileImgLoading, setProfileImgLoading] = useState(false);
  const [updateUser] = useUpdateuserMutation();
  const changeProfileImg = async (profileImage: any) => {
    if (!profileImage) return;
    setProfileImgLoading(true);
    const imgURL = await uploadImageToImgBB(profileImage);
    const formdata = {
      profileImage: imgURL,
    };
    const args = {
      id: singleUser?.data?._id,
      data: formdata,
    };
    if (imgURL) {
      updateUser(args);
      setToastMessage("Image Update Successfully");
      setProfileImgLoading(false);
    } else {
      setProfileImgLoading(false);
      setToastMessage("Something went wrong");
    }
  };
  const changeCoverImg = async (coverImage: any) => {
    setCoverImgLoading(true);
    const imgURL = await uploadImageToImgBB(coverImage);
    const formdata = {
      coverImage: imgURL,
    };
    const args = {
      id: singleUser?.data?._id,
      data: formdata,
    };
    if (imgURL) {
      updateUser(args);
      setToastMessage("Image Update Successfully");
      setCoverImgLoading(false);
    } else {
      setCoverImgLoading(false);
      setToastMessage("Something went wrong");
    }
  };
  const handleCloseToast = () => {
    setToastMessage(null);
  };
  return (
    <div className="min-h-screen my-20  flex justify-center items-center md:p-4">
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => handleCloseToast()} />
      )}
      <div className="bg-white rounded-lg shadow-md w-full max-w-3xl">
        <div className="bg-white rounded-lg shadow-md w-full max-w-3xl">
          <p
            className={` ${
              coverImgLoading ? "block" : "hidden"
            } text-center h-44 text-black text-4xl `}
          >
            Image uploading ...
          </p>
          <div
            className={` ${
              coverImgLoading ? "hidden" : "block"
            } relative h-44 bg-cover bg-center rounded-t-lg cursor-pointer`}
            style={{
              backgroundImage: `url(${
                singleUser?.data?.coverImage ||
                "https://upload.wikimedia.org/wikipedia/commons/7/75/No_image_available.png"
              })`,
            }}
            onClick={() => {
              const coverImageInput =
                document.getElementById("coverImageInput");
              if (coverImageInput) {
                coverImageInput.click();
              }
            }}
          >
            <button
              type="button"
              className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md"
            >
              <FaCamera className="text-blue-600" />
            </button>
            <input
              id="coverImageInput"
              type="file"
              accept="image/*"
              className="absolute top-4 right-4"
              onChange={(e) => {
                changeCoverImg(e.target.files?.[0] || null);
              }}
              style={{ display: "none" }}
            />
          </div>
        </div>

        <div className="p-6 -mt-20 flex flex-col items-center">
          <div
            onClick={() => {
              const profileImageInput =
                document.getElementById("profileImageInput");
              if (profileImageInput) {
                profileImageInput.click();
              }
            }}
            className="relative w-28 h-28 bg-white rounded-full"
          >
            <p
              className={` ${
                ProfileImgLoading ? "block" : "hidden"
              } text-center  text-black  mt-10 `}
            >
              Uploading
            </p>
            <img
              src={
                singleUser?.data?.profileImage ||
                "https://via.placeholder.com/80"
              }
              alt="Profile"
              className={` ${
                ProfileImgLoading ? "hidden" : "block"
              } h-full w-full  rounded-full border-4 border-gray-200`}
            />
            <button className="absolute bottom-4 right-0 bg-white p-1 rounded-full shadow-md">
              <FaCamera className="text-blue-600" />
            </button>
            <input
              id="profileImageInput"
              type="file"
              accept="image/*"
              className="absolute top-4 right-4"
              onChange={(e) => {
                changeProfileImg(e.target.files?.[0] || null);
              }}
              style={{ display: "none" }}
            />
          </div>
          <h2 className="text-xl font-semibold mt-4">
            {singleUser?.data?.name || "Guest"}
            <small
              className="bg-green-700 h-4 rounded-full animate-pulse"
              aria-label="Online status"
            ></small>
          </h2>
          <ul className="mt-2 flex gap-2">
            <CiLocationOn />
            <p className="text-xs font-titlefont">
              {singleUser?.data?.address}
            </p>
          </ul>
        </div>

        <div className="p-4 flex justify-between text-center border-t border-b md:ext-lg text-xs border-gray-200">
          <Link to="/user-dashboard">Your informatin</Link>
          <Link to="/user-dashboard/profile-update">Edit profile </Link>
          <Link to="/user-dashboard/user-review">Your Review</Link>
          <Link to="/user-dashboard/change-password">Change password</Link>
        </div>

        {/* Account Settings Form */}
        <div className="p-6">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
