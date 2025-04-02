import React, { useState } from "react";
import { useGlobalContext } from "../provider/globalProvider";
import displayPriceInRupees from "../utils/DisplayPriceRupees";
import AddAddress from "../components/AddAddress";
import { useSelector } from "react-redux";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function CheckOut() {
  const { noDiscountTotalPrice, totalPrice, totalQty, fetchCartItem } =
    useGlobalContext();
  const [openAddress, setOpenAddress] = useState(false);
  const addressList = useSelector((state) => state.address.addressList);
  const [selectAddress, setSelectAddress] = useState(0);
  const cartItem = useSelector((state) => state.cartItem.cart);
  const navigate = useNavigate();

  const handleCashOnDelivery = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.CashOnDelivery,
        data: {
          listItem: cartItem,
          deliveryAddressId: addressList[selectAddress]._id,
          totalAmt: totalPrice,
          subTotal: totalPrice,
        },
      });
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        fetchCartItem();
        navigate("/success", {
          //go to pages/success
          state: {
            text: "Order",
          },
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div>
      <section className="bg-blue-50">
        <div className="container mx-auto lg:py-1 flex flex-col md:flex-row w-full gap-5 justify-between">
          <div className="w-full bg-white py-4 px-2 lg:h-screen lg:max-h-[75vh] lg:overflow-auto scrollbar-none">
            {/* address */}
            <h3 className="text-lg font-semibold ">choose your address</h3>
            {/* dispaly address */}
            <div className="p-1">
              {addressList.map((address, index) => {
                return (
                  <label htmlFor={index} key={index}>
                    <div
                      className={`rounded p-3 flex gap-3 my-2 border ${
                        address._id === addressList[selectAddress]?._id
                          ? "border-primary-200"
                          : ""
                      } ${address.status === false && "hidden "}`}
                    >
                      <div>
                        <input
                          id={index}
                          type="radio"
                          value={index}
                          onChange={(e) => setSelectAddress(e.target.value)}
                          name="address"
                          className=""
                        />
                      </div>
                      <div>
                        <p>{address.addressLine}</p>
                        <p>{address.city}</p>
                        <p>{address.state}</p>
                        <p>
                          {address.country} - {address.pincode}
                        </p>
                        <p>{address.mobile}</p>
                      </div>
                    </div>
                  </label>
                );
              })}
              <div
                onClick={() => setOpenAddress(true)}
                className="h-16 bg-blue-50 border-2 flex justify-center items-center cursor-pointer hover:bg-blue-100 font-medium text-lg "
              >
                add address
              </div>
            </div>
          </div>

          <div className="w-full max-w-md bg-white py-4 px-2 lg:h-screen lg:max-h-[70vh] lg:overflow-auto">
            {/* summary */}
            <h3 className="text-lg font-semibold">Summary</h3>
            <div className="px-4">
              <h3 className="font-semibold">Bill details</h3>
              <div className="flex justify-between ml-1">
                <p>Total Amount</p>
                <span>
                  <span className="line-through text-gray-400 px-2">
                    {displayPriceInRupees(noDiscountTotalPrice)}{" "}
                  </span>
                  <span>{displayPriceInRupees(totalPrice)}</span>
                </span>
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
            <div className="w-full flex flex-col gap-4 pt-4">
              <button
                onClick={handleCashOnDelivery}
                className="border-2 rounded border-green-600 py-2 px-4 font-semibold text-green-600 hover:bg-green-600 hover:text-white"
              >
                Cash On Delivery
              </button>
            </div>
          </div>
        </div>
        {openAddress && <AddAddress close={() => setOpenAddress(false)} />}
      </section>
    </div>
  );
}

export default CheckOut;
