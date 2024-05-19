import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FilterButtons from "./components/FilterButtons";
import VideosContainer from "./components/VideosContainer";

const Home = () => {
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
      ? "13rem"
      : windowWidth < 640
        ? "3rem"
        : "5rem";

  return (
    <div className={`flex flex-col overflow-hidden`} style={{ marginLeft }}>
      <FilterButtons />
      <VideosContainer />
    </div>
  );
};

export default Home;
