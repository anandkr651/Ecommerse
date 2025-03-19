import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import Loading from "./Loading";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import uploadImage from "../utils/uploadImage";
import { useSelector } from "react-redux";

function UploadSubCategoryModel({ close, fetchData }) {
  const [data, setData] = useState({
    name: "",
    image: "",
    category: [],
  });
  const [loading, setLoading] = useState(false);
  const allCategory = useSelector((state) => state.product.allCategory);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadSubCategoryImage = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const response = await uploadImage(file);

    const { data: ImageResponse } = response;
    // console.log(ImageResponse);

    setData((prev) => {
      return {
        ...prev,
        image: ImageResponse.data,
      };
    });
    setLoading(false);
  };
  // console.log(data);   //in this place the image is not show because state updates in React are asynchronous, data won't have the updated value immediately.

  const handleRemoveCategorySelected = (categoryId) => {
    const index = data.category.findIndex((el) => el._id === categoryId);
    // console.log(index);

    data.category.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.addSubCategory,
        data: data, //object(key,value) -->value(data) jo hai usestate wala data hai
      });
      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        close();
        fetchData();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800 bg-opacity-60 flex items-center justify-center flex-col">
      <div className="bg-white max-w-4xl w-full p-4 rounded">
        <div className="flex items-center justify-center">
          <h1 className="font-semibold">Category</h1>
          <button className="w-fit block ml-auto" onClick={close}>
            <IoClose />
          </button>
        </div>
        <form action="" className="grid gap-2" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="categoryName">Sub Category Name</label>
            <input
              type="text"
              id="categoryName"
              placeholder="Enter the sub category name"
              className="bg-slate-100 p-2 rounded-md outline-none border border-blue-200 hover:focus-within:border-primary-200"
              value={data.name}
              name="name"
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label htmlFor="">
              <p>Sub Category Image</p>
              <div className="flex gap-4 flex-col lg:flex-row items-center">
                <div className="border bg-blue-50 h-36 w-full lg:w-36 rounded-md flex items-center justify-center ">
                  {data.image ? (
                    <img
                      src={data.image}
                      alt="Sub Category"
                      className="w-full h-full object-scale-down"
                    />
                  ) : (
                    <p>No Image</p>
                  )}
                </div>
                <label htmlFor="uploadImage">
                  <div
                    className={`${
                      !data.name
                        ? "bg-gray-400 cursor-not-allowed"
                        : "border border-primary-200"
                    } px-3 py-1 rounded-md`}
                  >
                    {loading ? <Loading /> : "Upload Image"}
                  </div>
                  <input
                    type="file"
                    disabled={!data.name}
                    className="hidden"
                    id="uploadImage"
                    onChange={handleUploadSubCategoryImage}
                  />
                </label>
              </div>
            </label>
          </div>
          <div className="grid gap-1">
            <label htmlFor="">Select Category</label>
            <div className="border focus-within:border-primary-200 rounded-lg">
              {/* display value */}
              <div className="flex flex-wrap gap-2">
                {data.category.map((cat, index) => {
                  return (
                    <p
                      key={index}
                      className="bg-white shadow-md px-1 m-1 flex justify-center items-center rounded-lg cursor-pointer"
                    >
                      {cat.name}
                      <button
                        className="hover:text-red-500 pl-1"
                        onClick={() => handleRemoveCategorySelected(cat._id)}
                      >
                        <IoClose />
                      </button>
                    </p>
                  );
                })}
              </div>
              {/* select category */}
              <select
                className="w-full p-1 bg-transparent outline-none"
                onChange={(e) => {
                  const value = e.target.value;
                  const categoryDetails = allCategory.find(
                    (el) => el._id == value
                  );
                  setData((prev) => {
                    return {
                      ...prev,
                      category: [...prev.category, categoryDetails],
                    };
                  });
                }}
              >
                <option value="">Select Category</option>
                {allCategory.map((category, index) => {
                  return (
                    <option value={category._id} key={index}>
                      {category?.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <button
            className={`${
              data.name && data.image && data.category[0]
                ? "bg-primary-200"
                : "bg-gray-400 cursor-not-allowed"
            } py-1 rounded-md`}
            type="submit"
          >
            Add Sub Category
          </button>
        </form>
      </div>
    </section>
  );
}

export default UploadSubCategoryModel;
