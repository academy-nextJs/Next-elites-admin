// Interceptor
import http from "../../../interceptor";

export async function deleteCategory(id) {
  try {
    const response = await http.delete(`/categories/${id}`);
    return response;
  } catch (error) {
    console.error("Error deleting category", error);
    throw error;
  }
}
