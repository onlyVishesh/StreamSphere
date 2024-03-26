import FilterButtons from "./components/FilterButtons";
import VideosContainer from "./components/VideosContainer";
import { useSelector } from "react-redux";

const Home = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  return (
    <div
      className={`ml-16 sm:ml-20 lg:${isMenuOpen ? "ml-60" : "ml-20"} flex h-[1000vh] overflow-hidden`}
    >
      <FilterButtons />
      <VideosContainer />
    </div>
  );
};

export default Home;
