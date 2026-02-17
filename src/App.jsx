import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminRegister from "./pages/admin/AdminRegister";
import Dashboard from "./pages/admin/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* USER ROUTES */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/garbage-bags" element={<GarbageBags />} />
          <Route path="/kitchen-towel" element={<KitchenTowel />} />
          <Route path="/bulk-order" element={<BulkOrder />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/product-details" element={<ProductDetails />} />
          <Route path="/customized" element={<Customized />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* ADMIN ROUTES (NO HEADER / FOOTER) */}
        <Route path="/admin" element={<AdminLayout/>}>
          <Route path="login" element={<AdminLogin/>}/>
          <Route path="register" element={<AdminRegister/>}/>
          <Route path="dashboard" element={<Dashboard/>}/>
        </Route>



        {/* Catch-all route for 404 */}
        <Route
          path="*"
          element={<h1 className="text-center mt-10">Page Not Found</h1>}
        />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
