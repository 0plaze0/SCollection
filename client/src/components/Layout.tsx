import { Outlet } from "react-router-dom";
import { Header } from "./../components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  return (
    <>
      <Header />
      <ToastContainer position="bottom-right" />
      <Outlet />
    </>
  );
};

export default Layout;
