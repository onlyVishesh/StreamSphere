const VideoCardShimmer = () => {
  return (
    <>
      <div className="m-1 flex w-80 cursor-pointer flex-col gap-2 p-2 ">
        <div className="shimmer h-40 w-80 rounded-lg"></div>
        <div className="flex gap-2">
          <div className="shimmer h-10 w-10 rounded-full"></div>
          <div className="flex w-10/12 flex-col gap-2">
            <div className="shimmer w-50 h-4"></div>
            <div className="shimmer w-50 h-4"></div>
            <div className="shimmer h-3 w-20"></div>
            <div className="flex items-center gap-1 text-sm">
              <div className="shimmer h-3 w-20"></div>
              <div className="shimmer h-3 w-20"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoCardShimmer;
