import { useCallback } from "react";
import { useFetch } from "../../../hooks/useFetch";
import { userUrl } from "../../../utils/constants";

/**
 * Custom hook for fetching user profile data.
 *
 * @param {string} user - The user identifier.
 * @returns {Object} - An object containing the fetched data, loading state, error state, and a function to update the user.
 */
const useProfile = (user) => {
  const { data, loading, error, performFetch } = useFetch(`${userUrl}/${user}`);

  const updateUser = useCallback(
    (user) => {
      performFetch({
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
    },
    [performFetch]
  );

  return { data, loading, error, updateUser };
};

export default useProfile;
