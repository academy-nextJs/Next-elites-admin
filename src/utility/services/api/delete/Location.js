// Interceptor
import http from "../../../interceptor";

export async function deleteLocation(id) {
  try {
    const response = await http.delete(`/locations/${id}`);
    return response;
  } catch (error) {
    console.error("Error deleting locations:", error);
    throw error;
  }
}
