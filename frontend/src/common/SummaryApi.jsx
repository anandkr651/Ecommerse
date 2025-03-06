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
};
export default SummaryApi;
