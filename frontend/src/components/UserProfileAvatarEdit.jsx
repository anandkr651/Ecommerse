import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { updatedAvatar } from "../store/userSlice";
import { IoClose } from "react-icons/io5";
import DummyAvatar from "../assets/man.png";

function UserProfileAvatarEdit({ close }) {  // close yaha par profile.jsx se aaya hai
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventdefault();
  };

  const handleUploadAvatarImage = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("avatar", file);
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.uploadAvatar,
        data: formData,
      });
      console.log(response);
      toast.success(response.data.message);
      // window.location.reload()
      const { data: responseData } = response;

      dispatch(updatedAvatar(responseData.data.avatar));
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <section className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-900 bg-opacity-60 flex items-center justify-center ">
        <div className="bg-white max-w-sm w-full rounded p-4 flex flex-col items-center justify-center">
          <button
            onClick={close}
            className="text-neutral-800 block w-fit ml-auto"
          >
            <IoClose size={25} />
          </button>
          <div className="w-20 h-20 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm ">
            <img
              src={user.avatar || DummyAvatar}
              alt={user.name}
              className="w-full h-full "
            />
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="updateProfile">
              <div className="border border-primary-200 hover:bg-primary-200 px-4 py-1 rounded text-sm my-3 cursor-pointer">
                {loading ? "Loading..." : "upload"}
              </div>
            </label>
            <input
              type="file"
              id="updateProfile"
              className="hidden"
              onChange={handleUploadAvatarImage}
            />
          </form>
        </div>
      </section>
    </div>
  );
}

export default UserProfileAvatarEdit;
