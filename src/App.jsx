import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopBar from "./components/TopBar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingContact from "./components/FloatingContact";
import Home from "./pages/Home";
import GarbageBags from "./pages/GarbageBags";
import KitchenTowel from "./pages/KitchenTowel";
import BulkOrder from "./pages/BulkOrder";
import AboutUs from "./pages/AboutUs";
import ContactPage from "./pages/ContactPage";
import ProductDetails from "./pages/ProductDetails";
import Customized from "./pages/Customized";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <TopBar/>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/garbage-bags" element={<GarbageBags />} />
        <Route path="/kitchen-towel" element={<KitchenTowel/>}></Route>
        <Route path="/bulk-order" element={<BulkOrder/>}></Route>
        <Route path="/about" element={<AboutUs/>}></Route>
        <Route path="/contact" element={<ContactPage/>}></Route>
        <Route path="/product-details" element={<ProductDetails/>}></Route>
        <Route path="/customized" element={<Customized/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>

        {/* Catch-all route for 404 */}
        <Route path="*" element={<h1 className="text-center mt-10">Page Not Found</h1>} />
      </Routes>
      <Footer/>
      <FloatingContact/>
    </BrowserRouter>
  );
}

export default App;
