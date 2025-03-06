import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Divider from "./Divider";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { logout } from "../store/userSlice.js";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { FaExternalLinkAlt } from "react-icons/fa";

function UserMenu({ close }) { //close props header se aa raha hai
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    if (close) {
      close();
    }
  };

  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.logout,
      });
      // console.log("logout", response);
      if (response.data.success) {
        if (close) {
          close();
        }
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <div className="px-2 py-3">
      <div className="font-semibold "> My Account </div>
      <div className="text-sm capitalize italic font-normal flex justify-between items-center">
        Hello {user.name}{" "}
        <Link onClick={handleClose} to={"/dashboard/profile"} className="hover:text-orange-400">
          <FaExternalLinkAlt />
        </Link>{" "}
      </div>
      <Divider />
      <div className="flex flex-col text-center gap-2">
        <Link onClick={handleClose} to={"/dashboard/myOrder"} className="bg-orange-300 rounded-md hover:bg-orange-400" >
          My Orders{" "}
        </Link>
        <Link onClick={handleClose} to={"/dashboard/address"} className="bg-orange-300 rounded-md hover:bg-orange-400">
          Save Address
        </Link>
        <button onClick={handleLogout} className="bg-red-400 rounded-md hover:bg-red-500">
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserMenu;
