// Interceptor
import http from "../../../interceptor";

export async function editComment(payload, id) {
  try {
    const response = await http.put(`/comments/${id}`, payload);
    return response;
  } catch (error) {
    console.error("Error editing locations:", error);
    throw error;
  }
}
