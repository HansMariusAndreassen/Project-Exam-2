import { useEffect, useState } from "react";
import { venuesUrl } from "../../../../utils/constants.js";

const FetchVenues = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(venuesUrl + "?_owner=true");
        const data = await response.json();
        setVenues(data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  return { venues, loading, error };
};

export default FetchVenues;
