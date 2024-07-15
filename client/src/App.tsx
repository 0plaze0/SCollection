import { Routes, Route } from "react-router-dom";
import {
  AdminDashboard,
  AllProduct,
  ForgotPassword,
  Login,
  Pagenotfound,
  ProductList,
  ProductPage,
  Register,
} from "./pages";
import { Layout } from "./components";
import ProductForm from "./components/Form/ProductForm";

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ProductList />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="product-details/:id" element={<ProductPage />} />
          <Route path="admin" element={<AdminDashboard />}>
            <Route path="dashboard" element={<AllProduct />} />
            <Route path="create-product" element={<ProductForm />} />
            <Route path="create-category" element={<h1>Create category</h1>} />
          </Route>
        </Route>
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </div>
  );
};

export default App;
