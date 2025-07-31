// Interceptor
import http from "../../../interceptor";

export async function editUserRole(role, id) {
  try {
    const response = await http.put(`/admin/users/${id}/role`, {
      role: role,
    });
    return response;
  } catch (error) {
    console.error("Error editing role:", error);
    throw error;
  }
}
