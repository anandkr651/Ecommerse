import React, { useEffect, useState } from "react";
import UploadSubCategoryModel from "../components/UploadSubCategoryModel";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import DisplayTable from "../components/DisplayTable";
import { createColumnHelper } from "@tanstack/react-table";
import ViewImage from "../components/ViewImage";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import EditSubCategory from "../components/EditSubCategory";
import ConformBox from "../components/ConformBox";
import toast from "react-hot-toast";
import Category from "./Category";

function SubCategory() {
  const [openUploadSubCategory, setOpenUploadSubCategory] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const columnHelper = createColumnHelper();
  const [imageURL, setImageURL] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    _id: "",
  });
  const [deleteSubCategory, setDeleteSubCategory] = useState({ _id: "" });
  const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false);

  const fetchSubCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getSubCategory,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        setData(responseData.data);
      }
      setLoading(false);
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    fetchSubCategory();
  }, []);
  console.log(data);

  const column = [
    columnHelper.accessor("name", {
      helper: "Name",
    }),
    columnHelper.accessor("image", {
      helper: "Image",
      cell: ({ row }) => {
        // console.log("image",row);
        return (
          <img
            src={row.original.image}
            alt={row.original.name}
            className="w-8 h-8 cursor-pointer"
            onClick={() => {
              setImageURL(row.original.image);
            }}
          />
        );
      },
    }),
    columnHelper.accessor("category", {
      helper: "Category",
      cell: ({ row }) => {
        // console.log(row);
        return (
          <>
            {row.original.category.map((c, index) => {
              return (
                <p
                  key={index}
                  className="shadow-md px-1 inline-block rounded-md"
                >
                  {c.name}
                </p>
              );
            })}
          </>
        );
      },
    }),
    columnHelper.accessor("_id", {
      header: "Action",
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center gap-3">
            <button
              className="p-2 bg-green-200 rounded-full hover:text-green-600"
              onClick={() => {
                setOpenEdit(true);
                setEditData(row.original);
              }}
            >
              <MdModeEdit size={20} />
            </button>
            <button
              className="p-2 bg-red-200 rounded-full hover:text-red-600"
              onClick={() => {
                setOpenConfirmBoxDelete(true);
                setDeleteSubCategory(row.original);
              }}
            >
              <MdDelete size={20} />
            </button>
          </div>
        );
      },
    }),
  ];

  const handleDeleteConfirm = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteSubCategory,
        data: deleteSubCategory,
      });
      // console.log(response);

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        fetchSubCategory();
        setOpenConfirmBoxDelete(false);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section>
      <div className="p-2 bg-while shadow-sm flex items-center justify-between mx-auto">
        <h2 className="font-medium">Sub Category</h2>
        <button
          className="text-sm border-2 border-primary-100 hover:bg-primary-200 px-4 py-2 rounded"
          onClick={() => setOpenUploadSubCategory(true)}
        >
          Add Sub Category
        </button>
      </div>

      <div className="overflow-auto ">
        <DisplayTable data={data} column={column} />
      </div>

      {openUploadSubCategory && (
        <UploadSubCategoryModel
          close={() => setOpenUploadSubCategory(false)}
          fetchData={fetchSubCategory}
        />
      )}

      {imageURL && <ViewImage url={imageURL} close={() => setImageURL("")} />}

      {openEdit && (
        <EditSubCategory
          data={editData}
          fetchData={fetchSubCategory}
          close={() => setOpenEdit(false)}
        />
      )}

      {openConfirmBoxDelete && (
        <ConformBox
          close={() => setOpenConfirmBoxDelete(false)}
          cancel={() => setOpenConfirmBoxDelete(false)}
          conform={handleDeleteConfirm}
        />
      )}
    </section>
  );
}

export default SubCategory;
