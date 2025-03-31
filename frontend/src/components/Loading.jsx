import React from "react";

function Loading() {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin ease-linear rounded-full w-8 h-8 border-t-2 border-b-2 border-blue-500 ml-3"></div>
    </div>
  );
}

export default Loading;
