import React, { useEffect, useState } from "react";
import { FcSearch } from "react-icons/fc";
import { TypeAnimation } from "react-type-animation";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import useMobile from "../hooks/useMobile";

function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [isMobile] = useMobile();

  const redirectToSearchPage = () => {
    navigate("/search");
  };
  useEffect(() => {
    const isSearch = location.pathname === "/search";
    setIsSearchPage(isSearch);
  }, [location]);

  return (
    <div className="w-full min-w-[320px] lg:min-w-[420px] h-12 rounded-xl flex items-center overflow-hidden outline-none border-2 border-slate-500 focus-within:border-primary-200 ">
      <div className="px-3">
        {isMobile && isSearchPage ? (
          <Link to={"/"} className="p-2 rounded-full shadow-md">
            <FaArrowLeft />
          </Link>
        ) : (
          <FcSearch className="text-2xl " />
        )}
      </div>
      <div>
        {!isSearchPage ? (
          <div className="italic" onClick={redirectToSearchPage}>
            <TypeAnimation
              sequence={[
                "Shop Fresh Fruits",
                1000,
                "Shop Organic Vegetables",
                1000,
                "Discover Latest Electronics",
                1000,
                "Trendy Fashion Collection",
                1000,
                "Exclusive Beauty Products",
                1000,
                "Best Deals on Home Appliances",
                1000,
                "New Arrivals in Footwear",
                1000,
                "Handmade Jewelry Selection",
                1000,
                "Top-rated Smartwatches",
                1000,
                "Premium Kitchenware",
                1000,
                "Must-have Travel Essentials",
                1000,
                "High-performance Gaming Laptops",
                1000,
                "Luxury Perfume Collection",
                1000,
                "Eco-friendly Home Décor",
                1000,
                "Best-selling Books & Novels",
                1000,
                "Fitness & Gym Equipment",
                1000,
                "Stylish Sunglasses & Accessories",
                1000,
                "Pet Supplies & Accessories",
                1000,
                "Premium Baby Care Products",
                1000,
              ]}
              speed={50}
              style={{ fontSize: "em" }}
              repeat={Infinity}
            />
          </div>
        ) : (
          <div>
            <input
              type="text"
              placeholder="search for grocery"
              className="w-full min-w-[220px] lg:min-w-[420px] h-12 flex items-center overflow-hidden outline-none text-xl text-slate-700 "
              autoFocus
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
