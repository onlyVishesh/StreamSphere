import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import VideosContainer from "./component/VideosContainer";

const Music = () => {
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
    <div className={`flex flex-col overflow-hidden`} style={{ marginLeft }}>
      <div className="mt-10 flex w-full justify-center">
        <div className="w-3/4">
          <div className="flex items-center gap-3 font-bold">
            <img
              alt=""
              src="//yt3.googleusercontent.com/vCqmJ7cdUYpvR0bqLpWIe8ktaor4QafQLlfQyTuZy-M9W_YafT8Wo9kdsKL2St1BrkMRpVSJgA=s88-c-k-c0x00ffffff-no-rj-mo"
              className="w-16 rounded-full"
            />
            <span className="text-4xl">Music</span>
          </div>
          <div className="mt-5 flex gap-4 border-b-[1px] border-b-gray-200 text-lg text-slate-700"></div>
          <VideosContainer filterId={10} />
        </div>
      </div>
    </div>
  );
};

export default Music;