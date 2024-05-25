import useFetch from "../../auth/FetchHook";
import PropTypes from "prop-types";

/**
 * Custom hook for performing a DELETE request using the useFetch hook.
 * @returns {Object} An object containing the submitDelete function, data, loading, and error states.
 */
const useDeleteFetch = () => {
  const { data, loading, error, performFetch } = useFetch("");

  /**
   * Submits a DELETE request to the specified URL with the given ID.
   * @param {string} url - The URL to send the DELETE request to.
   * @param {string} id - The ID of the resource to delete.
   */
  const submitDelete = async (url, id) => {
    await performFetch({
      url: `${url}/${id}`,
      method: "DELETE",
    });
  };

  return { submitDelete, data, loading, error };
};

useDeleteFetch.propTypes = {
  url: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default useDeleteFetch;
