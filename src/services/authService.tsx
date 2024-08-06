// src/services/authService.ts
import axios from "axios";
import CryptoJS from "crypto-js";

const API_URL = process.env.REACT_APP_API_URL; // Base URL for your authentication service
const secretKey = process.env.REACT_APP_CRYPTO_SECRET_KEY;

interface TokenResponse {
  token: string;
}

const encryptPassword = (password: string): string => {
  // Assert that secretKey is defined
  if (!secretKey) {
    throw new Error("Secret key is not defined.");
  }
  if (!password) {
    throw new Error("Password cannot be empty.");
  }
  const iv = CryptoJS.lib.WordArray.random(16); // Generate a random IV
  const key = CryptoJS.enc.Utf8.parse(secretKey); // Convert the key to WordArray

  const encrypted = CryptoJS.AES.encrypt(password, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });

  // Concatenate IV and encrypted data and encode in Base64
  return CryptoJS.enc.Base64.stringify(iv.concat(encrypted.ciphertext));
};

export const getToken = async (
  username: string,
  password: string
): Promise<string> => {
  try {
    password = encryptPassword(password);
    const response = await axios.post<TokenResponse>(
      `${API_URL}/gettoken`,
      {
        username,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

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
