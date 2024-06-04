import { abbreviateNumber } from "../utils/constants";

const Channel = ({ channelData }) => {
  return (
    <div className="flex w-3/4 items-center justify-center gap-32 px-20">
      <div className="w-3/12 rounded-full">
        <img
          src={channelData?.snippet?.thumbnails?.high?.url}
          alt={channelData?.snippet?.title}
          className="w-56 rounded-full"
        />
      </div>
      <div className="flex w-10/12 flex-col gap-2">
        <div className="text-4xl font-bold ">{channelData?.snippet?.title}</div>
        <div className="w-5/6 text-slate-500">
          <div className={"line-clamp-2"}>
            {channelData?.snippet?.description}
          </div>
        </div>
        <div className="flex gap-2">
          <button className=" rounded-full  bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Channel;
