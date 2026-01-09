import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ===============================
// REQUEST INTERCEPTOR
// ===============================
API.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  console.log("🧪 Axios interceptor accessToken:", accessToken);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  console.log("➡️ Final request headers:", config.headers);
  return config;
});

// ===============================
// RESPONSE INTERCEPTOR (REFRESH)
// ===============================
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Access token expired
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          throw new Error("No refresh token");
        }

        const res = await axios.post(
          "http://localhost:5000/api/auth/refresh",
          { refreshToken }
        );

        // Save new access token
        localStorage.setItem("accessToken", res.data.accessToken);

        // Retry original request with new token
        originalRequest.headers.Authorization =
          `Bearer ${res.data.accessToken}`;

        return API(originalRequest);
      } catch (err) {
        console.error("❌ Refresh token failed:", err);

        // Logout user
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

export default API;
