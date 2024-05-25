/**
 * Formats a given date into a localized string representation.
 *
 * @param {Date} date - The date to be formatted.
 * @returns {string} The formatted date string.
 */
export const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString();
};
