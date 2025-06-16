// Interceptor
import http from "../../../interceptor";

export async function editDiscount(payload, id) {
  try {
    const response = await http.put(`/discount-codes/${id}`, payload);
    return response;
  } catch (error) {
    console.error("Error editing locations:", error);
    throw error;
  }
}
