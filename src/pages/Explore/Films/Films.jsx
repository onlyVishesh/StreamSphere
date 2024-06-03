import VideosContainer from "./component/VideosContainer";

const Films = () => {
  return (
    <div>
      <div className="mt-10 flex w-full justify-center">
        <div className="w-3/4">
          <div className="flex items-center gap-3 font-bold">
            <img
              alt="films"
              src="https://www.gstatic.com/youtube/img/tvfilm/clapperboard_profile.png"
              className="w-16 rounded-full"
            />
            <span className="text-4xl">Films</span>
          </div>
          <div className="mt-5 flex gap-4 border-b-[1px] border-b-gray-200 text-lg text-slate-700"></div>
          <VideosContainer filterId={1} />
        </div>
      </div>
    </div>
  );
};

export default Films;
