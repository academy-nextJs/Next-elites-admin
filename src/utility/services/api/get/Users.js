// Interceptor
import http from "../../../interceptor";

export async function getUserById(id) {
  try {
    const response = await http.get(`/users/${id}`);
    return response;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}
