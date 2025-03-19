import React from "react";

function ProductCardAdmin({ data }) {
  return (
    <div className="w-36 p-2 shadow-md rounded-md bg-slate-100">
      <div className="">
        <img
          src={data?.image[0]}
          alt={data.name}
          className="w-full h-full object-scale-down "
        />
      </div>
      <p className="text-ellipsis line-clamp-2">{data?.name}</p>
      <p>{data?.unit}</p>
    </div>
  );
}

export default ProductCardAdmin;
