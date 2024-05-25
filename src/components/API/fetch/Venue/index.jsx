import { useEffect, useState } from "react";
import { venuesUrl } from "../../../../utils/constants.js";

/**
 * Fetches venue data from the server based on the provided ID.
 *
 * @param {string} id - The ID of the venue to fetch.
 * @returns {Object} - An object containing the fetched venue data, loading state, and error state.
 */
const FetchVenue = (id) => {
  const [venue, setVenue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          venuesUrl + "/" + id + "?_owner=true&_bookings=true"
        );
        const data = await response.json();
        setVenue(data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);
  return { venue, loading, error };
};

export default FetchVenue;
