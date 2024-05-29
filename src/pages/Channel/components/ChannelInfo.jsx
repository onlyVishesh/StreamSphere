import { useState } from "react";
import { abbreviateNumber } from "../../../utils/constants";
import AboutModel from "./AboutModel";

const ChannelInfo = ({ channelData, bannerUrl, channelId }) => {
  const [openAbout, setOpenAbout] = useState(false);

  return (
    <>
      <div className="m-10 mt-0 flex w-full flex-col items-center justify-center gap-4">
        <div className="flex w-full items-center justify-center">
          <div
            className="h-56 w-2/3 rounded-xl"
            style={{
              backgroundImage: `url(${bannerUrl})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          ></div>
        </div>
        <div className="flex w-2/3 items-center justify-center gap-2 ">
          <div className="w-2/12 rounded-full">
            <img
              src={channelData[0]?.snippet?.thumbnails?.medium?.url}
              alt={channelData[0]?.snippet?.title}
              className="w-48 rounded-full"
            />
          </div>
          <div className="flex w-10/12 flex-col gap-2">
            <div className="text-4xl font-bold ">
              {channelData[0]?.snippet?.title}
            </div>
            <div className="flex gap-2 text-sm text-slate-600">
              <div>{channelData[0]?.snippet?.customUrl}</div>&#8226;
              <div>
                {abbreviateNumber(channelData[0]?.statistics?.subscriberCount)}{" "}
                subscribers
              </div>
              &#8226;
              <div>
                {abbreviateNumber(channelData[0]?.statistics?.videoCount)}{" "}
                videos
              </div>
            </div>
            <div className="w-5/6 text-slate-500">
              <div className={"line-clamp-2"}>
                {channelData[0]?.snippet?.description}
              </div>
              <button
                onClick={() => {
                  setOpenAbout(!openAbout);
                }}
                className="text-slate-700"
              >
                {openAbout ? "Less" : "More"}
              </button>
            </div>
            <div className="flex gap-2">
              <button className="ml-3 rounded-full  bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      <AboutModel
        open={openAbout}
        onClose={() => setOpenAbout(false)}
        channelId={channelId}
      />
    </>
  );
};

export default ChannelInfo;
