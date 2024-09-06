import { FaRegUser } from "react-icons/fa";
import { useAppSelector } from "../../redux/hooks";
import ProfileUpdateModel from "./ProfileUpdateModel";
import { useState } from "react";
import { useSingleUserQuery } from "../../redux/features/user/userApi";


const AccountInfo = () => {
  const { user } = useAppSelector((state) => state.UserDetails);
  const [openProfileUpdateModel, setOpenProfileUpdateModel] = useState(false);
  const { data: singleUser } = useSingleUserQuery(user?.user?.id);

  const data = {
    singleUser,
    openProfileUpdateModel,
  };
  const handleProfileUpdateModel = () => {
    setOpenProfileUpdateModel(false);
  };
  return (
    <main className=" md:my-40 my-20 md:flex w-[80%] mx-auto ">
      <ProfileUpdateModel
        data={data}
        onClose={handleProfileUpdateModel}
      ></ProfileUpdateModel>
      <section className=" bg-gray-200 md:w-1/3 flex flex-col gap-5 justify-center items-center md:p-4 p-2">
     
        <FaRegUser className="text-9xl bg-white text-designColor p-4 rounded-full"></FaRegUser>
        <p className=" font-titlefont text-3xl">{singleUser?.data?.name}</p>
        <button
          onClick={() => setOpenProfileUpdateModel(true)}
          className=" text-sm underline hover:text-green-800 duration-500 font-semibold"
        >
          Edit profile
        </button>
      </section>
      <section className="w-full gap-8  md:px-20 md:mt-0 mt-5">
        <p className=" border-b-2 py-4 font-serif text-4xl">Information</p>
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 mt-5">
          <div className=" flex flex-col gap-2">
            <p className=" font-semibold font-titlefont ">Email</p>
            <p className="  font-titlefont"> {singleUser?.data?.email}</p>
          </div>
          <div className=" flex flex-col gap-2">
            <p className=" font-semibold font-titlefont ">Phone</p>
            <p className="  font-titlefont">{singleUser?.data?.phone}</p>
          </div>
          <div className=" flex flex-col gap-2">
            <p className=" font-semibold font-titlefont ">Address</p>
            <p className="  font-titlefont"> {singleUser?.data?.address}</p>
          </div>
          <div className=" mt-5">
            Active now
            <small className="bg-green-700 ml-3  px-2   rounded-full animate-pulse"></small>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AccountInfo;
