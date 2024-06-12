import {
  faBookmark,
  faCheck,
  faHandHoldingDollar,
  faShare,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { abbreviateNumber, timeSince } from "../../../utils/constants";
import {
  dislikeItem,
  likeItem,
  removeDislike,
  removeLike,
} from "../../../utils/likeDislikeSlice";
import {
  addSubscription,
  removeSubscription,
} from "../../../utils/subscriptionsSlice";
import {
  addWatchLater,
  removeWatchLater,
} from "../../../utils/watchLaterSlice";

const VideoDetails = (data) => {
  const [videoData, channelData] = data.data;
  const [openDescription, setOpenDescription] = useState(false);
  const watchLater = useSelector((store) => store.watchLater);
  const subscriptions = useSelector((store) => store.subscriptions);
  const liked = useSelector((store) => store.likeDislike.liked);
  const disliked = useSelector((store) => store.likeDislike.disliked);
  const dispatch = useDispatch();

  const handleVideo = () => {
    if (!watchLater[videoData.id]) {
      dispatch(addWatchLater({ [videoData.id]: videoData }));
    } else {
      dispatch(removeWatchLater(videoData.id));
    }
  };

  const handleSubscribe = () => {
    if (!subscriptions[channelData.id]) {
      dispatch(addSubscription({ [channelData.id]: channelData }));
    } else {
      dispatch(removeSubscription(channelData.id));
    }
  };

  return (
    <div className="mr-4 flex flex-col gap-2">
      <div className="text-lg font-bold md:text-xl">
        {videoData?.snippet?.title}
      </div>
      <div className="flex flex-col justify-between gap-2 sm:flex-row">
        <div className="flex justify-between gap-3">
          <div className="flex gap-3">
            <Link to={`/channel?c=${videoData?.snippet?.channelId}`}>
              <img
                src={channelData?.snippet?.thumbnails?.default?.url}
                alt=""
                className="h-10 w-10 rounded-full"
              />
            </Link>
            <div className="-gap-4 flex flex-col">
              <Link to={`/channel?c=${videoData?.snippet?.channelId}`}>
                <div className="text-[0.9rem] font-semibold text-gray-800">
                  {channelData?.snippet?.title}{" "}
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="rounded-full bg-gray-700 p-0.5 text-[0.5rem] text-white"
                  />
                </div>
              </Link>
              <div className="text-[0.7rem] text-gray-600">
                {abbreviateNumber(channelData?.statistics?.subscriberCount)}{" "}
                subscribers
              </div>
            </div>
          </div>
          <button
            className={`ml-3 flex items-center justify-center rounded-full px-2 py-0 text-[0.9rem] font-semibold ${subscriptions[channelData.id] ? "bg-gray-100 text-black hover:bg-gray-200 focus:bg-gray-200" : "focus:bg-gray-70 bg-black text-gray-100 hover:bg-gray-700 "}`}
            onClick={() => {
              handleSubscribe();
            }}
          >
            {!subscriptions[channelData.id] ? "Subscribe" : "Subscribed"}
          </button>
        </div>
        <div className="flex gap-2">
          <div className="flex ">
            <button
              className={`flex items-center justify-center gap-2 rounded-l-full border-l-2 border-gray-900 px-3 py-2 text-[0.9rem] font-semibold ${liked[videoData.id] ? "bg-gray-800 text-gray-100 hover:bg-gray-700 focus:bg-gray-700" : "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:bg-gray-200"}`}
              onClick={() => {
                {
                  liked[videoData.id]
                    ? dispatch(removeLike(videoData.id))
                    : dispatch(likeItem({ [videoData.id]: videoData }));
                }
              }}
            >
              <FontAwesomeIcon icon={faThumbsUp} />
              {abbreviateNumber(videoData?.statistics?.likeCount)}
            </button>{" "}
            <div className="w-0.5  bg-gray-300"></div>
            <button
              className={`flex items-center justify-center gap-2 rounded-r-full border-l-2 border-gray-900 px-3 py-2 font-semibold ${disliked[videoData.id] ? "bg-gray-800 text-gray-100 hover:bg-gray-700 focus:bg-gray-700" : "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:bg-gray-200"}`}
              onClick={() => {
                {
                  disliked[videoData.id]
                    ? dispatch(removeDislike(videoData.id))
                    : dispatch(dislikeItem({ [videoData.id]: videoData }));
                }
              }}
            >
              <FontAwesomeIcon icon={faThumbsDown} />
            </button>
          </div>
          <button
            className={`flex items-center justify-center gap-2 rounded-full border-l-2 border-gray-900 px-3 py-2 font-semibold   ${!watchLater[videoData.id] ? "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:bg-gray-200" : "bg-gray-800 text-gray-100 hover:bg-gray-700 focus:bg-gray-700"}`}
            onClick={() => {
              handleVideo();
            }}
          >
            <FontAwesomeIcon icon={faBookmark} />{" "}
            {!watchLater[videoData.id] ? "Save" : "Saved"}
          </button>
          <button className="flex items-center justify-center gap-2 rounded-full border-l-2 border-gray-900 bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-200 focus:bg-gray-200">
            ...
          </button>
        </div>
      </div>
      <div className="w-full rounded-lg bg-gray-100 p-2">
        <div className="text-[0.9rem] font-semibold text-gray-700">
          {abbreviateNumber(videoData?.statistics?.viewCount)} Views{" "}
          {timeSince(new Date(videoData?.snippet?.publishedAt))}
        </div>
        <div>
          <div className={openDescription ? "" : "line-clamp-2"}>
            {videoData?.snippet?.description}
          </div>
          <button
            onClick={() => {
              setOpenDescription(!openDescription);
            }}
          >
            {openDescription ? "Less" : "More"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
