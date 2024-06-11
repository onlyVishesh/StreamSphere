import VideosContainer from "../component/VideosContainer";

const Music = () => {
  return (
    <div>
      <div className="mt-2 flex w-full justify-center md:mt-10">
        <div className="w-11/12 md:w-10/12 lg:w-3/4">
          <div className="flex items-center gap-3 font-bold">
            <img
              alt=""
              src="//yt3.googleusercontent.com/vCqmJ7cdUYpvR0bqLpWIe8ktaor4QafQLlfQyTuZy-M9W_YafT8Wo9kdsKL2St1BrkMRpVSJgA=s88-c-k-c0x00ffffff-no-rj-mo"
              className="w-8 rounded-full sm:w-12 md:w-16"
            />
            <span className="sm:2xl text-xl md:text-4xl">Music</span>
          </div>
          <div className="mt-5 flex gap-4 border-b-[1px] border-b-gray-200 text-slate-700"></div>
          <VideosContainer filterId={10} />
        </div>
      </div>
    </div>
  );
};

export default Music;
