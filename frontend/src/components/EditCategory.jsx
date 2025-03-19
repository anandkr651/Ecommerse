import React, { useState } from "react";
import uploadImage from "../utils/uploadImage";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { IoClose } from "react-icons/io5";
import Loading from "./Loading";

function EditCategory({ close, fetchData, data: categoryData }) {
  //comes from pages/category
  const [data, setData] = useState({
    _id: categoryData._id,
    name: categoryData.name,
    image: categoryData.image,
  });
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadCategoryImage = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const response = await uploadImage(file);

    const { data: ImageResponse } = response;
    // console.log(ImageResponse);
    setLoading(false);
    setData((prev) => {
      return {
        ...prev,
        image: ImageResponse.data,
      };
    });
  };
  // console.log(data);   //in this place the image is not show because state updates in React are asynchronous, data won't have the updated value immediately.

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.updateCategory,
        data: data,
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
          <h1 className="font-semibold">Update Category</h1>
          <button className="w-fit block ml-auto" onClick={close}>
            <IoClose />
          </button>
        </div>
        <form action="" className="grid gap-2" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="categoryName">Name</label>
            <input
              type="text"
              id="categoryName"
              placeholder="Enter the category name"
              className="bg-slate-100 p-2 rounded-md outline-none border border-blue-200 hover:focus-within:border-primary-200"
              value={data.name}
              name="name"
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label htmlFor="">
              <p>Image</p>
              <div className="flex gap-4 flex-col lg:flex-row items-center">
                <div className="border bg-blue-50 h-36 w-full lg:w-36 rounded-md flex items-center justify-center ">
                  {data.image ? (
                    <img
                      src={data.image}
                      alt="category"
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
                    onChange={handleUploadCategoryImage}
                  />
                </label>
              </div>
            </label>
          </div>
          <button
            className={`${
              data.name && data.image
                ? "bg-primary-200"
                : "bg-gray-400 cursor-not-allowed"
            } py-1 rounded-md`}
            type="submit"
          >
            Update category
          </button>
        </form>
      </div>
    </section>
  );
}

export default EditCategory;
