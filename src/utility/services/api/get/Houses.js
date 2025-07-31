// Interceptor
import http from "../../../interceptor";

/**
 * Get all houses from the server with dynamic parameters.
 * @param params Object containing query parameters like `page` and `limit`
 * @returns response with array of objects including all houses.
 */
export async function getAllHouses(params = {}) {
  try {
    const response = await http.get(`/houses`, { params });
    return response;
  } catch (error) {
    console.error("Error fetching houses:", error);
    throw error;
  }
}

export async function getAllAdminHouses(params = {}) {
  try {
    const response = await http.get(`/admin/houses`, { params });
    return response;
  } catch (error) {
    console.error("Error fetching houses:", error);
    throw error;
  }
}

export async function getHouseById(id) {
  try {
    const response = await http.get(`/houses/${id}`);
    return response;
  } catch (error) {
    console.error("Error fetching houses:", error);
    throw error;
  }
}
