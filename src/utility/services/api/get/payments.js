// Interceptor
import http from "../../../interceptor";

/**
 * Get all payments from the server.
 * @returns response with array of objects including all payments.
 */
export async function getAllPayments() {
  try {
    const response = await http.get(`/payments`);
    return response;
  } catch (error) {
    console.error("Error fetching payments:", error);
    throw error;
  }
}

export async function getPaymentById(id) {
  try {
    const response = await http.get(`/payments/${id}`);
    return response;
  } catch (error) {
    console.error("Error fetching payments:", error);
    throw error;
  }
}
