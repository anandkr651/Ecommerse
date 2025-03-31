import React from "react";

function CardLoading() {
  return (
    <div className="border py-2 lg:p-4 p-2 grid gap-1 lg:gap-3 min-w-32 md:max-w-52 h-full rounded cursor-pointer bg-white">
      <div className="min-h-20 bg-blue-50 rounded p-2"></div>
      <div className="p-2 bg-blue-50 rounded w-16 "></div>
      <div className="p-2 bg-blue-50 rounded w-40"></div>
      <div className="p-2 bg-blue-50 rounded w-14"></div>
      <div className="flex items-center gap-3 justify-between">
        <div className="p-2 bg-blue-50 rounded w-14"></div>
        <div className="p-2 bg-blue-50 rounded w-14"></div>
      </div>
    </div>
  );
}

export default CardLoading;
