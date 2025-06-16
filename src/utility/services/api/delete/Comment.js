// Interceptor
import http from "../../../interceptor";

export async function deleteComment(id) {
  try {
    const response = await http.delete(`/comments/${id}`);
    return response;
  } catch (error) {
    console.error("Error deleting category", error);
    throw error;
  }
}
