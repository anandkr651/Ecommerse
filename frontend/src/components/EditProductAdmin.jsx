import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import Loading from "./Loading";
import uploadImage from "../utils/uploadImage";
import ViewImage from "./ViewImage";
import AddFieldComponent from "./AddFieldComponent";
import AxiosToastError from "../utils/AxiosToastError";
import successAlert from "../utils/successAlert";

function EditProductAdmin({ close, productData, fetchProduct }) {
  //props comes from productCardAdmin
  const [data, setData] = useState({
    _id: productData._id,
    name: productData.name,
    image: productData.image,
    category: productData.category,
    subCategory: productData.subCategory,
    unit: productData.unit,
    stock: productData.stock,
    price: productData.price,
    discount: productData.discount,
    description: productData.description,
    moreDetail: productData.moreDetail || {},
  });
  const [loading, setLoading] = useState(false);
  const [viewImageURL, setViewImageURL] = useState("");
  const allcategory = useSelector((state) => state.product.allCategory);
  const [selectCategory, setSelectCategory] = useState("");
  const [selectSubCategory, setSelectSubCategory] = useState("");
  const allSubCategory = useSelector((state) => state.product.subCategory);
  const [openAddField, setOpenAddField] = useState(false);
  const [fieldName, setFieldName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadImage = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const response = await uploadImage(file);
    const { data: ImageResponse } = response;
    const imageUrl = ImageResponse?.data;

    setData((prev) => {
      return {
        ...prev,
        image: [...prev.image, imageUrl],
      };
    });
    setLoading(false);
  };

  const handleDeleteImage = async (index) => {
    data?.image.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
      };
    });
  };

  const handleDeleteCategory = async (index) => {
    data.category.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
      };
    });
  };

  const handleDeleteSubCategory = async (index) => {
    data.subCategory.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
      };
    });
  };

  const handleAddField = () => {
    setData((prev) => {
      return {
        ...prev,
        moreDetail: {
          ...prev.moreDetail,
          [fieldName]: "",
        },
      };
    });
    setFieldName("");
    setOpenAddField(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.updateProduct,
        data: data,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        successAlert(responseData.message);
      }
      fetchProduct();
      close();
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="fixed top-0 right-0 left-0 bottom-0 bg-black z-50 bg-opacity-70 p-4 mt-20">
      <div className="bg-white w-full p-4 max-w-2xl mx-auto rounded overflow-y-auto scrollbar-none h-full max-h-[95vh]">
        <section className="">
          <div className="p-2 bg-white flex items-center justify-between shadow-xl rounded-md ">
            <h2 className="font-semibold">Update Product</h2>
            <button onClick={close}>
              <IoClose size={20} className="hover:text-red-500"/>
            </button>
          </div>
          <div className="grid p-3">
            <form action="" className="gap-3" onSubmit={handleSubmit}>
              {/* product name */}
              <div className="grid gap-1">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter the product name"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  required
                  className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded-md "
                />
              </div>
              {/* description */}
              <div className="grid gap-1">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  type="text"
                  placeholder="Enter the description"
                  name="description"
                  value={data.description}
                  onChange={handleChange}
                  required
                  className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded-md resize-none overflow-y-auto scrollbar-none"
                />
              </div>

              {/* image */}
              <div>
                <p>Image</p>
                <label
                  htmlFor="productImage"
                  className="bg-blue-50 h-24 border rounded-md flex justify-center items-center cursor-pointer hover:bg-blue-100"
                >
                  <div className="flex items-center justify-center flex-col">
                    {loading ? (
                      <Loading />
                    ) : (
                      <>
                        <FaCloudUploadAlt size={35} /> <p>Upload Image</p>{" "}
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    id="productImage"
                    className="hidden"
                    onChange={handleUploadImage}
                    accept="image/*"
                  />
                </label>
                {/* display upload images */}
                <div className="flex flex-wrap gap-4">
                  {data.image.map((im, index) => {
                    return (
                      <div
                        key={index}
                        className="h-20 mt-1 w-20 min-w-20 bg-blue-50 border relative group "
                      >
                        <img
                          src={im}
                          alt="Image"
                          className="w-full h-full object-scale-down cursor-pointer"
                          onClick={() => setViewImageURL(im)}
                        />
                        <div
                          onClick={() => handleDeleteImage(index)}
                          className="absolute bottom-0 right-0 p-1 bg-red-600 hover:text-red-200 rounded-tl-full hidden group-hover:block"
                        >
                          <MdDelete />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* category */}
              <div>
                <label htmlFor="">Category</label>
                <div>
                  <select
                    className="bg-blue-50 border focus-within:border-primary-200  w-full p-2 rounded-md outline-none"
                    value={selectCategory}
                    onChange={(e) => {
                      const value = e.target.value;
                      const category = allcategory.find(
                        (el) => el._id === value
                      );
                      setData((prev) => {
                        return {
                          ...prev,
                          category: [...prev.category, category],
                        };
                      });
                      setSelectCategory("");
                    }}
                  >
                    <option value="">Select Category</option>
                    {allcategory.map((c, index) => {
                      return (
                        <option value={c._id} key={index}>
                          {c.name}
                        </option>
                      );
                    })}
                  </select>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {data.category.map((c, index) => {
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-center px-2 shadow-lg rounded-md group cursor-pointer"
                        >
                          <p>{c.name}</p>
                          <div
                            className="lg:hidden pl-1 group-hover:block text-center text-red-700"
                            onClick={() => handleDeleteCategory(index)}
                          >
                            <IoClose />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Sub Category */}
              <div>
                <label htmlFor="">SubCategory</label>
                <div>
                  <select
                    className="bg-blue-50 border focus-within:border-primary-200  w-full p-2 rounded-md outline-none"
                    value={selectSubCategory}
                    onChange={(e) => {
                      const value = e.target.value;
                      const subCategory = allSubCategory.find(
                        (el) => el._id === value
                      );
                      setData((prev) => {
                        return {
                          ...prev,
                          subCategory: [...prev.subCategory, subCategory],
                        };
                      });
                      setSelectSubCategory("");
                    }}
                  >
                    <option value="">Select Sub Category</option>
                    {allSubCategory.map((c, index) => {
                      return (
                        <option value={c._id} key={index}>
                          {c.name}
                        </option>
                      );
                    })}
                  </select>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {data.subCategory.map((c, index) => {
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-center  px-2 shadow-lg rounded-md group cursor-pointer"
                        >
                          <p>{c.name}</p>
                          <div
                            className="lg:hidden pl-1 group-hover:block text-center text-red-700"
                            onClick={() => handleDeleteSubCategory(index)}
                          >
                            <IoClose />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Unit */}
              <div className="grid gap-1">
                <label htmlFor="unit">Unit</label>
                <input
                  id="unit"
                  type="text"
                  placeholder="Enter the unit"
                  name="unit"
                  value={data.unit}
                  onChange={handleChange}
                  required
                  className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded-md "
                />
              </div>

              {/* stock */}
              <div className="grid gap-1">
                <label htmlFor="stock">Number of stock</label>
                <input
                  id="stock"
                  type="number"
                  placeholder="Enter the stock"
                  name="stock"
                  value={data.stock}
                  onChange={handleChange}
                  required
                  className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded-md "
                />
              </div>

              {/* price */}
              <div className="grid gap-1">
                <label htmlFor="price">price of the product</label>
                <input
                  id="price"
                  type="number"
                  placeholder="Enter the product price"
                  name="price"
                  value={data.price}
                  onChange={handleChange}
                  required
                  className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded-md "
                />
              </div>

              {/* discount*/}
              <div className="grid gap-1">
                <label htmlFor="discount">Discount</label>
                <input
                  id="discount"
                  type="number"
                  placeholder="Enter the discount"
                  name="discount"
                  value={data.discount}
                  onChange={handleChange}
                  required
                  className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded-md "
                />
              </div>

              {/* Add more field */}
              {Object?.keys(data?.moreDetail)?.map((k, index) => {
                return (
                  <div className="grid gap-1" key={index}>
                    <label htmlFor={k}>{k}</label>
                    <input
                      id={k}
                      type="text"
                      value={data?.moreDetail[k]}
                      onChange={(e) => {
                        const value = e.target.value;
                        setData((prev) => {
                          return {
                            ...prev,
                            moreDetail: {
                              ...prev.moreDetail,
                              [k]: value,
                            },
                          };
                        });
                      }}
                      required
                      className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded-md "
                    />
                  </div>
                );
              })}

              <div
                className="my-2 bg-primary-200 py-1 w-36 text-center rounded-md cursor-pointer hover:bg-white border hover:border-primary-200"
                onClick={() => setOpenAddField(true)}
              >
                Add field
              </div>

              <div className="mx-auto text-center shadow-lg border border-primary-200 hover:bg-primary-200 w-36 rounded-md py-1 cursor-pointer">
                <button className="font-medium ">Update Product</button>
              </div>
            </form>
          </div>
        </section>
      </div>

      {viewImageURL && (
        <ViewImage url={viewImageURL} close={() => setViewImageURL("")} />
      )}

      {openAddField && (
        <AddFieldComponent
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
          submit={handleAddField}
          close={() => setOpenAddField(false)}
        />
      )}
    </section>
  );
}
export default EditProductAdmin;
