import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useLocation, useNavigate } from "react-router-dom";

function VerifyForgotPasswordOtp() {
  const [data, setData] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();
  const inputRef = useRef([]);
  const location = useLocation();

  // console.log("location", location); //yaha forgetpassword se email aaya hai
  /*hash:""
    key:"a5lf0jcz"
    pathname:"/verifyForgotPasswordOtp"
    search:""
    state:
      email:"anandkumar20092005@gmail.com" 
  */

  useEffect(() => {
    if (!location?.state?.email) {
      navigate("/forgotPassword"); //go to pages/forgotPassword
    }
  }, []);

  const valideValue = data.every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.verifyForgotPasswordOtp,
        data: {
          otp: data.join(""),
          email: location?.state?.email,
        },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setData(["", "", "", "", "", ""]);
        navigate("/resetpassword", { //go to pages/resetPassword
          state: {
            data: response.data,
            email: location?.state?.email, //reset password mi email chayai
          },
        });
      }
    } catch (error) {
      console.log("error", error);
      AxiosToastError(error);
    }
  };

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <p className="font-semibold text-lg">Enter OTP</p>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="otp">Enter Your OTP :</label>
            <div className="flex items-center gap-2 justify-between mt-3">
              {data.map((element, index) => {
                return (
                  <input
                    key={index}
                    type="text"
                    id="otp"
                    ref={(ref) => {
                      inputRef.current[index] = ref;
                      return ref;
                    }}
                    value={data[index]}
                    onChange={(e) => {
                      const value = e.target.value;
                      // console.log("value", value);
                      const newData = [...data];
                      newData[index] = value;
                      setData(newData);

                      if (value && index < 5) {
                        inputRef.current[index + 1].focus();
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace" && !data[index] && index > 0) {
                        inputRef.current[index - 1]?.focus();
                      }
                    }}
                    maxLength={1}
                    className="bg-blue-50 w-full max-w-16 p-2 border rounded outline-none focus:border-primary-200 text-center font-semibold"
                  />
                );
              })}
            </div>
          </div>

          <button
            disabled={!valideValue}
            className={` ${valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500" } text-white py-2 rounded font-semibold my-3 tracking-wide`}>
            Verify OTP
          </button>
        </form>
        <p>Already have account?{" "}
          <Link to={"/login"} className="font-semibold text-green-700 hover:text-green-800">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}

export default VerifyForgotPasswordOtp;
