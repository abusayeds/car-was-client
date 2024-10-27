import { useAppSelector } from "../../redux/hooks";
import ProfileUpdateModel from "./ProfileUpdateModel";
import { useState } from "react";
import { useSingleUserQuery } from "../../redux/features/user/userApi";
import { CiLocationOn } from "react-icons/ci";

const AccountInfo = () => {
  const { user } = useAppSelector((state) => state.UserDetails);

  const { data: singleUser } = useSingleUserQuery(user?.user?.id);
  const [editUser, setEditUser] = useState(false);
  const [AccInfo, setAccInfo] = useState(true);
  const data = {
    singleUser,
  };

  return (
    <main className="md:my-40 my-20 w-[90%] mx-auto">
      <section className=" md:flex gap-10 border-b py-4 font-titlefont ">
        <div className="md:w-1/5">
          <img
            className="object-cover object-top"
            src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
            alt="Mountain"
          />
        </div>
        <div className=" flex  flex-col justify-between md:mt-0 mt-4 ">
          <div className=" flex  flex-col gap-4 ">
            <h2 className="font-semibold">{singleUser?.data?.name}</h2>
            <ul className=" flex gap-2">
              <CiLocationOn />
              <p className=" text-xs  font-titlefont">
                {" "}
                {singleUser?.data?.address}
              </p>
            </ul>

            <div className="">
              Active now
              <small className="bg-green-700 ml-3  px-2   rounded-full animate-pulse"></small>
            </div>
          </div>
          <div className=" flex justify-around gap-4 md:mt-0 mt-4  ">
            <button
              onClick={() => {
                setEditUser(true);
                setAccInfo(false);
              }}
              className=" md:text-sm  text-[10px] md:px-3  px-2 block mx-auto rounded-full bg-gray-900 opacity-90 hover:opacity-100 duration-500 hover:shadow-lg font-semibold text-white py-1"
            >
              Edit profile
            </button>
            <button
              onClick={() => {
                setEditUser(false);
                setAccInfo(true);
              }}
              className=" md:text-sm  text-[10px] md:px-3  px-2 block mx-auto rounded-full bg-gray-900 opacity-90 hover:opacity-100 duration-500 hover:shadow-lg font-semibold text-white py-1"
            >
              Your Info
            </button>
            {/* <button
              //   onClick={() => setOpenProfileUpdateModel(true)}
              className=" md:text-sm  text-[10px] md:px-3  px-2 block mx-auto rounded-full bg-gray-900 opacity-90 hover:opacity-100 duration-500 hover:shadow-lg font-semibold text-white py-1"
            >
              Your booking
            </button> */}
          </div>
        </div>
      </section>
      <section className=" font-titlefont mt-4  md:flex gap-10 md:mt-0 ">
        <div className="md:w-1/4 md:flex hidden flex-col gap-4 ">
          <p className=" font-bold">Active importents</p>
          <p>
            Learn why calculating daily, weekly, and monthly active users is
            important in measuring app and campaign success.
          </p>
          <p>
            <span className=" font-bold text-lg">Help</span>{" "}
            <small className=" text-gray-500">
              to give assistance or support to (someone)
            </small>
          </p>
        </div>
        <div className=" w-full  ">
          {editUser && <ProfileUpdateModel data={data}></ProfileUpdateModel>}
          {AccInfo && (
            <section className=" flex flex-col gap-6 mt-4">
              <ul className=" flex flex-col gap-3">
                <p>Phone : </p>
                <p>{singleUser?.data?.phone}</p>
              </ul>
              <ul className=" flex flex-col gap-3">
                <p>Adress : </p>
                <p>{singleUser?.data?.email}</p>
              </ul>
              <ul className=" flex flex-col gap-3">
                <p>E-mail : </p>
                <p>{singleUser?.data?.address}</p>
              </ul>
            </section>
          )}
        </div>
      </section>
    </main>
  );
};

export default AccountInfo;
