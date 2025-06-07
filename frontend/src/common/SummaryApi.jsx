const SummaryApi = {
  register: {
    url: "/api/v1/users/register",
    method: "post",
  },
  login: {
    url: "/api/v1/users/login",
    method: "post",
  },
  forgotPassword: {
    url: "/api/v1/users/forgotPassword",
    method: "post",
  },
  verifyForgotPasswordOtp: {
    url: "/api/v1/users/verifyForgotPasswordOtp",
    method: "post",
  },
  resetpassword: {
    url: "/api/v1/users/resetpassword",
    method: "post",
  },
  refreshToken: {
    url: "/api/v1/users/refreshToken",
    method: "get",
  },
  userDetails: {
    url: "/api/v1/users/userDetails",
    method: "get",
  },
  logout: {
    url: "/api/v1/users/logout",
    method: "get",
  },
  uploadAvatar: {
    url: "/api/v1/users/avatar",
    method: "patch",
  },
  updateUserDetails: {
    url: "/api/v1/users/updateProfile",
    method: "post",
  },
  addCategory: {
    url: "/api/v1/category/addCategory",
    method: "post",
  },
  uploadImage: {
    url: "/api/v1/uploadImage/upload",
    method: "patch",
  },
  getCategory: {
    url: "/api/v1/category/getCategory",
    method: "get",
  },
  updateCategory: {
    url: "/api/v1/category/updateCategory",
    method: "post",
  },
  deleteCategory: {
    url: "/api/v1/category/deleteCategory",
    method: "delete",
  },
  addSubCategory: {
    url: "/api/v1/subCategory/addSubCategory",
    method: "post",
  },
  getSubCategory: {
    url: "/api/v1/subCategory/get",
    method: "post",
  },
  updateSubCategory: {
    url: "/api/v1/subCategory/updateSubCategory",
    method: "post",
  },
  deleteSubCategory: {
    url: "/api/v1/subCategory/deleteSubCategory",
    method: "delete",
  },
  createProduct: {
    url: "/api/v1/product/createProduct",
    method: "post",
  },
  getProduct: {
    url: "/api/v1/product/getProduct",
    method: "post",
  },
  getProductByCategory: {
    url: "/api/v1/product/getProductByCategory",
    method: "post",
  },
  getProductByCategoryAndSubCategory: {
    url: "/api/v1/product/getProductByCategoryAndSubCategory",
    method: "post",
  },
  getProductDetails: {
    url: "/api/v1/product/getProductDetails",
    method: "post",
  },
  updateProduct: {
    url: "/api/v1/product/updateProduct",
    method: "post",
  },
  deleteProduct: {
    url: "/api/v1/product/deleteProduct",
    method: "delete",
  },
  searchProduct: {
    url: "/api/v1/product/searchProduct",
    method: "post",
  },
  createAddToCartItem: {
    url: "/api/v1/cartProduct/createAddToCartItem",
    method: "post",
  },
  getCartItem: {
    url: "/api/v1/cartProduct/getCartItem",
    method: "get",
  },
  updateCartItemQty: {
    url: "/api/v1/cartProduct/updateCartItemQty",
    method: "put",
  },
  deleteCartItemQty: {
    url: "/api/v1/cartProduct/deleteCartItemQty",
    method: "delete",
  },
  addAddress: {
    url: "/api/v1/address/addAddress",
    method: "post",
  },
  getAddress: {
    url: "/api/v1/address/getAddress",
    method: "get",
  },
  updateAddress: {
    url: "/api/v1/address/updateAddress",
    method: "post",
  },
  deleteAddress: {
    url: "/api/v1/address/deleteAddress",
    method: "delete",
  },
  CashOnDelivery: {
    url: "/api/v1/order/CashOnDelivery",
    method: "post",
  }
};
export default SummaryApi;
