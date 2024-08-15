import axios from "axios";
import { getToken } from "../api/authApi";

const API_URL = process.env.REACT_APP_EMAIL_API_URL; // Base URL for your email service

export const addNewEmailSubscriber = async (email: string): Promise<void> => {
  var token = localStorage.getItem("token") as string | null | undefined;
  if (token == null || token === undefined) {
    token = await getToken(
      process.env.REACT_APP_AUTH_USERNAME!,
      process.env.REACT_APP_AUTH_PASSWORD!
    );
  }

  if (!token) {
    throw new Error("Something went wrong. Please try again later.");
  }

  try {
    await axios.post(`${API_URL}/subscribe`, email, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/text",
        "Access-Control-Allow-Origin": "https://cortanatechsolutions.com",
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, X-Requested-With, Origin, Accept",
      },
    });
  } catch (error) {
    let userFriendlyMessage = "Something went wrong. Please try again later.";

    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        userFriendlyMessage =
          "It seems like the email address you entered is not valid. Please check and try again.";
      } else if (error.response?.status === 401) {
        userFriendlyMessage =
          "You're not authorized to perform this action. Please log in and try again.";
      } else if (error.response?.status === 500) {
        userFriendlyMessage =
          "Our servers are currently experiencing issues. Please try again later.";
      } else {
        userFriendlyMessage =
          error.response?.data?.message || "Unable to subscribe at this time.";
      }
    } else if (error instanceof Error) {
      userFriendlyMessage = error.message;
    }

    throw new Error(userFriendlyMessage);
  }
};
