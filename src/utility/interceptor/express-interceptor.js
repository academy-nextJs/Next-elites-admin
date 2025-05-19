import axios from "axios";

// Create Axios instance with base URL
const apiClient = axios.create({
  baseURL: "http://localhost:3001/api", // Your Express backend URL
  timeout: 5000, // Request timeout (5 seconds)
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add custom headers or auth tokens if needed
    // Example: Add Authorization header if you have a token
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    console.log("Request sent:", config.method, config.url);
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Return only the data portion of the response
    return response.data;
  },
  (error) => {
    // Handle errors globally
    if (error.response) {
      // Server responded with a status code (e.g., 404, 500)
      console.error("Response error:", {
        status: error.response.status,
        data: error.response.data,
        message: error.response.data?.error || "Unknown server error",
      });

      // Handle specific status codes
      if (error.response.status === 404) {
        return Promise.reject(new Error("API endpoint not found"));
      }
      if (error.response.status === 500) {
        return Promise.reject(
          new Error("Server error, please try again later")
        );
      }

      // Handle unexpected HTML responses (fixes SyntaxError: Unexpected token '<')
      if (
        error.response.data &&
        typeof error.response.data === "string" &&
        error.response.data.startsWith("<!DOCTYPE")
      ) {
        return Promise.reject(
          new Error("Received HTML instead of JSON. Check API endpoint.")
        );
      }

      return Promise.reject(
        new Error(error.response.data?.error || "Server error")
      );
    } else if (error.request) {
      // No response received (e.g., network error)
      console.error("No response received:", error.request);
      return Promise.reject(
        new Error("Network error, please check your connection")
      );
    } else {
      // Error setting up the request
      console.error("Request setup error:", error.message);
      return Promise.reject(new Error("Request failed: " + error.message));
    }
  }
);

export default apiClient;
