import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import LoginPage from "../pages/LoginPage";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import VerifyForgotPasswordOtp from "../pages/VerifyForgotPasswordOtp";
import Resetpassword from "../pages/Resetpassword";
import UserMenuMobile from "../pages/UserMenuMobile";
import Profile from "../pages/Profile";
import Dashboard from "../layouts/Dashboard";
import MyOrder from "../pages/MyOrder";
import Address from "../pages/Address";
import Category from "../pages/Category";
import SubCategory from "../pages/SubCategory";
import UploadProduct from "../pages/UploadProduct";
import ProductAdmin from "../pages/ProductAdmin";
import AdminPermission from "../layouts/AdminPermission";
import ProductListPage from "../pages/ProductListPage";
import ProductDisplayPages from "../pages/ProductDisplayPages";
import DisplayCartItemMobile from "../pages/DisplayCartItemMobile";
import CheckOut from "../pages/CheckOut";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "forgotPassword",
        element: <ForgotPassword />,
      },
      {
        path: "verifyForgotPasswordOtp",
        element: <VerifyForgotPasswordOtp />,
      },
      {
        path: "resetpassword",
        element: <Resetpassword />,
      },
      {
        path: "userMobile",
        element: <UserMenuMobile />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "myOrder",
            element: <MyOrder />,
          },
          {
            path: "address",
            element: <Address />,
          },
          {
            path: "category",
            element:<AdminPermission><Category/></AdminPermission> ,
          },
          {
            path: "subCategory",
            element: <AdminPermission><SubCategory /></AdminPermission>,
          },
          {
            path: "uploadProduct",
            element: <AdminPermission><UploadProduct /></AdminPermission>,
          },
          {
            path: "product",
            element: <AdminPermission><ProductAdmin /></AdminPermission>,
          },
        ],
      },
      {
        path:":category",
        children:[
          {
            path:":subCategory",
            element:<ProductListPage />
          }
        ]
      },
      {
        path:"product/:product",
        element:<ProductDisplayPages/>
      },
      {
        path:"cart",
        element:<DisplayCartItemMobile/>
      },
      {
        path:"checkOut",
        element:<CheckOut/>
      },
      {
        path:"success",
        element:<Success/>
      },
      {
        path:"cancel",
        element:<Cancel/>
      }
    ],
  },
]);

export default router;
