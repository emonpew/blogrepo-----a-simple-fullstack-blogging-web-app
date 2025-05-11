const API_URL = process.env.API_URL || "http://localhost:3001";
export const ServerService = {
  async serverGet(url: string) {
    const response = await fetch(`${API_URL}${url}`, { cache: "no-store" });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Request failed");
    }
    return await response.json();
  },
};
