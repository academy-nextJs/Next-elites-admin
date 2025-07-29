// Interceptor
import http from "../../../interceptor";

/**
 * Get all bookings from the server with dynamic parameters.
 * @param params Object containing query parameters like `page` and `limit`
 * @returns response with array of objects including all bookings.
 */
export async function getAllBookings(params) {
  try {
    const response = await http.get(`/admin/bookings`, { params });
    return response;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
}

export async function getBookingById(id) {
  try {
    const response = await http.get(`/bookings/${id}`);
    return response;
  } catch (error) {
    console.error("Error fetching booking:", error);
    throw error;
  }
}
