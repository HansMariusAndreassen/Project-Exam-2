export const logOut = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
};
