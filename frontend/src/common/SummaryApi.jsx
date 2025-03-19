export const baseURL = "http://localhost:8000";

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
};
export default SummaryApi;
