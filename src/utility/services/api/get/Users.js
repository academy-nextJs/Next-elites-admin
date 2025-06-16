// Interceptor
import http from "../../../interceptor";

export async function getAllUsers(params = {}) {
  try {
    const response = await http.get(`/admin/users`, { params });
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
