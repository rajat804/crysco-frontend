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
import UserDashboard from "./pages/user/UserDashboard";
import Products from "./pages/admin/Products";
import ProductVideo from "./pages/admin/ProductVideo";
import ShowProducts from "./pages/admin/ShowProducts";
import ShowVideos from "./pages/admin/ShowVideos";
import EditProduct from "./pages/admin/EditProduct";

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
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/customized" element={<Customized />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/user/dashboard" element={<UserDashboard />} />
        {/* ADMIN ROUTES (NO HEADER / FOOTER) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="login" element={<AdminLogin />} />
          <Route path="register" element={<AdminRegister />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products-video" element={<ProductVideo />} />
          <Route path="products" element={<Products />} />
          <Route path="products-show" element={<ShowProducts />} />
          <Route path="videos" element={<ShowVideos />} />
          <Route path="edit-product/:id" element={<EditProduct/>}/>

          {/* <Route path="users" element={<Dashboard />} /> */}

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
