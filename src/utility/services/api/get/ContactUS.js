// Interceptor
import http from "../../../interceptor";

/**
 * Get all ContactMessage from the server with dynamic parameters.
 * @param params Object containing query parameters like `page` and `limit`
 * @returns response with array of objects including all ContactMessage.
 */
export async function getAllContactMessage(params = {}) {
  try {
    const response = await http.get(`/contact-us`, { params });
    return response;
  } catch (error) {
    console.error("Error fetching contact-us:", error);
    throw error;
  }
}