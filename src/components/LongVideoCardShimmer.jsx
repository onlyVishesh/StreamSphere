const LongVideoCardShimmer = () => {
  return (
    <div className="flex w-full gap-5">
      <div className="relative aspect-video w-40 flex-shrink-0 md:w-52 lg:w-80">
        <div className="shimmer w-ful h-full rounded-lg object-cover" />
      </div>

      <div className="flex flex-col gap-1">
        <div className="shimmer h-3 w-[14rem] md:h-4 md:w-[20rem] lg:w-[40vw] "></div>
        <div className="shimmer h-3 w-32 md:h-4 md:w-40 lg:w-[30vw] "></div>
        <div className="flex items-center gap-3 text-slate-300">
          <div className="shimmer h-1 w-10 md:h-1.5 md:w-12 lg:h-3  "></div>
          <div className="shimmer h-1 w-12 md:h-1.5 md:w-14 lg:h-3"></div>{" "}
          &#8226;
          <div className="shimmer h-1 w-10 md:h-1.5 md:w-12 lg:h-3"></div>
        </div>
        <div className="shimmer h-2 w-[12rem] md:h-3 md:w-80 lg:h-3.5 lg:w-[40vw]"></div>
        <div className="shimmer lg: h-2 w-32 md:h-3 md:w-40 lg:h-3.5 lg:w-[35vw]"></div>
      </div>
    </div>
  );
};

export default LongVideoCardShimmer;
