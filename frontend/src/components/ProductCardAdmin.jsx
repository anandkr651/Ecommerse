import React, { useState } from "react";
import EditProductAdmin from "./EditProductAdmin";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import ConformBox from "../components/ConformBox";

function ProductCardAdmin({ data, fetchProduct }) {
  //props comes from pages/productAdmin
  const [openEdit, setOpenEdit] = useState(false);
  const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState({ _id: "" });

  const handleDeleteConfirm = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteProduct,
        data: deleteCategory,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        fetchProduct();
        setOpenConfirmBoxDelete(false);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div className="w-full h-full p-2 shadow-md rounded-md bg-slate-100">
      <div className="">
        <img
          src={data?.image[0]}
          alt={data.name}
          className="w-full h-full object-scale-down "
        />
      </div>
      <p className="text-ellipsis line-clamp-1">{data?.name}</p>
      <p>{data?.unit}</p>
      <div className="h-9 flex items-center gap-2">
        <button
          className="flex-1 bg-green-100 hover:bg-green-200 text-green-600 font-medium py-1 rounded"
          onClick={() => {
            setOpenEdit(true);
          }}
        >
          Edit
        </button>
        <button
          className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 font-medium py-1 rounded"
          onClick={() => {
            setOpenConfirmBoxDelete(true);
            setDeleteCategory(data);
          }}
        >
          Delete
        </button>
      </div>
      {openEdit && (
        <EditProductAdmin
          close={() => setOpenEdit(false)}
          productData={data}
          fetchProduct={fetchProduct}
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

export default ProductCardAdmin;
