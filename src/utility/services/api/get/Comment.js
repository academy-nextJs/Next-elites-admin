// Interceptor
import http from "../../../interceptor";

export async function getAllComments(params = {}) {
  try {
    const response = await http.get(`/comments`, { params });
    return response;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
}
