// Interceptor
import http from "../../../interceptor";

export async function getMarketTrend() {
  try {
    const response = await http.get(`/dashboard/market-trends`);
    return response;
  } catch (error) {
    console.error("Error fetching market trend:", error);
    throw error;
  }
}
