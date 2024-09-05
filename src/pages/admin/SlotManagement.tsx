/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetSlotQuery } from "../../redux/features/admin/adminApi";
import AddSlotModel from "./AddSlotModel";
import DeleteSlot from "./DeleteSlot";
import Toast from "../../components/ulittls/Toast";
import { useUpdateSlotMutation } from "../../redux/features/booking/bookingApi";

const SlotManagement = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const { data, isLoading } = useGetSlotQuery(undefined);
  const [slotStatus, setSlotStatus] = useState<{ [key: number]: string }>({});
  const [openSlotModal, setOpenSlotModel] = useState(false);
  const [updateSlot, setUpdateSlot] = useState<any>({});
  const [upDateSlot] = useUpdateSlotMutation();
  const [openSlotDeleteModal, setOpenDeleteSlotModel] = useState(false);
  const [deleteSlotId, setDeleteSlotId] = useState("");
  const hendleSlotDeleteModelClose = () => {
    setOpenDeleteSlotModel(false);
  };
  const deleleSlotModelData = {
    openSlotDeleteModal,
    deleteSlotId,
  };
  const hendleSlotModelClose = () => {
    setOpenSlotModel(false);
  };
  const handleUpdate = async (id: any) => {
    const data = {
      isBooked: updateSlot,
    };
    const args = {
      id: id,
      data: data,
    };
    try {
      const res: any = await upDateSlot(args);

      if (res.error) {
        setToastMessage(res.error.data.message);
      } else {
        setToastMessage("Slot status update successful!");
      }
    } catch {
      setToastMessage("Something went wrong");
    }
  };
  const handleCloseToast = () => {
    setToastMessage(null);
  };

  return (
    <div className="relative flex flex-col font-titlefont   overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
      {/* Toast Component */}
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => handleCloseToast()} />
      )}

      <AddSlotModel
        Data={openSlotModal}
        onClose={hendleSlotModelClose}
      ></AddSlotModel>
      <DeleteSlot
        deleteData={deleleSlotModelData}
        onClose={hendleSlotDeleteModelClose}
      ></DeleteSlot>
      <table className="table-auto min-w-max text-slate-800">
        {isLoading && <p className="p-4">Loading...</p>}

        <thead>
          <tr className="text-slate-800 border-b text-start border-slate-300 bg-slate-300 ">
            <th className="p-4">
              <p className="text-lg leading-none text-start font-normal">
                Service
              </p>
            </th>
            <th className="p-4">
              <p className="text-lg leading-none text-start font-normal">
                Start Time
              </p>
            </th>
            <th className="p-4">
              <p className="md:text-lg text-sm text-start leading-none font-normal">
                End Start
              </p>
            </th>
            <th className="p-4 ">
              <p className="md:text-lg text-sm text-start leading-none font-normal">
                Status
              </p>
            </th>
            <th className="p-4 flex justify-start">
              <button
                onClick={() => setOpenSlotModel(true)}
                className="md:text-lg text-sm leading-none font-normal bg-green-600 opacity-90 hover:opacity-100 text-white px-6 py-1 rounded"
              >
                Create Slot
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((service: any, index: number) => (
            <tr key={index} className="hover:bg-slate-50 text-black text-start">
              <td className="p-4">
                <p className="text-sm">{service?.service.name}</p>
              </td>
              <td className="p-4">
                <p className="text-sm">{service?.startTime} m</p>
              </td>
              <td className="p-4">
                <p className="text-sm">{service?.endTime} m</p>
              </td>

              <td className="p-4 gap-4">
                <select
                  onChange={(e: any) => {
                    setSlotStatus((prev) => ({
                      ...prev,
                      [index]: e.target.value,
                    }));
                    setUpdateSlot(e.target.value);
                  }}
                  className={`
                    p-4 gap-4 flex justify-center items-center outline-none 
                   
                    `}
                >
                  <option selected disabled>
                    {service.isBooked}
                  </option>
                  <option value="available">available</option>
                  <option value="booked">booked</option>
                  <option value="canceled">canceled</option>
                </select>
              </td>

              <td className="p-4 gap-4">
                <button
                  onClick={() => {handleUpdate(service._id); setSlotStatus('')}}
                  className={`px-2 rounded text-white  bg-blue-600 duration-500  py-1 ${
                    slotStatus[index] === "available" ||
                    slotStatus[index] === "booked" ||
                    slotStatus[index] === "canceled"
                      ? ""
                      : " opacity-30 cursor-not-allowed"
                  }`}
                  disabled={
                    slotStatus[index] !== "available" &&
                    slotStatus[index] !== "booked" &&
                    slotStatus[index] !== "canceled"
                  }
                >
                  Update
                </button>

                <button
                  onClick={() => {
                    setDeleteSlotId(service._id);
                    setOpenDeleteSlotModel(true);
                  }}
                  className="bg-designColor ml-3 px-2 rounded text-white opacity-70 hover:opacity-100 duration-500 py-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SlotManagement;
