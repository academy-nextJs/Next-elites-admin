import apiClient from "../../../interceptor/express-interceptor";

export async function getAllRealEstates() {
  try {
    const data = await apiClient.get("/realEstate");
    return data;
  } catch (error) {
    throw error;
  }
}
