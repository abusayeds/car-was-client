/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useAdminServiseQuery } from "../../redux/features/admin/adminApi";
import AddServiseModal from "./AddServiseModal";
import UpdateModel from "./UpdateModel";
import DeleteModel from "./DeleteModel";


const ServiseManagement = () => {
  const { data , isLoading} = useAdminServiseQuery(undefined);
  
  const [openServiceModal, setOpenServiceModel] = useState(false);
  const [OpenUpdateServiceModal, setOpenUpdateServiceModel] = useState(false);
  const [updateModelData, setUpdateModelData] = useState();
  const [opendeleteServiceModal, setOpenDeleteServiceModel] = useState(false);
  const [deleteModelId, setDeleteModelId] = useState();

  const hendleDeleteServiseModelClose = () => {
    setOpenDeleteServiceModel(false);
  };
  const hendleServiseModelClose = () => {
    setOpenServiceModel(false);
  };
  const hendleUpdateServiseModelClose = () => {
    setOpenUpdateServiceModel(false);
  };

  const updateData = {
    updateModelData,
    OpenUpdateServiceModal,
  };
  const ServiceModaldata = {
    openServiceModal,
  };
  const deleleModelData = {
    opendeleteServiceModal,
    deleteModelId
  };

  return (
    <div className="relative flex flex-col font-titlefont   overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
      <AddServiseModal
        data={ServiceModaldata}
        onClose={hendleServiseModelClose}
      ></AddServiseModal>
      <UpdateModel
        update={updateData}
        onClose={hendleUpdateServiseModelClose}
      ></UpdateModel>
      <DeleteModel deleteData= {deleleModelData} onClose = {hendleDeleteServiseModelClose}></DeleteModel>
      <table className="  table-auto min-w-max text-slate-800">
        {
         isLoading && <p className="p-4">Loading...</p>
        }
        
        <thead>
          <tr className="text-slate-800 border-b border-slate-300 bg-slate-300 ">
            <th className="p-4">
              <p className="md:text-lg text-sm leading-none font-normal">
                Service Name
              </p>
            </th>
            <th className="p-4">
              <p className="text-lg leading-none font-normal">Price</p>
            </th>
            <th className="p-4">
              <p className="md:text-lg text-sm leading-none font-normal">
                Duration
              </p>
            </th>
            <th className="p-4 ">
              <p className="md:text-lg text-sm leading-none font-normal">
                Update
              </p>
            </th>
            <th className="p-4">
              <button
                onClick={() => setOpenServiceModel(true)}
                className="md:text-lg text-sm leading-none font-normal bg-green-600 opacity-90 hover:opacity-100 text-white px-6 py-1 rounded"
              >
                Add new service
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((service: any) => (
            <tr key={service._id} className="hover:bg-slate-50 text-black  ">
              <td className="p-4">
                <p className="text-sm font-bold">{service.name}</p>
              </td>
              <td className="p-4">
                <p className="text-sm">{service.price} $ </p>
              </td>
              <td className="p-4">
                <p className="text-sm">{service.duration} minute</p>
              </td>

              <td className="p-4 gap-4">
                <button
                  onClick={() => {
                    setOpenUpdateServiceModel(true);
                    setUpdateModelData(service);
                  }}
                  className=" bg-blue-600 px-8 rounded text-white opacity-80 hover:opacity-100 duration-500 py-1"
                >
                  Edit
                </button>
                <button onClick={() => { setOpenDeleteServiceModel(true); setDeleteModelId(service._id)}} className=" ml-4 bg-designColor px-8 rounded text-white opacity-80 hover:opacity-100 duration-500 py-1">
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

export default ServiseManagement;
