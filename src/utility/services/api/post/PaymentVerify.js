// Interceptor
import http from "../../../interceptor";

export async function verifyPayment(id) {
  try {
    const response = await http.post(`/payments/${id}/verify`);
    return response;
  } catch (error) {
    console.error("Error verifying payment:", error);
    throw error;
  }
}
