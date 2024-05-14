import { useCallback, useEffect } from "react";
import { useFetch } from "../../../hooks/useFetch";
import { userUrl } from "../../../utils/constants";

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

  useEffect(() => {
    console.log(data);
  }, [data]);

  return { data, loading, error, updateUser };
};

export default useProfile;
