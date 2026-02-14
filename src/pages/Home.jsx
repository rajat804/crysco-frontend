import React from "react";
import Header from "../components/Header";
import TopBar from "../components/TopBar";
import HeroBanner from "../components/HeroBanner";
import TrustSection from "../components/TrustSection";
import NewArrivals from "../components/NewArrivals";
import PromoSection from "../components/PromoSection";
import AmazingDeals from "../components/AmazingDeals";
import CustomerFeedback from "../components/CustomerFeedback";
import PromoCTA from "../components/PromoCTA";
import Footer from "../components/Footer";
import FloatingContact from "../components/FloatingContact";

const Home = () => {
  return (
    <>
      <TopBar/>
      <Header/>
      <HeroBanner/>
      <TrustSection/>
      <AmazingDeals/>
      <NewArrivals/>
      <PromoSection/>
      <CustomerFeedback/>
      <PromoCTA/>
      <Footer/>
      <FloatingContact/>
    </>
  );
};

export default Home;
