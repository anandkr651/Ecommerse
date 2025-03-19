import React, { useEffect, useState } from "react";
import UploadCategoryModel from "../components/UploadCategoryModel";
import NoData from "../components/NoData";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import EditCategory from "../components/EditCategory";
import ConformBox from "../components/ConformBox";
// import { useSelector } from "react-redux";

function Category() {
  const [openUploadCategory, setOpenUploadCategory] = useState(false);
  const [loding, setLoding] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    image: "",
  });
  const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState({ _id: "" });

  // go to the app.jsx

  const fetchCatagory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getCategory,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        setCategoryData(responseData.data);
      }
    } catch (error) {
      setLoding(false);
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    fetchCatagory();
  }, []);
  // console.log(categoryData);

  // const allCategory = useSelector(state => state.product.allCategory)
  // // console.log(allCategory);

  // useEffect(()=>{
  //   setCategoryData(allCategory)
  // },[allCategory])

  const handleDeleteConfirm = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCategory,
        data: deleteCategory,
      });
      // console.log(response);

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        fetchCatagory();
        setOpenConfirmBoxDelete(false);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section>
      <div className="p-2 bg-while shadow-sm flex items-center justify-between mx-auto">
        <h2 className="font-medium">Category</h2>
        <button
          className="text-sm border-2 border-primary-100 hover:bg-primary-200 px-4 py-2 rounded"
          onClick={() => setOpenUploadCategory(true)}
        >
          Add Category
        </button>
      </div>

      {!categoryData[0] && !loding && <NoData />}

      <div className="p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {categoryData.map((category) => {
          return (
            <div className="w-32 h-56 rounded shadow-md" key={category._id}>
              <img
                alt={category.name}
                src={category.image}
                className="w-full object-scale-down"
              />
              <div className="items-center h-9 flex gap-2 px-1">
                <button
                  className="flex-1 bg-green-100 hover:bg-green-200 text-green-600 font-medium py-1 rounded"
                  onClick={() => {
                    setOpenEdit(true);
                    setEditData(category);
                  }}
                >
                  Edit
                </button>
                <button
                  className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 font-medium py-1 rounded"
                  onClick={() => {
                    setOpenConfirmBoxDelete(true);
                    setDeleteCategory(category);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {openUploadCategory && (
        <UploadCategoryModel
          fetchData={fetchCatagory}
          close={() => setOpenUploadCategory(false)}
        />
      )}

      {openEdit && (
        <EditCategory
          close={() => setOpenEdit(false)}
          fetchData={fetchCatagory}
          data={editData}
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

export default Category;
