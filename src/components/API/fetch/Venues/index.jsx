import { useEffect } from "react";
import { venuesUrl } from "../../../../utils/constants";
import useFetch from "../../auth/FetchHook";

const FetchVenues = () => {
  const { data, loading, error, performFetch } = useFetch(
    `${venuesUrl}?_owner=true&sort=created`
  );

  useEffect(() => {
    console.log("Initiating venues fetch");
    performFetch();
  }, [performFetch]);

  return { venues: data || [], loading, error };
};

export default FetchVenues;
