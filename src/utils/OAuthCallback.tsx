import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import api from "./api";
import "./common.css";

const OAuthCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  const [statusMessage, setStatusMessage] = useState("Initializing...");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(5);
  const isRequestInProgress = useRef(false);

  const [pageId, redirectUri] = state ? state.split("|") : [null, window.location.origin];

  const redirectAfterFailure = () => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          window.location.href = redirectUri || window.location.origin;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const removePageIntegration = async () => {
    if (!pageId || isRequestInProgress.current) return;

    isRequestInProgress.current = true;
    try {
      await api.delete("/DeleteFacebookPageIntegration", { params: { pageId } });
      setErrorMessage("Existing integrations have been successfully removed.");
    } catch (err) {
      console.error("Error removing page integration:", err);
      setErrorMessage("An issue occurred while removing integrations. Please contact support.");
    } finally {
      isRequestInProgress.current = false;
      redirectAfterFailure();
    }
  };

  const handleCallback = async () => {
    if (!code || isRequestInProgress.current) return;

    isRequestInProgress.current = true;
    setStatusMessage("Verifying your Facebook account...");
    try {
      const encodedRedirectUri = encodeURIComponent(`${window.location.origin}/facebook-callback`);
      const apiVersion = import.meta.env.VITE_REACT_APP_FACEBOOK_API_VERSION || "";

      const response = await api.get<{ accessToken: string }>("/HandleFacebookOAuthCallback", {
        params: { code, redirectUrl: encodedRedirectUri, apiVersion },
      });

      setStatusMessage("Retrieving your page access token...");
      isRequestInProgress.current = false;
      await getPageAccessToken(response.data.accessToken);
    } catch (err) {
      console.error("Error handling OAuth callback:", err);
      setErrorMessage("We encountered an issue while verifying your account. Please try again.");
      redirectAfterFailure();
    } finally {
      isRequestInProgress.current = false;
    }
  };

  const getPageAccessToken = async (userAccessToken: string) => {
    if (!userAccessToken || !pageId || isRequestInProgress.current) return;

    isRequestInProgress.current = true;
    try {
        const response = await api.post<{ accessToken: string }>(
          `/GetFacebookPageAccessToken`,
          null,
          { params: { pageId, userAccessToken, newToken: true } }
        );
      setStatusMessage("Successfully connected to your Facebook page! Redirecting...");
      setTimeout(() => {
        window.location.href = redirectUri || window.location.origin;
      }, 2000);
    } catch (err) {
      console.error("Error retrieving page access token:", err);
      setErrorMessage("Unable to retrieve the page access token. Please try again later.");
      redirectAfterFailure();
    } finally {
      isRequestInProgress.current = false;
    }
  };

  useEffect(() => {
    if (error) {
      if (error === "access_denied") {
        setStatusMessage("Access was denied. Removing existing integrations...");
        removePageIntegration();
      } else {
        setErrorMessage(decodeURIComponent(errorDescription || "An unknown error occurred."));
        redirectAfterFailure();
      }
      
    } else {
      handleCallback();
    }
  }, [code, error, errorDescription, pageId, redirectUri]);

  return (
    <div className="fullscreen-overlay">
      <div className="loader-container">
        {errorMessage ? (
          <>
            <div className="error-icon">⚠️</div>
            <p className="error-message">{errorMessage}</p>
            <p className="redirecting-message">
              Redirecting to the homepage in {countdown} seconds...
            </p>
          </>
        ) : (
          <>
            <div className="loader"></div>
            <p>{statusMessage}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default OAuthCallback;