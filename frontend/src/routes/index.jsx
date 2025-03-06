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
        ],
      },
    ],
  },
]);

export default router;
