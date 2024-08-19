/* eslint-disable @typescript-eslint/no-unused-vars */
import Team from "../components/Home/ourteam"; // Import the Team component
import OurWork from "../components/Home/OurWork";
import Home from "../components/Home/home";
import PartnerWithUs from "../components/Home/PartnerWithUs";
import Testimonial from "../components/Home/testimonial";
import BlogList from "../components/Home/bloglist";
import ComponentDemo from "../components/core/demo/componentDemo";
import ContactUs from "../components/Home/contactus";
import IAppData from "../components/interfaces/IAppData";
import CallToAction from "../components/Home/CallToAction";
import FacebookFeed from "../components/Home/FacebookFeed";

const HomePage: React.FC<{ data: IAppData }> = ({ data }) => {
  return (
    <>
      <Home data={data.jumbotron} />
      {/* <ComponentDemo /> */}
      <PartnerWithUs />
      <Testimonial />
      <OurWork />
      <BlogList />
      <FacebookFeed />
      <Team data={data.team} /> {/* Render the Team component */}
      <CallToAction />
      {/*<ContactUs /> */}
    </>
  );
};

export default HomePage;
