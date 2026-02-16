import React from "react";
import HeroBanner from "../components/HeroBanner";
import TrustSection from "../components/TrustSection";
import NewArrivals from "../components/NewArrivals";
import PromoSection from "../components/PromoSection";
import AmazingDeals from "../components/AmazingDeals";
import CustomerFeedback from "../components/CustomerFeedback";
import PromoCTA from "../components/PromoCTA";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <HeroBanner/>
      <TrustSection/>
      <AmazingDeals/>
      <NewArrivals/>
      <PromoSection/>
      <CustomerFeedback/>
      <PromoCTA/>
    </>
  );
};

export default Home;
