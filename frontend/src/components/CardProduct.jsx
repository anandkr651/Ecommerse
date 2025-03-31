import React from "react";
import displayPriceInRupees from "../utils/DisplayPriceRupees";
import { Link } from "react-router-dom";
import validUrlConverter from "../utils/validUrlConverter";
import priceWithDiscount from "../utils/priceWithDiscount";
import AddToCartButton from "./AddToCartButton";

function CardProduct({ data }) {
  const url = `/product/${validUrlConverter(data.name.toString())}-${data._id}`;

  return (
    <Link to={url}
    //go to pages/productDisplayPage
    > 
      <div className='border py-2 lg:p-4 p-2 grid gap-1 lg:gap-3 min-w-36 lg:min-w-52 h-full rounded bg-white'>
        <div className="min-h-20 w-full max-h-24 lg:max-h-32 rounded overflow-hidden cursor-pointer">
          <img
            src={data.image[0]}
            alt=""
            className="w-full h-full object-scale-down"
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="px-1 rounded w-fit text-green-600 bg-green-100 ">
            10 min
          </div>
          <div>
            {data.discount != 0 && (
              <p className="text-green-600 bg-green-100 rounded w-fit px-1">
                {data.discount}% Discount
              </p>
            )}
          </div>
        </div>
        <div className="font-medium text-ellipsis line-clamp-2 w-40">
          {data.name}
        </div>
        <div className="w-fit">{data.unit}</div>
        <div className="flex items-center gap-3 justify-between">
          <div className="px-1 rounded w-fit font-semibold">
            {displayPriceInRupees(
              priceWithDiscount(data.price, data.discount)
            )}{" "}
          </div>
          {data.stock !=0 ?
            (<AddToCartButton data={data}/> ):
          (<div className="text-red-500 font-bold cursor-not-allowed">Out Of Stock</div>)
          }
        </div>
      </div>
      </Link>
  );
}

export default CardProduct;
