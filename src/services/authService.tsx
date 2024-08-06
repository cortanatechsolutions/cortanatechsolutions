// src/services/authService.ts
import axios from "axios";

const API_URL = "https://localhost:7041/api/core/auth"; // Base URL for your authentication service

interface TokenResponse {
  token: string;
}

export const getToken = async (
  username: string,
  password: string
): Promise<string> => {
  try {
    const response = await axios.post<TokenResponse>(`${API_URL}/gettoken`, {
      username,
      password,
    });

    return response.data.token; // Assuming the token is in `data.token`
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle AxiosError specifically
      const message = error.response?.data?.message || error.message;
      throw new Error(`Error getting token: ${message}`);
    } else if (error instanceof Error) {
      // Handle generic Error
      throw new Error(`Error getting token: ${error.message}`);
    } else {
      // Handle unknown error types
      throw new Error("An unknown error occurred while getting the token.");
    }
  }
};
