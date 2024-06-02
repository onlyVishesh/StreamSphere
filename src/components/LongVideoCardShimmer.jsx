const LongVideoCardShimmer = () => {
  return (
    <div className="flex w-5/6 gap-5">
      <div className="relative h-44 w-80 flex-shrink-0">
        <div className="shimmer w-ful h-full rounded-lg object-cover" />
      </div>

      <div className="flex flex-col gap-1">
        <div className="shimmer h-6 w-[40rem]"></div>
        <div className="shimmer h-6 w-96"></div>
        <div className="flex items-center gap-3 text-slate-300">
          <div className="shimmer h-2 w-20"></div>
          <div className="shimmer h-2 w-7"></div> &#8226;
          <div className="shimmer h-2 w-20"></div>
        </div>
        <div className="shimmer h-3  w-[38rem]"></div>
        <div className="shimmer h-3 w-96"></div>
      </div>
    </div>
  );
};

export default LongVideoCardShimmer;
