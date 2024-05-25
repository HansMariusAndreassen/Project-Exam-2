import { useEffect } from "react";
import { venuesUrl } from "../../../../utils/constants";
import useFetch from "../../auth/FetchHook";

/**
 * Fetches venues data from the API.
 *
 * @returns {Object} An object containing venues data, loading state, and error state.
 */
const FetchVenues = () => {
  const { data, loading, error, performFetch } = useFetch(
    `${venuesUrl}?_owner=true&sort=created`
  );

  useEffect(() => {
    performFetch();
  }, [performFetch]);

  return { venues: data || [], loading, error };
};

export default FetchVenues;
