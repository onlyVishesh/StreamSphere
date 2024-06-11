import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { abbreviateNumber } from "../../../utils/constants";
import {
  addSubscription,
  removeSubscription,
} from "../../../utils/subscriptionsSlice";
import AboutModel from "./AboutModel";

const ChannelInfo = ({ channelData, bannerUrl, channelId }) => {
  const [openAbout, setOpenAbout] = useState(false);
  const subscriptions = useSelector((store) => store.subscriptions);
  const dispatch = useDispatch();

  const handleSubscribe = () => {
    if (!subscriptions[channelId]) {
      dispatch(addSubscription({ [channelId]: channelData[0] }));
    } else {
      dispatch(removeSubscription(channelId));
    }
  };

  return (
    <>
      <div className="mt-0 flex w-full flex-col items-center justify-center gap-4">
        <div className="flex w-full items-center justify-center">
          <div
            className="lgh-56 h-24 w-3/4 rounded-xl sm:h-32 md:h-40 xl:h-60"
            style={{
              backgroundImage: `url(${bannerUrl})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          ></div>
        </div>
        <div className="flex w-3/4 items-center justify-center ">
          <div className="w-4/12 rounded-full">
            <img
              src={channelData[0]?.snippet?.thumbnails?.medium?.url}
              alt={channelData[0]?.snippet?.title}
              className="w-9/12 rounded-full md:w-9/12 lg:w-7/12"
            />
          </div>
          <div className="flex w-full flex-col md:gap-1 lg:gap-2">
            <div className="text-md gap-1 font-bold xs:text-lg  md:text-xl lg:text-4xl">
              {channelData[0]?.snippet?.title}
            </div>
            <div className="flex gap-2 text-[0.6rem] text-slate-600 xs:text-xs md:text-sm lg:text-lg">
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
            <div className="md:text-md w-5/6 text-[0.8rem] text-slate-500 xs:text-sm lg:text-lg">
              <div className={"line-clamp-2"}>
                {channelData[0]?.snippet?.description}
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setOpenAbout(!openAbout);
                }}
                className="text-slate-700"
              >
                {openAbout ? "Less" : "More"}
              </button>
            </div>
            <div className="flex gap-2">
              <button
                className={`flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold ${subscriptions[channelId] ? "bg-gray-100 text-black hover:bg-gray-200 focus:bg-gray-200" : "bg-black text-gray-100 hover:bg-gray-700 focus:bg-gray-700"}`}
                onClick={() => {
                  handleSubscribe();
                }}
              >
                {!subscriptions[channelId] ? "Subscribe" : "Subscribed"}
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
