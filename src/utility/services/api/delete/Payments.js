// Interceptor
import http from "../../../interceptor";

export async function deletePayment(id) {
  try {
    const response = await http.delete(`/admin/payments/${id}`);
    return response;
  } catch (error) {
    console.error("Error deleting payment:", error);
    throw error;
  }
}
