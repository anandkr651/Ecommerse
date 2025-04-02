import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import fetchUserDetails from "./utils/fetchUserDetails";
import { setUserDetails } from "./store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Axios from "./utils/Axios";
import SummaryApi from "./common/SummaryApi";
import {
  setAllCategory,
  setAllSubCategory,
} from "./store/productSlice";
import GlobalProvider from "./provider/globalProvider";
import CartMobile from "./components/CartMobile";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.user)
  const location = useLocation()

  const fetchUser = async () => {
    try {
      const userData = await fetchUserDetails();
      dispatch(setUserDetails(userData?.data?.data));
    } catch (error) {
      // console.log(error);
    }
  };

  const fetchCatagory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getCategory,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        dispatch(setAllCategory(responseData.data));
      }
    } catch (error) {
      // console.log(error);
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
      // console.log(error);
    }
  };


  useEffect(() => {
    fetchUser();
    fetchCatagory();
    fetchSubCatagory();
  }, []);

  return (
    <>
      <GlobalProvider>
        <div className="sticky top-0 ">
          <Header />
        </div>
        <main className="lg:min-h-[75vh] min-h-[56vh]">
          <Outlet />
        </main>
        <Footer />
        <Toaster />
        <div className="sticky bottom-0 lg:hidden p-2">
          {user._id && location.pathname !=="/checkOut" && <CartMobile />}
        </div>
      </GlobalProvider>
    </>
  );
}

export default App;
