// src/services/api.service.ts
const API_URL = process.env.API_URL || "http://localhost:3001";

export const ApiService = {
  async get(url: string) {
    const token = localStorage.getItem("jwtToken");

    const response = await fetch(`${API_URL}${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Token expired or invalid - redirect to login
        window.location.href = "/login";
      }
      const errorData = await response.json();
      throw new Error(errorData.message || "Request failed");
    }

    return await response.json();
  },

  // Similar implementations for post, put, delete, etc.
};
