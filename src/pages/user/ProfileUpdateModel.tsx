/* eslint-disable @typescript-eslint/no-explicit-any */

import { useAppSelector } from "../../redux/hooks";
import { useUpdateuserMutation } from "../../redux/features/admin/adminApi";
import { useState } from "react";
import Toast from "../../components/ulittls/Toast";
const ProfileUpdateModel = ({ data }: any) => {
  const { user } = useAppSelector((state) => state.UserDetails);
  const [updateUser] = useUpdateuserMutation();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const { singleUser } = data;

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const form = event.target;
    const formData = {
      name: form.name.value,
      phone: form.phone.value,
      email: form.email.value,
      address: form.address.value,
    };

    const args = {
      data: formData,
      id: user?.user?.user._id,
    };
    try {
      const res: any = await updateUser(args);

      if (res.error) {
        setToastMessage(res?.error?.data?.errorSources[0].message);
        console.log();
      } else {
        setToastMessage("Profile update successfully");
        form.reset();
      }
      console.log(res);
    } catch {
      setToastMessage("Something went wrong");
      form.reset();
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
        <form
          onSubmit={handleSubmit}
          className=" flex  outline-none focus:outline-none "
        >
          <div className=" min-w-full">
            <div className="border-0 rounded-lg shadow-lg  flex flex-col     outline-none focus:outline-none">
              <div className="flex items-start justify-between p-4 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="md:            text-3xl font-bodyfont">
                  Update Your Profile
                </h3>
              </div>

              <div className=" w-full max-w-[550px] mx-auto bg-white">
                <div>
                  <div className=" text-start px-4 py-2">
                    <p>Name</p>
                    <input
                      type="text"
                      name="name"
                      defaultValue={singleUser?.data?.name}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white p-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                  <div className=" text-start px-4 py-2">
                    <p>Email</p>
                    <input
                      type="email"
                      name="email"
                      defaultValue={singleUser?.data?.email}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white p-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                  <div className=" text-start px-4 py-2">
                    <p>Phone</p>
                    <input
                      type="text"
                      name="phone"
                      defaultValue={singleUser?.data?.phone}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white p-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                  <div className=" text-start px-4 py-2">
                    <p>Address</p>
                    <input
                      type="text"
                      name="address"
                      defaultValue={singleUser?.data?.address}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white p-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-2 border-t border-solid border-blueGray-200 rounded-b">
                <input
                  className=" bg-green-600 opacity-90 hover:opacity-100 text-white px-4 py-2 rounded-sm"
                  type="submit"
                  value="Update User"
                />
              </div>
            </div>
          </div>
        </form>
      </>
    </div>
  );
};

export default ProfileUpdateModel;
