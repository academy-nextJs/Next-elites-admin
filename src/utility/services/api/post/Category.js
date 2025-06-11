// Interceptor
import http from "../../../interceptor";

export async function createCategory(payload) {
  try {
    const response = await http.post(`/categories`, payload);
    return response;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
}
