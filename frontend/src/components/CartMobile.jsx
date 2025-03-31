import React from "react";
import { useGlobalContext } from "../provider/globalProvider";
import { GiShoppingCart } from "react-icons/gi";
import displayPriceInRupees from "../utils/DisplayPriceRupees";
import { FaCaretRight } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function CartMobile() {
  const { totalPrice, totalQty } = useGlobalContext();
  const cartItem = useSelector((state) => state.cartItem.cart);
  const location = useLocation();
  // console.log(location.pathname);

  return (
    <>
      <div>
        {location.pathname === "/cart" ? (
          <div></div>
        ) : (
          <div className="flex items-center justify-between px-2 py-1 bg-green-600 hover:bg-green-500 rounded-md font-semibold">
            <div className="flex items-center gap-2">
              <div className="animate-bounce ">
                <GiShoppingCart size={28} />
              </div>
              <div>
                {cartItem[0] ? (
                  <div>
                    <p>{totalQty} Item</p>
                    <p>{displayPriceInRupees(totalPrice)}</p>
                  </div>
                ) : (
                  <p>My Cart</p>
                )}
              </div>
            </div>
            {cartItem[0] && (
              <Link
                to={"/cart"}
                className="flex items-center justify-center  gap-1"
              >
                <span>view cart</span>
                <FaCaretRight />
              </Link>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default CartMobile;
