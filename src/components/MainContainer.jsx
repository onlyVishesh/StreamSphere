import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { closeMenuIfWidthLessThan1024 } from "../utils/appSlice";

const MainContainer = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeMenuIfWidthLessThan1024());
  }, []);

  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const marginLeft =
    isMenuOpen && windowWidth > 1023
      ? "15rem"
      : windowWidth < 640
        ? "3rem"
        : "5rem";
  return (
    <div>
      <Header />
      <Sidebar />
      <div className={`flex flex-col overflow-hidden`} style={{ marginLeft }}>
        <Outlet />
      </div>
    </div>
  );
};

export default MainContainer;
