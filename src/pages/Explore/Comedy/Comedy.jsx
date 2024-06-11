import VideosContainer from "../component/VideosContainer";

const Comedy = () => {
  return (
    <div>
      <div className="mt-2 flex w-full justify-center md:mt-10">
        <div className="w-11/12 md:w-10/12 lg:w-3/4">
          <div className="flex items-center gap-3 font-bold">
            <span className="sm:2xl text-xl md:text-4xl">Comedy</span>
          </div>
          <div className="mt-5 flex gap-4 border-b-[1px] border-b-gray-200 text-lg text-slate-700"></div>
          <VideosContainer filterId={23} />
        </div>
      </div>
    </div>
  );
};

export default Comedy;
