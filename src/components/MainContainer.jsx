import Home from "../pages/Home/Home";
import Sidebar from "./Sidebar";

const MainContainer = () => {
  return (
    <div className="2xl:bg-black-500 flex bg-violet-500 3xs:bg-cyan-500 2xs:bg-pink-500 xs:bg-blue-500 sm:bg-green-500 md:bg-orange-500 lg:bg-yellow-500 xl:bg-red-500">
      <Sidebar />
      <Home />
    </div>
  );
};

export default MainContainer;
