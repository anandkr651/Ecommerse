import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import CardLoading from "./CardLoading";
import CardProduct from "./CardProduct";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useSelector } from "react-redux";
import validUrlConverter from "../utils/validUrlConverter";

function CategoryWiseDisplayProduct({ id, name }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef();
  const subCategoryData = useSelector((state) => state.product.subCategory);
  const navigate = useNavigate();
  const loadingCardNumber = new Array(6).fill(null);

  const fetchCataegoryWiseProduct = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductByCategory,
        data: {
          id: id,
        },
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
    fetchCataegoryWiseProduct();
  }, []);

  const handleScrollRight = () => {
    containerRef.current.scrollLeft += 200;
  };
  const handleScrollLeft = () => {
    containerRef.current.scrollLeft -= 200;
  };

  const handleProductListPage = (catId, catName) => {
    // console.log(catName);
    const subcategory = subCategoryData.find((sub) => {
      const filterData = sub.category.some((c) => {
        return c._id === catId;
      });
      return filterData ? true : null;
    });

    const url = `/${validUrlConverter(catName)}-${catId}/${validUrlConverter(
      subcategory.name
    )}-${subcategory._id}`;
    navigate(url);
    // console.log(url);
  };
  return (
    <div className="">
      <div className="container mx-auto flex justify-between items-center px-4 py-2">
        <h3 className="font-semibold ">{name}</h3>
        <Link
          to=""
          onClick={() => handleProductListPage(id, name)}
          className="text-secondary-200 border border-secondary-200 p-2 rounded-md font-medium hover:bg-secondary-200 hover:text-white "
        >
          See All
        </Link>
      </div>

      <div className="flex items-center">
        <div
          className="container mx-auto flex justify-start py-2 lg:px-0 px-4 gap-4 md:gap-6 lg:gap-8 overflow-x-scroll scrollbar-none scroll-smooth"
          ref={containerRef}
        >
          {loading &&
            loadingCardNumber.map((_, index) => {
              return (
                <div key={index}>
                  <CardLoading />
                </div>
              );
            })}
          {data.map((p, index) => {
            return (
              <div key={index}>
                <CardProduct data={p} />
              </div>
            );
          })}
        </div>

        {/* button */}
        <div className="w-full left-0 absolute right-0 container mx-auto px-2 lg:flex justify-between hidden ">
          <button
            className="shadow-lg p-2 rounded-full bg-white hover:bg-gray-300"
            onClick={handleScrollLeft}
          >
            <FaAngleLeft />{" "}
          </button>
          <button
            className="shadow-lg p-2 rounded-full bg-white hover:bg-gray-300"
            onClick={handleScrollRight}
          >
            <FaAngleRight />{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CategoryWiseDisplayProduct;
