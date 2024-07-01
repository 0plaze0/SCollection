import { Routes, Route } from "react-router-dom";
import { Register } from "./pages";
import { Layout } from "./components";

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<h1>Hello</h1>} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
