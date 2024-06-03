import VideosContainer from "./component/VideosContainer";

const Gaming = () => {
  return (
    <div>
      <div className="mt-10 flex w-full justify-center">
        <div className="w-3/4">
          <div className="flex items-center gap-3 font-bold">
            <img
              alt="gaming"
              src="//yt3.googleusercontent.com/pzvUHajbQDLDt63gKFYUX445k3VprUs8CeJFpNTxGQZlk0grOSkAqU8Th1_C97dyYM3nENgjbw=s72-c-k-c0x00ffffff-no-rj"
              className="w-16 rounded-full"
            />
            <span className="text-4xl">Gaming</span>
          </div>
          <div className="mt-5 flex gap-4 border-b-[1px] border-b-gray-200 text-lg text-slate-700"></div>
          <VideosContainer filterId={20} />
        </div>
      </div>
    </div>
  );
};

export default Gaming;
