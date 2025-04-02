import { createContext, useContext, useEffect, useState } from "react";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import { useDispatch, useSelector } from "react-redux";
import AxiosToastError from "../utils/AxiosToastError";
import { handleAddCartItem } from "../store/cartProductSlice";
import toast from "react-hot-toast";
import priceWithDiscount from "../utils/priceWithDiscount";
import {handleAddAddress} from "../store/addressSlice"

export const globalContext = createContext(null);
export const useGlobalContext = () => useContext(globalContext);

const GlobalProvider = ({ children }) => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cartItem.cart);
  // console.log(cartItem);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const [noDiscountTotalPrice, setNoDiscountTotalPrice] = useState(0);
  const user = useSelector((state) => state.user);  

  const fetchCartItem = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getCartItem,
      });
      const { data: responseData } = response;
      if(responseData.success){
      dispatch(handleAddCartItem(responseData.data));
      }
    } catch (error) {
      // console.log(error);
    }
  };
  const updateCartQty = async (id, qty) => {
    // console.log(id,qty);
    try {
      const response = await Axios({
        ...SummaryApi.updateCartItemQty,
        data: {
          _id: id,
          qty: qty,
        },
      });
      const { data: responseData } = response;
      if (responseData.success) {
        // toast.success(responseData.message)
        fetchCartItem();
        return responseData;
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  const deleteCartItemQty = async (cartId) => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCartItemQty,
        data: {
          _id: cartId,
        },
      });
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        fetchCartItem();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const fetchAddress = async()=>{
    try {
      const response = await Axios({
        ...SummaryApi.getAddress
      })
      const {data:responseData} = response    
      if(responseData.success){
        // toast.success(responseData.message)
        dispatch(handleAddAddress(responseData.data))
      }
    } catch (error) {
      AxiosToastError(error)
      
    }
  }
  useEffect(() => {
    fetchCartItem();
    fetchAddress()
  }, [user]);

  useEffect(() => {
    const qty = cartItem.reduce((prev, curr) => {
      return prev + curr.quantity;
    }, 0);
    setTotalQty(qty);
    
    const tprice = cartItem.reduce((prev, curr) => {
      return (
        prev + priceWithDiscount(curr.productId.price, curr.productId.discount) *curr.quantity
      );
    }, 0);
    //  console.log(tprice);
    setTotalPrice(tprice);

    const noDiscountTprice = cartItem.reduce((prev, curr) => {
      return prev + curr.productId.price * curr.quantity;
    }, 0);
    setNoDiscountTotalPrice(noDiscountTprice);
  }, [cartItem]);

  return (
    <globalContext.Provider value={{fetchCartItem,updateCartQty,deleteCartItemQty,totalPrice,totalQty,noDiscountTotalPrice,fetchAddress}}>
      {children}
    </globalContext.Provider>
  );
};

export default GlobalProvider;
