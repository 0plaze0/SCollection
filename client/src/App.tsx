import { Routes, Route } from "react-router-dom";
import {
  ForgotPassword,
  Login,
  Pagenotfound,
  ProductList,
  ProductPage,
  Register,
} from "./pages";
import { Layout } from "./components";

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ProductList />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="product-details/:id" element={<ProductPage />} />
        </Route>
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </div>
  );
};

export default App;
