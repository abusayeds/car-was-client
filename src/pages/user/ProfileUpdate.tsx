/* eslint-disable @typescript-eslint/no-explicit-any */

import { useAppSelector } from "../../redux/hooks";
import { useUpdateuserMutation } from "../../redux/features/admin/adminApi";
import { useEffect, useState } from "react";
import Toast from "../../components/ulittls/Toast";
import { useNavigate } from "react-router-dom";

import { uploadImageToImgBB } from "../../utils/ImageUpload";
import { useSingleUserQuery } from "../../redux/features/user/userApi";
const ProfileUpdate = () => {
  const { user } = useAppSelector((state) => state.UserDetails);
  const { data: singleUser } = useSingleUserQuery(user?.user?.id);

  const [updateUser] = useUpdateuserMutation();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState<string>("");
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>("");
  const navigate = useNavigate();
  useEffect(() => {
    if (singleUser?.data?.profileImage) {
      setProfileImageUrl(singleUser?.data?.profileImage);
    }
    if (singleUser?.data?.coverImage) {
      setCoverImageUrl(singleUser?.data?.coverImage);
    }
  }, [singleUser]);
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const form = event.currentTarget;

    const formData = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      address: form.address.value,
      profileImage: profileImageUrl,
      coverImage: coverImageUrl,
    };
    const args = {
      id: singleUser?.data?._id,
      data: formData,
    };

    try {
      const res: any = await updateUser(args);

      if (res?.error) {
        setToastMessage(res?.error?.data?.errorSources[0]?.message);
      }

      if (res?.data?.sussess) {
        setToastMessage("Update successful!");
        setTimeout(() => {
          navigate("/user-dashboard/user-review");
        }, 2000);
        form.reset();
      }
    } catch {
      setIsUploading(false);
      setToastMessage("Something went wrong");
      form.reset();
    }
  };
  const profileImgUpload = async (profileImage: any) => {
    setIsUploading(true);
    const imgURL = await uploadImageToImgBB(profileImage);
    if (imgURL) {
      setProfileImageUrl(imgURL);
      setIsUploading(false);
    } else {
      setProfileImageUrl("");
      setIsUploading(false);
    }
  };
  const coverImgUpload = async (profileImage: any) => {
    setIsUploading(true);
    const imgURL = await uploadImageToImgBB(profileImage);
    if (imgURL) {
      setCoverImageUrl(imgURL);
      setIsUploading(false);
    } else {
      setCoverImageUrl("");
      setIsUploading(false);
    }
  };
  const handleCloseToast = () => {
    setToastMessage(null);
  };
  return (
    <div className=" w-full">
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => handleCloseToast()} />
      )}
      <>
        <main className="md:flex  justify-center items-center">
          <div className=" ">
            <form onSubmit={handleSubmit} className="font-titlefont w-full">
              <div className="md:flex gap-2 w-full">
                <ul className="md:w-1/2">
                  <p className="font-bodyfont mt-2">Name</p>
                  <input
                    className="outline-none border p-1 rounded mt-1 w-full"
                    type="text"
                    name="name"
                    defaultValue={singleUser?.data?.name}
                    required
                  />
                </ul>
                <ul className="md:w-1/2">
                  <p className="font-bodyfont mt-2">Address:</p>
                  <input
                    className="outline-none border p-1 rounded mt-1 w-full"
                    type="text"
                    name="address"
                    defaultValue={singleUser?.data?.address}
                    required
                  />
                </ul>
              </div>
              <div className="md:flex gap-2 w-full">
                <ul className="md:w-1/2">
                  <p className="font-bodyfont mt-2">Phone No:</p>
                  <input
                    className="outline-none border p-1 rounded mt-1 w-full"
                    type="text"
                    name="phone"
                    defaultValue={singleUser?.data?.phone}
                    required
                  />
                </ul>
                <ul className="md:w-1/2">
                  <p className="font-bodyfont mt-2">Email address:</p>
                  <input
                    className=" w-full outline-none border p-1 rounded mt-1"
                    type="email"
                    name="email"
                    defaultValue={singleUser?.data?.email}
                    required
                  />
                </ul>
              </div>

              <div className="md:flex gap-2 w-full">
                <ul className="md:w-1/2">
                  <p className="font-bodyfont mt-2">Profile Image:</p>
                  <input
                    type="file"
                    className="outline-none border p-1 rounded mt-1 w-full"
                    accept="image/*"
                    onChange={(e) => {
                      profileImgUpload(e.target.files?.[0] || null);
                    }}
                  />
                  {profileImageUrl && (
                    <ul className="  mt-2">
                      <img
                        src={profileImageUrl}
                        alt="Cover"
                        className="border-2  border-dashed p-1  border-designColor w-32 h-32  rounded-md object-cover"
                      />
                    </ul>
                  )}
                </ul>
                <ul className="md:w-1/2">
                  <p className="font-bodyfont mt-2">Cover Image:</p>
                  <input
                    type="file"
                    className="outline-none border p-1 rounded mt-1 w-full"
                    accept="image/*"
                    onChange={(e) => {
                      coverImgUpload(e.target.files?.[0] || null);
                    }}
                  />
                  {coverImageUrl && (
                    <ul className="  mt-2">
                      <img
                        src={coverImageUrl}
                        alt="Cover"
                        className="border-2  border-dashed p-1  border-designColor w-32 h-32  rounded-md object-cover"
                      />
                    </ul>
                  )}
                </ul>
              </div>
              {isUploading ? (
                <p className=" text-center p-2 rounded bg-designColor hover:opacity-90 cursor-pointer duration-500 text-white mt-4">
                  {" "}
                  Loading ...
                </p>
              ) : (
                <input
                  className=" p-2 rounded bg-designColor hover:opacity-90 cursor-pointer duration-500 text-white mt-4"
                  type="submit"
                  value="Update profile"
                  disabled={isUploading}
                />
              )}
            </form>
          </div>
        </main>
      </>
    </div>
  );
};

export default ProfileUpdate;
