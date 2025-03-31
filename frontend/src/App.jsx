import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import fetchUserDetails from "./utils/fetchUserDetails";
import { setUserDetails } from "./store/userSlice";
import { useDispatch } from "react-redux";
import Axios from "./utils/Axios";
import SummaryApi from "./common/SummaryApi";
import {
  setAllCategory,
  setAllSubCategory,
  setLoadingCategory,
} from "./store/productSlice";
// import {handleAddCartItem} from "./store/cartProductSlice"
import GlobalProvider from "./provider/globalProvider";
import CartMobile from "./components/CartMobile";

function App() {
  const dispatch = useDispatch();

  const fetchUser = async () => {
    try {
      const userData = await fetchUserDetails();
      dispatch(setUserDetails(userData.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCatagory = async () => {
    try {
      dispatch(setLoadingCategory(true));
      const response = await Axios({
        ...SummaryApi.getCategory,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        dispatch(setAllCategory(responseData.data));
      }
      dispatch(setLoadingCategory(false));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSubCatagory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getSubCategory,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        dispatch(setAllSubCategory(responseData.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const fetchCartItem = async()=>{
  //   try {
  //     const response = await Axios({
  //       ...SummaryApi.getCartItem
  //     })
  //     const {data:responseData} = response
  //     dispatch(handleAddCartItem(responseData.data))
  //   } catch (error) {
  //     AxiosToastError(error)
  //   }
  // }

  useEffect(() => {
    fetchUser();
    fetchCatagory();
    fetchSubCatagory();
    // fetchCartItem()
  }, []);

  return (
    <>
      <GlobalProvider>
        <div className="sticky top-0 ">
          <Header />
        </div>
        <main className="min-h-[75vh]">
          <Outlet />
        </main>
        <Footer />
        <Toaster />
        <div className="sticky bottom-0 lg:hidden p-2">
          <CartMobile />
        </div>
      </GlobalProvider>
    </>
  );
}

export default App;
