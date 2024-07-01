import { Routes, Route } from "react-router-dom";
import { Login, Pagenotfound, Register } from "./pages";
import { Layout } from "./components";

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<h1>Hello</h1>} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </div>
  );
};

export default App;
