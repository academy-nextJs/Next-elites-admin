// Interceptor
import http from "../../../interceptor";

export async function getDashboardSummary() {
  try {
    const response = await http.get(`/dashboard/summary`);
    return response;
  } catch (error) {
    console.error("Error fetching summary:", error);
    throw error;
  }
}
