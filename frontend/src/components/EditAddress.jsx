import React, { useState, useRef } from "react";
import { IoClose } from "react-icons/io5";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";

function EditAddress({ close, data: EditAddressData,fetchData }) {
  const [data, setData] = useState({
    _id:EditAddressData._id,
    addressLine: EditAddressData.addressLine,
    city: EditAddressData.city,
    state: EditAddressData.state,
    pincode: EditAddressData.pincode.split(""),
    country: EditAddressData.country,
    mobile: EditAddressData.mobile,
  });

  const valideValue = Object.values(data).every((el) => el);
  const inputRef = useRef([]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.updateAddress,
        data: {
          ...data,
          pincode: data.pincode.join(""),
        },
      });
      console.log(response);
      
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        fetchData()
        close();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <div>
      <section className="fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800 bg-opacity-60 h-[88vh] lg:h-screen overflow-auto">
        <div className="bg-white max-w-2xl w-full p-4 rounded">
          <div className="flex items-center justify-center">
            <h1 className="font-semibold">Edit Address</h1>
            <button className="w-fit block ml-auto" onClick={close}>
              <IoClose />
            </button>
          </div>
          <form action="" className="grid gap-2" onSubmit={handleSubmit}>
            {/* Address Line */}
            <div className="grid gap-1">
              <label htmlFor="addressLine">Address Line</label>
              <input
                type="text"
                id="addressLine"
                placeholder="Enter the Address"
                className="bg-slate-100 p-2 rounded-md outline-none border border-blue-200 hover:focus-within:border-primary-200"
                value={data.addressLine}
                name="addressLine"
                onChange={handleOnChange}
              />
            </div>
            {/* City */}
            <div className="grid gap-1">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                placeholder="Enter the city"
                className="bg-slate-100 p-2 rounded-md outline-none border border-blue-200 hover:focus-within:border-primary-200"
                value={data.city}
                name="city"
                onChange={handleOnChange}
              />
            </div>
            {/* State */}
            <div className="grid gap-1">
              <label htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                placeholder="Enter the state"
                className="bg-slate-100 p-2 rounded-md outline-none border border-blue-200 hover:focus-within:border-primary-200"
                value={data.state}
                name="state"
                onChange={handleOnChange}
              />
            </div>
            {/* pincode */}
            <div className="grid gap-1">
              <label htmlFor="pincode">Pincode</label>
              <div className="flex gap-1">
                {data.pincode.map((_, index) => {
                  return (
                    <input
                      key={index}
                      type="text"
                      id="pincode"
                      ref={(ref) => {
                        inputRef.current[index] = ref;
                        return ref;
                      }}
                      value={data.pincode[index]}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/, "");
                        // console.log("value", value);
                        const newPincode = [...data.pincode];
                        newPincode[index] = value;
                        setData((prev) => ({
                          ...prev,
                          pincode: newPincode,
                        }));

                        if (value && index < 5) {
                          inputRef.current[index + 1].focus();
                        }
                      }}
                      onKeyDown={(e) => {
                        if (
                          e.key === "Backspace" &&
                          !data.pincode[index] &&
                          index > 0
                        ) {
                          inputRef.current[index - 1]?.focus();
                        }
                      }}
                      maxLength={1}
                      className="bg-blue-50 w-full max-w-8 p-2 border rounded outline-none focus:border-primary-200 text-center font-semibold"
                    />
                  );
                })}
              </div>
            </div>

            {/* country */}
            <div className="grid gap-1">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                placeholder="Enter the country"
                className="bg-slate-100 p-2 rounded-md outline-none border border-blue-200 hover:focus-within:border-primary-200"
                value={data.country}
                name="country"
                onChange={handleOnChange}
              />
            </div>

            {/* mobile no*/}
            <div className="grid gap-1">
              <label htmlFor="mobile">Mobile No</label>
              <input
                type="text"
                id="mobile"
                placeholder="Enter the mobile"
                className="bg-slate-100 p-2 rounded-md outline-none border border-blue-200 hover:focus-within:border-primary-200"
                value={data.mobile}
                name="mobile"
                onChange={handleOnChange}
              />
            </div>
            <button
              disabled={!valideValue}
              className={`${
                valideValue
                  ? "bg-primary-200 outline-none"
                  : "bg-gray-400 cursor-not-allowed"
              } py-1 rounded-md`}
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default EditAddress;
