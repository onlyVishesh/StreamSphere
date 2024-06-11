import { useState } from "react";
import VideosContainer from "../component/VideosContainer";

const Trending = () => {
  const [filter, setFilter] = useState(0);

  return (
    <div className="mt-2 flex w-full justify-center md:mt-10">
      <div className="w-11/12 md:w-10/12 lg:w-3/4">
        <div className="flex items-center gap-3 font-bold">
          <img
            alt=""
            src="https://www.youtube.com/img/trending/avatar/trending.png"
            className="w-8 rounded-full sm:w-12 md:w-16"
          />
          <span className="sm:2xl text-xl md:text-4xl">Trending</span>
        </div>
        <div className="mt-5 flex gap-4 border-b-[1px] border-b-gray-200 text-sm text-slate-700 md:text-lg">
          <div
            onClick={() => {
              setFilter(0);
            }}
            className={`pb-2 hover:cursor-pointer ${filter === 0 ? "border-b-2 border-black font-semibold text-black" : ""} hover:border-b-2 hover:border-gray-500 `}
          >
            Now
          </div>
          <div
            onClick={() => {
              setFilter(10);
            }}
            className={`pb-2 hover:cursor-pointer ${filter === 10 ? "border-b-2 border-black font-semibold text-black" : ""} hover:border-b-2 hover:border-gray-500 `}
          >
            Music
          </div>
          <div
            onClick={() => {
              setFilter(20);
            }}
            className={`pb-2 hover:cursor-pointer ${filter === 20 ? "border-b-2 border-black font-semibold text-black" : ""} hover:border-b-2 hover:border-gray-500 `}
          >
            Gaming
          </div>
        </div>
        <VideosContainer filterId={filter} />
      </div>
    </div>
  );
};

export default Trending;
