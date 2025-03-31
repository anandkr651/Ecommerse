import React from "react";
import banner from "../assets/banner.jpg";
import mobileBanner from "../assets/banner-mobile.jpg";
import { useSelector } from "react-redux";
import validUrlConverter from "../utils/validUrlConverter";
import { useNavigate } from "react-router-dom";
import CategoryWiseDisplayProduct from "../components/CategoryWiseDisplayProduct";

function Home() {
  const loadingCategory = useSelector((state) => state.product.loadingCategory);
  const categoryData = useSelector((state) => state.product.allCategory);
  const subCategoryData = useSelector((state) => state.product.subCategory);
  const navigate = useNavigate();

  const handleProductListPage = (catId, catName) => {
    const subcategory = subCategoryData.find((sub) => {
      const filterData = sub.category.some((c) => {
        return c._id === catId;
      });
      return filterData ? true : null;
    });

    const url = `/${validUrlConverter(catName)}-${catId}/${validUrlConverter(subcategory.name)}-${subcategory._id}`;
    navigate(url);  //go to pages/productListPage
    // console.log(url);
  };
  return (
    <section className="bg-white">
      {/* banner */}
      <div className="container mx-auto">
        <div
          className={`lg:min-h-32 min-h-32 w-full h-full rounded ${
            !banner && "animate-pulse"
          }`}
        >
          <img
            src={banner}
            alt="banner"
            className="hidden md:block w-full h-full"
          />
          <div>
            <img
              src={mobileBanner}
              alt="mobileBanner"
              className="md:hidden w-full h-40"
            />
          </div>
        </div>
      </div>
      {/* display category */}
      <div className="container mx-auto px-4 my-2 grid lg:grid-cols-10 md:grid-cols-8 grid-cols-4 gap-2">
        {loadingCategory
          ? new Array(20).fill(null).map((c, index) => {
              return (
                <div
                  className="bg-white min-h-36 p-2 grid shadow-md rounded-sm gap-2"
                  key={index}
                >
                  <div className="bg-blue-100 min-h-20 rounded-sm"></div>
                  <div className="bg-blue-100 h-8 rounded-sm"></div>
                </div>
              );
            })
          : categoryData.map((cat, index) => {
              return (
                <div key={index}>
                  <div onClick={() => handleProductListPage(cat._id, cat.name)}>
                    <img src={cat.image} alt="" />
                  </div>
                </div>
              );
            })}
      </div>
      {/* display category product */}
      {categoryData.map((c, index) => {
        return (
          <div key={index}>
            <CategoryWiseDisplayProduct id={c?._id} name={c?.name} />
          </div>
        );
      })}
    </section>
  );
}

export default Home;
