export const baseUrl = "https://v2.api.noroff.dev/";
export const registerEndpoint = "auth/register";
export const loginEndpoint = "auth/login";
export const venuesEndpoint = "holidaze/venues";
export const bookingsEndpoint = "holidaze/bookings";
export const userEndpoint = "holidaze/profiles/";

export const queryCustomer = "_customer"; //booking query
export const queryVenue = "_venue"; //booking and profile query
export const queryOwner = "_owner"; //venues query
export const queryBooking = "_bookings"; //venues and profiles query

export const registerUrl = baseUrl + registerEndpoint;
export const loginUrl = baseUrl + loginEndpoint;
export const venuesUrl = baseUrl + venuesEndpoint;
export const bookingsUrl = baseUrl + bookingsEndpoint;
export const userUrl = baseUrl + userEndpoint;

// export const havens_API_Key = "3b5ee6ba-7b8e-4b32-a547-b264007658ff";
