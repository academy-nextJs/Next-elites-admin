// Interceptor
import http from "../../../interceptor";

export async function deleteDiscountCode(id) {
  try {
    const response = await http.delete(`/discount-codes/${id}`);
    return response;
  } catch (error) {
    console.error("Error deleting category", error);
    throw error;
  }
}
