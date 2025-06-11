// Interceptor
import http from "../../../interceptor";

/**
 * Get all locations from the server with dynamic parameters.
 * @param params Object containing query parameters like `page` and `limit`
 * @returns response with array of objects including all locations.
 */
export async function getAllCategories(params = {}) {
  try {
    const response = await http.get(`/categories`, { params });
    return response;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}
