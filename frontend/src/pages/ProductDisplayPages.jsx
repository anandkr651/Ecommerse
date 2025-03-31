import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import Loading from "../components/Loading";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import displayPriceInRupees from "../utils/DisplayPriceRupees";
import Divider from "../components/Divider";
import image1 from "../assets/minute_delivery.png";
import image2 from "../assets/Best_Prices_Offers.png";
import image3 from "../assets/Wide_Assortment.png";
import priceWithDiscount from "../utils/priceWithDiscount";
import AddToCartButton from "../components/AddToCartButton";

function ProductDisplayPages() {
  const params = useParams();
  // console.log(params);
  // {product: 'Fortune Chakki Fresh (100% Atta, 0% Maida) Atta-67e2891c39f9c4531d0ebb7e'}
  const productId = params.product?.split("-")[1];
  // console.log(productId)
  // 67e2891c39f9c4531d0ebb7e

  const [data, setData] = useState({
    name: "",
    image: [],
  });
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(0);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductDetails,
        data: {
          productId: productId, //first wala productId comes from backend and second wala productId comes from params
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
    fetchProductDetails();
  }, [params]);

  const handleNext = () => {
    // console.log(data.image.length);
    // console.log(image);
    if (image != data.image.length - 1) {
      setImage((next) => next + 1);
    } else {
      setImage(0);
    }
  };
  const handlePrev = () => {
    if (image != 0) {
      setImage((prev) => prev - 1);
    } else {
      setImage(data.image.length - 1);
    }
  };
  return (
    <div className="mx-auto">
      <section className="container mx-auto lg:grid lg:grid-cols-3">
        <div className="col-span-2 border border-red-400 lg:max-h-[77vh] overflow-auto">
          <div className="rounded lg:min-h-[50vh] lg:max-h-[50vh] h-full w-full bg-white">
            {loading ? <div className="w-full h-full text-center flex justify-center items-center "><Loading /></div> : <img
              src={data.image[image]}
              alt=""
              className="w-full h-full object-scale-down lg:p-1 p-3"
              />}
          </div>

          <div className="w-full absolute top-60 flex justify-between lg:hidden px-5">
            <button
              className="shadow-lg p-2 rounded-full bg-white hover:bg-gray-300"
              onClick={handlePrev}
            >
              <FaAngleLeft />{" "}
            </button>
            <button
              className="shadow-lg p-2 rounded-full bg-white hover:bg-gray-300"
              onClick={handleNext}
            >
              <FaAngleRight />{" "}
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 bg-white p-1">
            {data.image.map((img, index) => {
              return (
                <div
                key={index}
                  className={`bg-slate-200 lg:w-5 lg:h-5 w-2 h-2 rounded-full cursor-pointer ${
                    index === image && "bg-slate-500"
                  }`}
                  onClick={() => setImage(index)}
                ></div>
              );
            })}
          </div>

          <div className="flex gap-4 p-2 w-full">
            {data.image.map((img, index) => {
              return (
                <div
                  key={index}
                  className="shadow-2xl lg:rounded-2xl rounded-md object-scale-down"
                >
                  <img
                    src={img}
                    alt="mini-product"
                    className={`cursor-pointer lg:h-[126px] w-full h-[80px] ${
                      index === image && "opacity-50 "
                    }`}
                    onClick={() => setImage(index)}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="border border-green-400 p-4 lg:pl-7 text-base lg:text-lg  lg:max-h-[77vh] overflow-auto scrollbar-none">
          <p className="bg-green-500 w-fit rounded-full px-2">10 min</p>
          <h3 className="text-lg font-semibold lg:text-3xl italic text-green-500">
            {data.name}
          </h3>
          <p className="bg-green-500 w-fit rounded-full px-2 my-2">{data.unit}</p>
          <Divider />
          <div>
            <p className="text">Price</p>
            <div className="flex items-center gap-3">
              <div className="border border-green-500 px-4 py-2 w-fit bg-green-200 rounded-md">
                <p className="font-semibold text-lg lg:text-xl">
                  {displayPriceInRupees(
                    priceWithDiscount(data.price, data.discount)
                  )}
                </p>
              </div>
              {data.discount != 0 &&<>
              <p className="line-through text-slate-400">{displayPriceInRupees(data.price)}</p>
              <h3 className="text-green-500 font-semibold text-xl">{data.discount}% <span className="text-sm ">Discount</span></h3>
              </>}
            </div>
          </div>
          {data.stock === 0 ? (
            <p className="text-lg text-red-500 my-2 font-semibold ">
              Out of stock
            </p>
          ) : (
            <div className="my-4 lg:w-fit">
              <AddToCartButton data={data}/>
            </div>
          )}
          <h2 className="capitalize font-semibold">why shop from binkeyit ?</h2>
          <div>
            <div className="flex items-center gap-3 my-1">
              <img
                src={image1}
                alt="superFast delivery"
                className="w-20 h-20"
              />
              <div className="text-sm">
                <h2 className="font-semibold ">Superfast Delivery</h2>
                <p>
                  Get your order deliverd to your doorstep at the earliest from
                  dark stores near you.
                </p>
              </div>
            </div>
            <div className="flex  items-center gap-4 my-4">
              <img
                src={image2}
                alt="Best prices offers"
                className="w-20 h-20"
              />
              <div className="text-sm">
                <div className="font-semibold">Best Prices & Offers</div>
                <p>
                  Best price destination with offers directly from the
                  nanufacturers.
                </p>
              </div>
            </div>
            <div className="flex  items-center gap-4 my-4">
              <img src={image3} alt="Wide Assortment" className="w-20 h-20" />
              <div className="text-sm">
                <div className="font-semibold">Wide Assortment</div>
                <p>
                  Choose from 5000+ products across food personal care,
                  household & other categories.
                </p>
              </div>
            </div>
          </div>

          <div className="my-4 grid gap-3 ">
            <div>
              <p className="font-semibold">Description</p>
              <p className="text-base">{data.description}</p>
            </div>
            {data?.moreDetail &&
              Object.keys(data?.moreDetail).map((element, index) => {
                return (
                  <div key={index}>
                    <p className="font-semibold">{element}</p>
                    <p className="text-base">{data?.moreDetail[element]}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDisplayPages;
