import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components";
import { Navigation } from "../../components/Sidebar";

const links: Navigation[] = [
  { title: "Create Product", path: "create-product" },
  { title: "Create Category", path: "create-category" },
  { title: "All Product", path: "dashboard" },
];

const AdminDashboard = () => {
  return (
    <div className="grid grid-cols-4 p-4 gap-2">
      <div className="col-span-1 border-2 rounded border-gray-400 h-[100vh]">
        <Sidebar links={links} />
      </div>
      <div className="col-span-3 p-4 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
