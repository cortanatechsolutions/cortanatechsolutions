import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import Team from "./components/ourteam"; // Import the Team component
import Footer from "./components/footer";
import OurWork from "./components/OurWork";
import Home from "./components/home";
import PartnerWithUs from "./components/PartnerWithUs";
import Testimonial from "./components/testimonial";
import BlogList from "./components/bloglist";
import ContactUs from "./components/contactus";

interface AppData {
  navbar: any;
  jumbotron: any;
  about: any;
  services: any;
  contact: any;
  team: any; // Add team to the AppData interface
  footer: any;
}

const App: React.FC = () => {
  const [data, setData] = useState<AppData | null>(null);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <>
      <Navbar data={data.navbar} />
      <Home data={data.jumbotron} />
      <PartnerWithUs />
      <Testimonial />
      <OurWork />
      <BlogList />
      <Team data={data.team} /> {/* Render the Team component */}
      {/*<ContactUs /> */}
      <Footer data={data.footer} />
    </>
  );
};

export default App;
