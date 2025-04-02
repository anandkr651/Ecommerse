import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddAddress from "../components/AddAddress";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import ConformBox from "../components/ConformBox";
import EditAddress from "../components/EditAddress";
import { useGlobalContext } from "../provider/globalProvider";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";

function Address() {
  const addressList = useSelector((state) => state.address.addressList);  
  const [openAddress, setOpenAddress] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({ _id: "" });  
  const [deleteAddressData, setDeleteAddressData] = useState({ _id: "" });
  const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false);
  const {fetchAddress} = useGlobalContext()

  const handleDeleteConfirm = async()=>{
     try {
      const response = await Axios({
        ...SummaryApi.deleteAddress,
        data:deleteAddressData
      })
      const {data:responseData} = response
      if(responseData.success){
        toast.success(responseData.message)
        setOpenConfirmBoxDelete(false)
        fetchAddress()
      }
     } catch (error) {
      AxiosToastError(error)
     }
  }

  return (
    <div className="w-full bg-white py-2 px-2 lg:h-screen lg:max-h-[75vh] lg:overflow-auto scrollbar-none">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold ">your address</h3>
        <button
          className="text-sm border-2 border-primary-100 hover:bg-primary-200 px-4 py-2 rounded"
          onClick={() => setOpenAddress(true)}
        >
          Add address
        </button>
      </div>
      <div className="p-1">
        {addressList.map((address, index) => {        
          return (
            <div key={index} className={`rounded p-3 gap-3 my-2 border flex ${address.status === false && "hidden "}`}>
              <div className="w-full">
                <p>{address.addressLine}</p>
                <p>{address.city}</p>
                <p>{address.state}</p>
                <p>
                  {address.country} - {address.pincode}
                </p>
                <p>{address.mobile}</p>
              </div>
              <div className="flex gap-2">
                <FiEdit
                  onClick={()=>{
                    setOpenEdit(true)
                    setEditData(address)
                  }}
                  size={25}
                  className="bg-green-400 p-1 rounded-md hover:text-white hover:bg-green-700"
                />
                <MdDelete
                  onClick={()=>{
                    setOpenConfirmBoxDelete(true)
                    setDeleteAddressData(address)
                  }}
                  size={25}
                  className="bg-red-400 p-1 rounded-md hover:text-white hover:bg-red-700"
                />
              </div>
            </div>
          );
        })}
      </div>

      {openAddress && <AddAddress close={() => setOpenAddress(false)} />}

      {openEdit && (
        <EditAddress
          close={() => setOpenEdit(false)}
          data={editData}
          fetchData={fetchAddress}
        />
      )}

      {openConfirmBoxDelete && (
        <ConformBox
          close={() => setOpenConfirmBoxDelete(false)}
          cancel={() => setOpenConfirmBoxDelete(false)}
          conform={handleDeleteConfirm}
        />
      )}
    </div>
  );
}

export default Address;
