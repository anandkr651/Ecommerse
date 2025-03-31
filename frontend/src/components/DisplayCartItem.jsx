import React from "react";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../provider/globalProvider";
import displayPriceInRupees from "../utils/DisplayPriceRupees";
import { FaCaretRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import AddToCartButton from "./AddToCartButton";
import priceWithDiscount from "../utils/priceWithDiscount";
import emptyImage from "../assets/empty_cart.webp";
import Divider from "./Divider";

function DisplayCartItem({ close }) {
  const { noDiscountTotalPrice, totalPrice,totalQty } = useGlobalContext();
  const cartItem = useSelector((state) => state.cartItem.cart);

  return (
    <section className="fixed left-0 right-0 top-0 bottom-0 bg-slate-800 bg-opacity-50 z-42">
      <div className="bg-blue-50 w-full max-w-sm min-h-screen max-h-screen ml-auto ">
        <div className="flex justify-between items-center px-4 py-2 shadow bg-white">
          <h2 className="font-bold text-lg">Cart</h2>
          <Link to={"/"} className="md:hidden">
            <IoClose size={25} />
          </Link>
          <button onClick={close} className="hidden md:block">
            <IoClose size={25} />{" "}
          </button>
        </div>
        <div className="min-h-[82vh] h-full max-h-[calc(100vh-150px)] bg-blue-50 p-2 flex flex-col gap-1">
          {cartItem[0] ? (
            <>
              {/* saving section */}
              <div className="flex items-center bg-blue-100 px-4 py-2 gap-1 text-green-700 rounded-md font-medium ">
                <p>your total saving </p>
                <p>{displayPriceInRupees(noDiscountTotalPrice - totalPrice)}</p>
              </div>
               {/* display item */}
              <div className="bg-white rounded-lg p-2 grid gap-2 scrollbar-none overflow-auto ">
                {cartItem[0] &&
                  cartItem.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="w-full flex gap-3 items-center justify-center"
                      >
                        <div className="w-20 h-20 min-h-20 min-w-20 bg-red-500 border rounded-lg overflow-hidden">
                          <img
                            src={item.productId?.image[0]}
                            alt=""
                            className="object-scale-down "
                          />
                        </div>
                        <div className="w-full ">
                          <p className="text-ellipsis line-clamp-2">
                            {item.productId?.name}
                          </p>
                          <div className="flex shadow-sm items-center justify-between px-2 rounded-md text-gray-500">
                            <p className=" w-fit rounded-lg">
                              {item.productId.unit}
                            </p>
                            <p>{displayPriceInRupees(priceWithDiscount(item.productId.price,item.productId.discount))}</p>
                          </div>
                        </div>
                        <div>
                          <AddToCartButton data={item.productId} />
                        </div>
                      </div>
                    );
                  })}
                  <Divider/>
              <div className="bg-white px-4">
               <h3 className="font-semibold">Bill details</h3>
               <div className="flex justify-between ml-1">
                <p>Total Amount</p>
                <span><span className="line-through text-gray-400 px-2">{displayPriceInRupees(noDiscountTotalPrice)} </span><span>{displayPriceInRupees(totalPrice)}</span></span>
               </div>
               <div className="flex justify-between ml-1">
                <p>Total Quantity</p>
                <span>{totalQty} Item </span>
               </div>
               <div className="flex justify-between ml-1">
                <p>Delivery charge</p>
                <span>Free</span>
               </div>
               <div className="flex justify-between ml-1 font-bold">
                <p>Grand Total</p>
                <span>{displayPriceInRupees(totalPrice)}</span>
               </div>
              </div>
              </div>
            </>
          ) : (
            <div className="bg-white flex items-center justify-center flex-col">
              <img src={emptyImage} alt="empty Image" />
              <Link
                to={"/"}
                onClick={close}
                className="border border-green-500 hover:bg-green-500 flex items-center justify-center px-2 py-1 rounded-md text-base font-medium hover:text-white"
              >
                shop now <FaCaretRight />
              </Link>
            </div>
          )}
        </div>
        {cartItem[0] && (
          <div className="p-2 text-lg font-medium">
            <div className="bg-green-700 p-2 lg:p-4 text-neutral-100 sticky bottom-1 flex items-center justify-between rounded-lg">
              <h3>{displayPriceInRupees(totalPrice)}</h3>
              <button className="flex items-center justify-center">
                Proceed
                <span>
                  <FaCaretRight />
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default DisplayCartItem;
