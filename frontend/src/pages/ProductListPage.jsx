import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import Loading from "../components/Loading";
import CardProduct from "../components/CardProduct";
import { useSelector } from "react-redux";
import validUrlConverter from "../utils/validUrlConverter";

function ProductListPage() {
  const params = useParams();
  //  console.log(params);
  //  {category: 'Sweet Tooth-67cb2d9c57b23196d89bbf96', subCategory: 'Syrups-67cdba075e3e4041975a98b4'}
  const categoryId = params.category.split("-")[1];
  // console.log(categoryId);
  // 67cb2d9c57b23196d89bbf96

  const subCategoryId = params.subCategory.split("-")[1];
  // console.log(subCategoryId);
  // 67cdba075e3e4041975a98b4

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const allSubCategory = useSelector((state) => state.product.subCategory);
  // console.log(allSubCategory);
  const [displaySubCategory, setDisplaySubCategory] = useState([]);

  const fetchProductdata = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId: categoryId,
          subCategoryId: subCategoryId,
          page: page,
          limit: 10,
        },
      });
      // console.log(response);
      // config:{transitional: {…}, adapter: Array(3), transformRequest: Array(1), transformResponse: Array(1), timeout: 0, …}
      // data:{message: 'product list', data: Array(3), totalCount: 3, page: 1, limit: 10, …}
      // headers:AxiosHeaders {content-length: '4368', content-type: 'application/json; charset=utf-8'}
      // request:XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: true, upload: XMLHttpRequestUpload, …}
      // status:200
      // statusText:"OK"

      const { data: responseData } = response;
      if (responseData.success) {
        // console.log(responseData);
        // data:(3) [{…}, {…}, {…}]
        // error:false
        // limit:10
        // message:"product list"
        // page:1
        // success:true
        // totalCount:3

        if (responseData.page == 1) {
          setData(responseData.data);
        } else {
          setData([...data, ...responseData.data]);
        }
        setTotalPage(responseData.totalCount);
      }
      setLoading(false);
    } catch (error) {
      AxiosToastError(error);
    }
  };
  useEffect(() => {
    fetchProductdata();
  }, [params]);

  useEffect(() => {
    const sub = allSubCategory.filter((s) => {
      const filterData = s.category.some((el) => {
        return el._id === categoryId;
      });
      return filterData ? filterData : null;
    });
    // console.log(sub);
    setDisplaySubCategory(sub);
  }, [params, allSubCategory]);

  return (
    <div className="mx-auto px-4 ">
      <section className="">
        <div className="container mx-auto grid grid-cols-[120px,1fr] md:grid-cols-[200px,1fr] lg:grid-cols-[280px,1fr] gap-3">
          {/* subCategory */}
          <div className="border border-red-500 min-h-[78vh] max-h-[78vh] overflow-y-scroll scrollbar-none grid gap-4 p-4">
            {displaySubCategory.map((s, index) => {
              const link =`/${validUrlConverter(params.category.split("-")[0])}-${params.category.split("-")[1]}/${validUrlConverter(s.name)}-${s._id}`;
              return (
                <Link to={link}
                  key={index}
                  className={`w-full h-full rounded-xl shadow-xl ${subCategoryId === s._id ?"bg-green-300":"bg-white"} hover:bg-green-300 cursor-pointer`}
                >
                  <div className="w-full h-fit">
                    <img
                      src={s.image}
                      alt="subCategory"
                      className={`pt-10 `}
                    />
                  </div>
                  <p className="-mt-10 lg:-mt-24 text-center text-sm font-normal w-full pt-2">
                    {s.name}
                  </p>
                </Link>
              );
            })}
          </div>

          {/* product  */}
          {/* go to the index.css file for scrollbar display none */}
          <div className="border border-blue-500 min-h-[78vh] max-h-[78vh] overflow-y-scroll scrollbar-none">
            <div className="bg-white shadow-md p-4">
              <h3 className="font-semibold ">
                {params.subCategory.split("-")[0]}
              </h3>
            </div>
            <div className="p-2">
              <div className="flex justify-start gap-4 overflow-x-scroll scrollbar-none ">
                {data.map((p, index) => {
                  return (
                    <div key={index} className="bg-white mx-auto">
                      <CardProduct data={p} />
                    </div>
                  );
                })}
              </div>
              {loading && <Loading />}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductListPage;
