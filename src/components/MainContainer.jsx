import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const MainContainer = () => {
  return (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default MainContainer;
