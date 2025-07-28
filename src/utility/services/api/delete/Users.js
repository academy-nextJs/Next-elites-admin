// Interceptor
import http from "../../../interceptor";

export async function deleteUser(id) {
  try {
    const response = await http.delete(`/users/${id}`);
    return response;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}
