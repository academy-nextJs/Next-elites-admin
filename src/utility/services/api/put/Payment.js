// Interceptor
import http from "../../../interceptor";

export async function editPayment(payload, id) {
  try {
    const response = await http.put(`/admin/payments/${id}`, payload);
    return response;
  } catch (error) {
    console.error("Error editing payment:", error);
    throw error;
  }
}
