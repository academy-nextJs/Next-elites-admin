import apiClient from "../../../interceptor/express-interceptor";

export async function getAllTours() {
  try {
    const data = await apiClient.get("/tours");
    return data;
  } catch (error) {
    throw error;
  }
}
