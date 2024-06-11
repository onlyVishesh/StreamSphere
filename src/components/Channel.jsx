import { useDispatch, useSelector } from "react-redux";
import {
  addSubscription,
  removeSubscription,
} from "../utils/subscriptionsSlice";

const Channel = ({ channelData }) => {
  const subscriptions = useSelector((store) => store.subscriptions);
  const dispatch = useDispatch();
  const handleSubscribe = () => {
    if (!subscriptions[channelData.id.channelId]) {
      dispatch(addSubscription({ [channelData.id.channelId]: channelData }));
    } else {
      dispatch(removeSubscription(channelData.id.channelId));
    }
  };
  return (
    <div className="flex w-3/4 items-center justify-center ">
      <div className="w-4/12 rounded-full">
        <img
          src={channelData?.snippet?.thumbnails?.high?.url}
          alt={channelData?.snippet?.title}
          className="w-9/12 rounded-full md:w-9/12 lg:w-7/12"
        />
      </div>
      <div className="flex w-10/12 flex-col gap-2">
        <div className="text-md gap-1 font-bold xs:text-lg  md:text-xl lg:text-4xl">
          {channelData?.snippet?.title}
        </div>
        <div className="md:text-md w-5/6 text-[0.8rem] text-slate-500 xs:text-sm lg:text-lg">
          <div className={"line-clamp-2"}>
            {channelData?.snippet?.description}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className={`flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold ${subscriptions[channelData.id.channelId] ? "bg-gray-100 text-black hover:bg-gray-200 focus:bg-gray-200" : "bg-black text-gray-100 hover:bg-gray-700 focus:bg-gray-700"}`}
            onClick={(e) => {
              e.preventDefault();
              handleSubscribe();
            }}
          >
            {!subscriptions[channelData.id.channelId]
              ? "Subscribe"
              : "Subscribed"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Channel;
