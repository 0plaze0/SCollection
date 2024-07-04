import { Routes, Route } from "react-router-dom";
import {
  ForgotPassword,
  Login,
  Pagenotfound,
  ProductList,
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
        </Route>
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </div>
  );
};

export default App;
