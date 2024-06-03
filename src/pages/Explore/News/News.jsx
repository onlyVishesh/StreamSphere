import VideosContainer from "./component/VideosContainer";

const News = () => {
  return (
    <div>
      <div className="mt-10 flex w-full justify-center">
        <div className="w-3/4">
          <div className="flex items-center gap-3 font-bold">
            <span className="text-4xl">News</span>
          </div>
          <div className="mt-5 flex gap-4 border-b-[1px] border-b-gray-200 text-lg text-slate-700"></div>
          <VideosContainer filterId={25} />
        </div>
      </div>
    </div>
  );
};

export default News;
