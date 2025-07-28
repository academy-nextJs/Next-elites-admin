// Interceptor
import http from "../../../interceptor";

export async function cancelBooking(id) {
  try {
    const response = await http.post(`/bookings/${id}/cancel`);
    return response;
  } catch (error) {
    console.error("Error canceling booking:", error);
    throw error;
  }
}

export async function restoreBooking(id) {
  try {
    const response = await http.post(`/bookings/${id}/continue`);
    return response;
  } catch (error) {
    console.error("Error continue booking:", error);
    throw error;
  }
}
