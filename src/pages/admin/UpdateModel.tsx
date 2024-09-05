/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Toast from "../../components/ulittls/Toast";
import { useUpdateServiseMutation } from "../../redux/features/admin/adminApi";

const UpdateModel = ({ update, onClose }: any) => {
  // const [addServise] = useAddServiceMutation();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [updateService] = useUpdateServiseMutation();
  if (!update.OpenUpdateServiceModal) {
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
      description: form.description.value,
      image: form.image.value,
      duration: Number(form.duration.value),
      price: Number(form.price.value),
    };
    const args = {
      data: formData,
      id: update.updateModelData._id,
    };
    try {
      const res: any = await updateService(args);

      if (res.error) {
        setToastMessage(res?.error?.data.message);
      } else {
        setToastMessage("Servise update successfully");
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
                <h3 className="text-3xl font-bodyfont"> Add a new service</h3>
              </div>
              {/*body*/}
              <div className=" w-full max-w-[550px] mx-auto bg-white">
                <div>
                  <div className=" text-start px-4 py-2">
                    <p>Name</p>
                    <input
                      type="text"
                      name="name"
                      defaultValue={update?.updateModelData?.name}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white p-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                  <div className=" text-start px-4 py-2">
                    <p>Description</p>
                    <input
                      type="text"
                      name="description"
                      defaultValue={update?.updateModelData?.description}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white p-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                  <div className=" text-start px-4 py-2">
                    <p>Image</p>
                    <input
                      type="text"
                      name="image"
                      defaultValue={update?.updateModelData?.image}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white p-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap">
                  <div className="w-full  sm:w-1/2">
                    <div className=" text-start px-4 py-2">
                      <p>duration</p>
                      <input
                        type="number"
                        name="duration"
                        defaultValue={update?.updateModelData?.duration}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white p-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </div>
                  </div>
                  <div className="w-full  sm:w-1/2">
                    <div className=" text-start px-4 py-2">
                      <p>Price</p>
                      <input
                        type="number"
                        name="price"
                        defaultValue={update?.updateModelData?.price}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white p-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => onClose(false)}
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

export default UpdateModel;
