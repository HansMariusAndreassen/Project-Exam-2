import useFetch from "../../auth/FetchHook";
import { createBookingUrl } from "../../../../utils/constants";

/**
 * Custom hook for booking a venue.
 * @returns {Object} An object containing the submitBooking function, data, loading, error, and isSuccess properties.
 */
const useBookVenue = () => {
  const { data, loading, error, performFetch, isSuccess } =
    useFetch(createBookingUrl);

  const submitBooking = async (booking) => {
    await performFetch({
      method: "POST",
      body: JSON.stringify(booking),
    });
  };

  return { submitBooking, data, loading, error, isSuccess };
};

export default useBookVenue;
