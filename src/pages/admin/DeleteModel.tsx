/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Toast from "../../components/ulittls/Toast";
import { useDeleteServiseMutation } from "../../redux/features/admin/adminApi";

const DeleteModel = ({ deleteData, onClose }: any) => {
  const [deleteService] = useDeleteServiseMutation();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  if (!deleteData.opendeleteServiceModal) {
    return null;
  }

  const handleCloseToast = () => {
    setToastMessage(null);
    onClose(false);
  };

  const hendleDelete = async () => {
    try {
      const res: any = await deleteService(deleteData.deleteModelId);

      if (res.error) {
        setToastMessage(res?.error?.data.message);
      } else {
        setToastMessage("Deleted successfully");
      }
    } catch {
      setToastMessage("Something went wrong");
    }
  };

  return (
    <div className="">
      {/* Toast Component */}
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => handleCloseToast()} />
      )}
      <>
        <div className="justify-center items-center flex fixed inset-0 z-50 ">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 relative">
              <div className="my-8 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-14 fill-red-500 inline"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                    data-original="#000000"
                  />
                  <path
                    d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                    data-original="#000000"
                  />
                </svg>
                <h4 className="text-gray-800 text-lg font-semibold mt-4">
                  Are you sure you want to delete it?
                </h4>
                <p className="text-sm text-gray-600 mt-4">
                  If you delete this service then this service will be deleted
                  from your database and your site
                </p>
              </div>

              <div className="flex flex-col space-y-2">
                <button
                  type="button"
                  onClick={() => hendleDelete()}
                  className="px-4 py-2 rounded-lg text-white text-sm tracking-wide bg-designColor hover:opacity-100 opacity-80 duration-500 active:bg-red-500"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => onClose()}
                  className="px-4 py-2 rounded-lg text-gray-800 text-sm tracking-wide bg-gray-200 hover:bg-gray-300 duration-500 active:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    </div>
  );
};

export default DeleteModel;
