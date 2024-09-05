import { useState } from "react";
import Toast from "../../components/ulittls/Toast";
import { useAddServiceMutation } from "../../redux/features/admin/adminApi";

/* eslint-disable @typescript-eslint/no-explicit-any */
const AddServiseModal = ({ data, onClose }: any) => {
  
  const [addServise] = useAddServiceMutation();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  if (!data.openServiceModal) {
    return null;
  }

  const handleCloseToast = () => {
    setToastMessage(null);
    onClose(false)
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
    try {
      const res: any = await addServise(formData);

      if (res.error) {
        setToastMessage(res?.error?.data.message);
      } else {
        setToastMessage("servise create successfully");
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
                      placeholder="Full Name"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white p-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                  <div className=" text-start px-4 py-2">
                    <p>Description</p>
                    <input
                      type="text"
                      name="description"
                      placeholder="Enter your descrition number"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white p-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                  <div className=" text-start px-4 py-2">
                    <p>Image</p>
                    <input
                      type="text"
                      name="image"
                      placeholder="Enter Your image"
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
                        placeholder="duration"
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
                        placeholder="Price"
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
                  value="Add Service"
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

export default AddServiseModal;
