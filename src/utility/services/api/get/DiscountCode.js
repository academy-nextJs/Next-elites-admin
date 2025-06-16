// Interceptor
import http from "../../../interceptor";

export async function getAllDiscounts(params = {}) {
  try {
    const response = await http.get(`/discount-codes`, { params });
    return response;
  } catch (error) {
    console.error("Error fetching discount codes:", error);
    throw error;
  }
}
