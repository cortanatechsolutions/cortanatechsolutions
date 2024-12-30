// App.tsx

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "./components/core/loading";
import Navbar from "./components/core/navbar";
import Footer from "./components/core/footer";
import HomePage from "./pages/home";
import PrivacyPolicyPage from "./components/Legal/PrivacyPolicyPage";
import TermsOfServicePage from "./components/Legal/TermsOfServicePage";
import IAppData from "./components/interfaces/IAppData";
import dataJson from "./data/data.json";
import ErrorPage404 from "./components/Error/ErrorPage404";
import OAuthCallback from "./utils/OAuthCallback";
import OAuthRedirect from "./utils/OAuthRedirect";
import ProtectedRoute from "./utils/ProtectedRoute";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<IAppData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use the imported JSON data directly
        const result = dataJson;

        // Simulate a 2-second loading delay
        setTimeout(() => {
          setData(result);
          setIsLoading(false);
        }, 2000);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />; // Show loading animation while data is loading
  }

  if (!data) {
    return <div>Error loading data</div>; // Show error if data is not available
  }
  

  return (
    <>
      <Navbar data={data.navbar} />
      <Routes>
        <Route path="/" element={<HomePage data={data} />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicyPage />} />
        <Route path="/termsOfService" element={<TermsOfServicePage />} />
        
        <Route
          path="/facebook-integration"
          element={
            <ProtectedRoute>
              <OAuthRedirect />
            </ProtectedRoute>
          }
        />
        <Route path="/facebook-callback" element={<OAuthCallback />} />

        {/* Catch all unmatched routes */}
        <Route path="*" element={<ErrorPage404 />} />
      </Routes>
      <Footer data={data.navbar} />
    </>
  );
};

export default App;
