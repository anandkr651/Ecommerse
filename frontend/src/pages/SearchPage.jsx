import React, { useEffect, useState } from "react";
import CardLoading from "../components/CardLoading";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import CardProduct from "../components/CardProduct";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "react-router-dom";
import noDataImage from "../assets/nothing here yet.webp";

function Search() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingArrayCard = new Array(10).fill(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const params = useLocation();
  const searchText = params?.search?.slice(3);

  // console.log(searchText);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.searchProduct,
        data: {
          search: searchText,
          page: page,
        },
      });
      const { data: responseData } = response;
      if (responseData.success) {
        if (responseData.page == 1) {
          setData(responseData.data);
        } else {
          setData((prev) => {
            //productListPage is same
            return [...prev, ...responseData.data];
          });
        }
      }
      setTotalPage(responseData.totalPage);
      setLoading(false);
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, searchText]);

  const handeFetchMore = () => {
    if (totalPage > page) {
      setPage((prev) => prev + 1);
    }
  };
  return (
    <div className="">
      <section className="bg-white">
        <div className="container mx-auto p-4 ">
          <p className="font-semibold">Search Results : {data.length}</p>
          <InfiniteScroll
            dataLength={data.length}
            hasMore={true}
            next={handeFetchMore}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 ">
              {data.map((p, index) => {
                return (
                  <div key={index} className=" ">
                    <CardProduct data={p} />
                  </div>
                );
              })}
              {/* loading data */}
              {loading &&
                loadingArrayCard.map((_, index) => {
                  return (
                    <div key={index} className="">
                      <CardLoading />
                    </div>
                  );
                })}
            </div>
          </InfiniteScroll>
          {/* no data */}
          {!data[0] && !loading && (
            <div className="flex justify-center items-center lg:mt-12 flex-col">
              <img src={noDataImage} alt="no data image" className="max-w-sm" />
              <p className="font-semibold text-xl italic">No data found</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Search;
