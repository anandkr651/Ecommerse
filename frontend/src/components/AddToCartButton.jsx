import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../provider/globalProvider";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";
import { FaMinus, FaPlus } from "react-icons/fa6";

function AddToCartButton({ data }) {
  const [loading, setLoading] = useState(false);
  const { fetchCartItem, updateCartQty, deleteCartItemQty } = useGlobalContext();
  const cartItem = useSelector((state) => state.cartItem.cart);
  // console.log(cartItem);
  const [isAvailable, setIsAvailable] = useState(false);
  const [qty, setQty] = useState(0);
  const [cartItemDetails, setCartItemDetails] = useState();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.createAddToCartItem,
        data: {
          productId: data._id,
        },
      });
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        if (fetchCartItem) {
          fetchCartItem();
        }
      }
      setLoading(false);
    } catch (error) {
      AxiosToastError(error);
    }
  };
  // checking this item in cart or not
  useEffect(() => {
    const checkingItem = cartItem.some((item) => item.productId._id === data._id);
    // console.log(checkingItem);
    setIsAvailable(checkingItem);
    
    const product = cartItem.find((item) => item.productId._id === data._id);
    // console.log(product);
    setCartItemDetails(product);
    
    setQty(product?.quantity);
  }, [data, cartItem]);

  const decreaseQty = async(e) => {
    e.preventDefault();
    e.stopPropagation();
    if (qty === 1) {
      deleteCartItemQty(cartItemDetails?._id);
    }else{
        const response = await updateCartQty(cartItemDetails?._id, qty - 1);
        if(response.success){
            toast.success("Item remove")
        }
    }
  };

  const increaseQty = async(e) => {
    e.preventDefault();
    e.stopPropagation();
    const response = await updateCartQty(cartItemDetails?._id, qty + 1);
    if(response.success){
        toast.success("Item added")
       }
  };
  return (
    <div>
      {isAvailable ? (
        <div className="flex w-full h-full">
          <button
            onClick={decreaseQty}
            className="bg-green-600 hover:bg-green-700 text-white flex-1 w-full p-1 rounded flex items-center justify-center"
          >
            <FaMinus />
          </button>
          <p className="flex-1 w-full font-semibold px-1 flex items-center justify-center border">
            {qty}
          </p>
          <button
            onClick={increaseQty}
            className="bg-green-600 hover:bg-green-700 text-white flex-1 w-full p-1 rounded flex items-center justify-center"
          >
            <FaPlus />
          </button>
        </div>
      ) : (
        <button
          className="px-2 hover:bg-green-600 border hover:text-white text-green-500 border-green-400 rounded"
          onClick={handleAddToCart}
        >
          {loading ? <Loading /> : "Add"}
        </button>
      )}
    </div>
  );
}

export default AddToCartButton;
