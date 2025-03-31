import React, {useState } from "react";
import logo from "../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import Search from "./Search";
import DummyAvatar from "../assets/man.png";
import useMobile from "../hooks/useMobile";
import { GiShoppingCart } from "react-icons/gi";
import { useSelector } from "react-redux";
import { GoTriangleUp } from "react-icons/go";
import { GoTriangleDown } from "react-icons/go";
import UserMenu from "./UserMenu";
import { useNavigate } from "react-router-dom";
import displayPriceInRupees from "../utils/DisplayPriceRupees";
import { useGlobalContext } from "../provider/globalProvider";
import DisplayCartItem from "./DisplayCartItem";
// import priceWithDiscount from "../utils/priceWithDiscount";

function Header() {
  const [isMobile] = useMobile();
  const location = useLocation();
  const navigate = useNavigate();

  // console.log(location);
  /*hash:""
    key:imya9zj0"
    pathname:"/dashboard/profile"
    search:""
    state:null 
  */

  const isSearchPage = location.pathname === "/search";  //go to the pages/searchPage.jsx 

  const user = useSelector((state) => state?.user);
  // console.log(user);
  /*addressDetail:[]
    avatar:""
    email:"anandkumar20092005@gmail.com"
    lastLoginDate:"5/3/2025, 7:39:44 pm"
    mobile:6299203468
    name:"anand"
    orderHistory:[]
    role:"User"
    shoppingCart:[]
    status:"Active"
    verifyEmail:false
    _id:"67c52184c0b83ae2ec7e19bc" 
  */

  const [openUserMenu, setOpenUserMenu] = useState(false);
  const cartItem = useSelector((state)=>state.cartItem.cart)
  // // console.log(cartItem);
  // const [totalPrice,setTotalPrice] = useState(0)
  // const [totalQty,setTotalQty] = useState(0)

  const {totalPrice,totalQty } = useGlobalContext()
  const [openCartItem ,setOpenCartItem] =useState(false)


  const handleMobileUser = () => {
    if (!user._id) {
      navigate("/login"); //go to pages/loginPage
      return
    }
    navigate("/userMobile"); //go to pages/UserMenuMobile
  };

  const handleCloseUserMenu = () => {
    setOpenUserMenu(false);
  };

  // useEffect(()=>{
  //  const qty = cartItem.reduce((prev,curr)=>{
  //   return prev +curr.quantity
  //  },0)
  //  setTotalQty(qty)
  //  const tprice = cartItem.reduce((prev,curr)=>{
  //   return prev + (priceWithDiscount(curr.productId.price, curr.productId.discount)* curr.quantity)
  //  },0)
  // //  console.log(tprice);
  //  setTotalPrice(tprice)
  // },[cartItem])

  return (
    <div>
      <header className="h-24 md:h-20 md:shadow-md z-40 flex flex-col justify-center gap-1 bg-white w-full">
        {!(isSearchPage && isMobile) && (
          <div className="container mx-auto flex items-center justify-between px-4">
            {/**logo */}
            <div className="h-full">
              <Link
                to={"/"}
                className="h-full flex justify-center items-center"
              >
                <img
                  src={logo}
                  width={170}
                  height={60}
                  alt="logo"
                  className="hidden md:block"
                />
                <img
                  src={logo}
                  width={120}
                  height={60}
                  alt="logo"
                  className="md:hidden"
                />
              </Link>
            </div>

            {/**Search */}
            <div className="hidden md:block">
              <Search />
            </div>

            {/* add to cart and login */}
            {/* mobile version */}
            <div className="">
              <button
                className="md:hidden block pr-5"
                onClick={handleMobileUser}
              >
                <img
                  src={user.avatar || DummyAvatar}
                  alt=""
                  className="h-8 w-8 rounded-full"
                />
              </button>

              {/* desktop */}
              <div className="hidden md:flex items-center justify-center gap-4 cursor-pointer">
                {user?._id ? (
                  <div className="">
                    <div
                      className="flex items-center gap-2"
                      onClick={() => setOpenUserMenu((prev) => !prev)}
                    >
                      <p>Account</p>
                      {openUserMenu ? (
                        <GoTriangleUp size={25} />
                      ) : (
                        <GoTriangleDown size={25} />
                      )}
                    </div>
                    {openUserMenu && (
                      <div className="absolute right-2 top-20 ">
                        <div className="bg-white md:shadow-lg rounded p-4 min-w-52">
                          <UserMenu close={handleCloseUserMenu} />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <button className="font-medium text-xl">
                    <Link to={"/login"}>Login</Link>
                  </button>
                )}
                {/* add to cart */}
                <button onClick={()=>setOpenCartItem(true)} className="flex items-center bg-green-600 hover:bg-green-500 p-3 rounded-md font-bold ">
                  <div className="animate-bounce">
                    <GiShoppingCart size={28} />
                  </div>
                  <div>
                    {cartItem[0] ? (<div>
                      <p>{totalQty} Item</p>
                      <p>{displayPriceInRupees(totalPrice)}</p>
                    </div>):(<p>My Cart</p>)}
                  </div>
                </button>
              </div>
            </div>
          </div>

        )}
        <div className="md:hidden px-5">
          <Search />
        </div>
        {openCartItem && (
          <DisplayCartItem close={()=>setOpenCartItem(false)}/>)
        }
      </header>
    </div>
  );
}

export default Header;
