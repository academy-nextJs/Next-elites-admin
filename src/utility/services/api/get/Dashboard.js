// Interceptor
import http from "../../../interceptor";

export async function getDashboardStatus() {
  try {
    const response = await http.get(`/admin/dashboard`);
    return response;
  } catch (error) {
    console.error("Error fetching status:", error);
    throw error;
  }
}
