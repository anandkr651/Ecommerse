import React from "react";
import { IoClose } from "react-icons/io5";

function ViewImage({ url, close }) { //comes from pages/subcategory
  return (
    <div className="fixed left-0 right-0 bottom-0 top-0 bg-neutral-900 bg-opacity-70 flex items-center justify-center p-4">
      <div className="w-full max-w-md max-h-[75vh] p-4 bg-white">
        <button onClick={close} className="w-fit ml-auto block">
          <IoClose size={25} />
        </button>
        <img
          src={url}
          alt="full screen"
          className="w-full h-full object-scale-down"
        />
      </div>
    </div>
  );
}

export default ViewImage;
