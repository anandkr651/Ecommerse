import React, { useEffect, useState } from "react";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import Loading from "../components/Loading";
import ProductCardAdmin from "../components/ProductCardAdmin";

function ProductAdmin() {
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [search, setSearch] = useState("");

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProduct,
        data: {
          page: page,
          limit: 12,
          search: search,
        },
      });
      const { data: responseData } = response;

      // console.log(responseData);

      if (responseData.success) {
        setProductData(responseData.data);
        setTotalPageCount(responseData.totalNoPage);
      }
      setLoading(false);
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false); // Ensure loading stops even if request fails
    }
  };

  const handleNext = () => {
    if (totalPageCount !== page) {
      setPage((prev) => prev + 1);
    }
  };
  const handlePrevious = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    setPage(1);
  };
  // console.log(search);
  useEffect(() => {
    let flag = true;
    const interval = setTimeout(() => {
      if(flag){
        fetchProductData();
        flag = false;
      }
    }, 300);
    return () => {
      clearTimeout(interval);
    };
  }, [search, page]);

  return (
    <div>
      <section>
        <div className="p-2 bg-white shadow-sm flex items-center justify-between mx-auto">
          <h2 className="font-medium">Product</h2>
          <div>
            <input
              type="text"
              placeholder="search product here ...."
              className="w-full h-full py-2 border border-blue-500 rounded-lg px-2 outline-none text-slate-900 "
              value={search}
              onChange={handleSearch}
            />
          </div>
        </div>
        {loading && <Loading />}
        <div className=" bg-blue-100 p-2">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {productData.map((p, index) => {
              return (
                <div key={index}>
                  <ProductCardAdmin
                    data={p}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex justify-between my-4">
            <button
              onClick={handlePrevious}
              className="border border-primary-200 px-4 hover:bg-primary-100"
            >
              Previous
            </button>
            <button>
              {page}/{totalPageCount}
            </button>
            <button
              onClick={handleNext}
              className="border border-primary-200 px-4 hover:bg-primary-100"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductAdmin;
