import { useAppSelector } from "../../redux/hooks";
import ProfileUpdateModel from "./ProfileUpdateModel";
import { useState } from "react";
import { useSingleUserQuery } from "../../redux/features/user/userApi";

import { FaUser } from "react-icons/fa6";

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
      {/* <section className=" bg-gray-200 md:w-1/3 flex flex-col gap-5 justify-center items-center md:p-4 p-2">
     
        <FaRegUser className="text-9xl bg-white text-designColor p-4 rounded-full"></FaRegUser>
        <p className=" font-titlefont text-3xl">{singleUser?.data?.name} </p>
        <button
          onClick={() => setOpenProfileUpdateModel(true)}
          className=" text-sm underline hover:text-green-800 duration-500 font-semibold"
        >
          Edit profile
        </button>
      </section> */}

      <div className=" bg-gray-200 ">
        <div className="rounded-t-lg h-32  md:w-72 bg-white overflow-hidden">
          <img
            className="object-cover object-top w-full"
            src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
            alt="Mountain"
          />
        </div>
        <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
          <FaUser className="text-9xl  text-designColor bg-white  p-4 rounded-full"></FaUser>
        </div>
        <div className="text-center mt-2">
          <h2 className="font-semibold">{singleUser?.data?.name}</h2>
        </div>
        <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
          <li className="flex flex-col items-center justify-around">
            <svg
              className="w-4 fill-current text-blue-900"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
            <div>2k</div>
          </li>
          <li className="flex flex-col items-center justify-between">
            <svg
              className="w-4 fill-current text-blue-900"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z" />
            </svg>
            <div>10k</div>
          </li>
          <li className="flex flex-col items-center justify-around">
            <svg
              className="w-4 fill-current text-blue-900"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
            </svg>
            <div>15</div>
          </li>
        </ul>
        <div className="py-4 border-t mx-8 mt-2">
          <button
            onClick={() => setOpenProfileUpdateModel(true)}
            className=" text-sm w-1/2 block mx-auto rounded-full bg-gray-900 opacity-90 hover:opacity-100 duration-500 hover:shadow-lg font-semibold text-white py-1"
          >
            Edit profile
          </button>
        </div>
      </div>

      <section className="w-full gap-8  md:px-20 md:mt-0 mt-5">
        <p className=" border-b-2 py-4 font-serif text-4xl">Your Information</p>
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
