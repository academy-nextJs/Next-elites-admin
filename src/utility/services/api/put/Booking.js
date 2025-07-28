// Interceptor
import http from "../../../interceptor";

export async function confirmBooking(id) {
  try {
    const response = await http.put(`/bookings/${id}`, {
      status: "confirmed",
    });
    return response;
  } catch (error) {
    console.error("Error confirming booking:", error);
    throw error;
  }
}

export async function editBooking(payload) {
  try {
    const response = await http.put(`/bookings/${payload.id}`, payload);
    return response;
  } catch (error) {
    console.error("Error editing booking:", error);
    throw error;
  }
}
