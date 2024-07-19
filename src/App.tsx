import React, { useEffect, useState } from "react";
import Loading from "./components/core/loading";
import Navbar from "./components/core/navbar";
import Footer from "./components/core/footer";
import HomePage from "./pages/home";
import IAppData from "./components/interfaces/IAppData";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<IAppData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the JSON file
        const response = await fetch("/data.json");
        const result = await response.json();

        // Simulate a 3-second loading delay
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
      <HomePage data={data} />
      <Footer />
    </>
  );
};

export default App;
