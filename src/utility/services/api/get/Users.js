// Interceptor
import http from "../../../interceptor";

export async function getAllUsers() {
  try {
    const response = await http.get(`/admin/users`);
    return response;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function getUserById(id) {
  try {
    const response = await http.get(`/users/${id}`);
    return response;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}
