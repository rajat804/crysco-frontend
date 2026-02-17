import Footer from "../components/Footer";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import TopBar from "../components/TopBar";
import FloatingContact from "../components/FloatingContact";

const MainLayout = () => {
  return (
    <>
      <TopBar />
      <Header />
      <Outlet />
      <Footer />
      <FloatingContact />
    </>
  );
};

export default MainLayout;
