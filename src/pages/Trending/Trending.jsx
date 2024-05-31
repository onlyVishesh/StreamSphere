import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import VideosContainer from "./component/VideosContainer";

const Trending = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [filter, setFilter] = useState(0);

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
    <div className={`flex flex-col overflow-hidden`} style={{ marginLeft }}>
      <div className="mt-10 flex w-full justify-center">
        <div className="w-3/4">
          <div className="flex items-center gap-3 font-bold">
            <img
              alt=""
              src="https://www.youtube.com/img/trending/avatar/trending.png"
              className="w-16 rounded-full"
            />
            <span className="text-4xl">Trending</span>
          </div>
          <div className="mt-5 flex gap-4 border-b-[1px] border-b-gray-200 text-lg text-slate-700">
            <div
              onClick={() => {
                setFilter(0);
              }}
              className={`pb-2 hover:cursor-pointer ${filter === 0 ? "border-b-2 border-black font-semibold text-black" : ""} hover:border-b-2hover:border-gray-500 `}
            >
              Now
            </div>
            <div
              onClick={() => {
                setFilter(10);
              }}
              className={`pb-2 hover:cursor-pointer ${filter === 10 ? "border-b-2 border-black font-semibold text-black" : ""} hover:border-b-2hover:border-gray-500 `}
            >
              Music
            </div>
            <div
              onClick={() => {
                setFilter(20);
              }}
              className={`pb-2 hover:cursor-pointer ${filter === 20 ? "border-b-2 border-black font-semibold text-black" : ""} hover:border-b-2hover:border-gray-500 `}
            >
              Gaming
            </div>
          </div>
          <VideosContainer filterId={filter} />
        </div>
      </div>
    </div>
  );
};

export default Trending;
