/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Toast from "../../components/ulittls/Toast";
import { useAppSelector } from "../../redux/hooks";
import { useUpdateuserMutation } from "../../redux/features/admin/adminApi";
const ProfileUpdateModel = ({ data, onClose }: any) => {
  const { user } = useAppSelector((state) => state.UserDetails);
  const [updateUser] = useUpdateuserMutation();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const { singleUser } = data;

  if (!data.openProfileUpdateModel) {
    return null;
  }

  const handleCloseToast = () => {
    setToastMessage(null);
    onClose(false);
  };

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
    } catch {
      setToastMessage("Something went wrong");
      form.reset();
    }
  };
  return (
    <div className="">
      {/* Toast Component */}
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => handleCloseToast()} />
      )}
      <>
        <form
          onSubmit={handleSubmit}
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col md:w-[700px] bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="text-3xl font-bodyfont">Update Your Profile</h3>
              </div>
              {/*body*/}
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
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  onClick={() => onClose()}
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  Close
                </button>
                <input
                  className=" bg-green-600 opacity-90 hover:opacity-100 text-white px-4 py-2 rounded-sm"
                  type="submit"
                  value="Update Service"
                />
              </div>
            </div>
          </div>
        </form>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    </div>
  );
};

export default ProfileUpdateModel;
