/**
 * Removes the access token and user data from the local storage.
 */
export const logOut = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
};
