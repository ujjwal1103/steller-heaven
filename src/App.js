import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import AddProduct from "./pages/AddProduct";
import AllProducts from "./pages/AllProducts";
import SingleProduct from "./pages/SingleProduct";
import Home from "./pages/Home";
import CreateSliderImage from "./pages/CreateSliderImage";
import AddSubcategoryForm from "./pages/AddSubcategoryForm ";
import EditProduct from "./pages/EditProduct";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AuthProtected from "./protectedRoute/AuthProtected";
import LoginProtection from "./protectedRoute/LoginProtection";
import DashboardLayout from "./components/DashboardLayout";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import WishList from "./pages/WishList.js";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Orders from "./pages/Orders";
import { Messenger, EditUser } from "./pages";


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route element={<LoginProtection />}>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Route>
        <Route path="/" element={<Layout />}>
          <Route path="/products" element={<Products />}></Route>
        </Route>
        <Route path="/" element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/allProducts" element={<AllProducts />}></Route>
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/createSliderImage" element={<CreateSliderImage />} />
          <Route path="allProducts/editProduct/:id" element={<EditProduct />} />
          <Route path="/addCategory" element={<AddSubcategoryForm />} />
          <Route path="users/editUser/:id" element={<EditUser />} />
        </Route>
        
        <Route path="/product/:id" element={<SingleProduct />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
      



        <Route path="" element={<AuthProtected />}>
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/createSliderImage" element={<CreateSliderImage />} />
          <Route path="/editProduct/:id" element={<EditProduct />} />
          <Route path="/addCategory" element={<AddSubcategoryForm />} />
          <Route path="/wishlist/:id" element={<WishList />} />
          <Route path="/messenger" element={<Messenger />} />
        <Route path="/profile/:id" element={<Profile />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
