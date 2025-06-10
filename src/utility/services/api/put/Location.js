// Interceptor
import http from "../../../interceptor";

/**
 * Get all locations from the server with dynamic parameters.
 * @param params Object containing query parameters like `page` and `limit`
 * @returns response with array of objects including all locations.
 */
export async function editLocation(payload, id) {
  try {
    const response = await http.put(`/locations/${id}`, payload);
    return response;
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error;
  }
}
