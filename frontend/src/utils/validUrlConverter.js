import React from "react";

function validUrlConverter(name) {
  // const url = name.toString().replaceAll(" ","%20").replaceAll(",","%2C").replaceAll("&","%26")
  // this is wrong. when i use name --> aata 100% then it give error. i can also try .replaceAll("%",%25")
  const url = encodeURIComponent(name.toString());
  return url;
}

export default validUrlConverter;
