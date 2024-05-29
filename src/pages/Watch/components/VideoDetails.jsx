import {
  faCheck,
  faDownload,
  faHandHoldingDollar,
  faShare,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import { abbreviateNumber, timeSince } from "../../../utils/constants";

const VideoDetails = (data) => {
  const [videoData, channelData] = data.data;
  const [openDescription, setOpenDescription] = useState(false);

  return (
    <>
      <div className="text-xl font-bold">{videoData?.snippet?.title}</div>
      <div className="flex justify-between">
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
              <div className="font-semibold text-gray-800">
                {channelData?.snippet?.title}{" "}
                <FontAwesomeIcon
                  icon={faCheck}
                  className="rounded-full bg-gray-700 p-0.5 text-[0.5rem] text-white"
                />
              </div>
            </Link>
            <div className="text-xs text-gray-600">
              {abbreviateNumber(channelData?.statistics?.subscriberCount)}{" "}
              subscribers
            </div>
          </div>
          <button className="ml-3 rounded-full bg-black px-4 py-0 text-sm font-semibold text-white">
            Subscribe
          </button>
        </div>
        <div className="flex gap-2">
          <div className="flex ">
            <button className="flex items-center justify-center gap-2 rounded-l-full border-l-2 border-gray-900 bg-gray-100 px-3 py-2 font-semibold text-gray-800 hover:bg-gray-200 focus:bg-gray-200">
              <FontAwesomeIcon icon={faThumbsUp} />
              {abbreviateNumber(videoData?.statistics?.likeCount)}
            </button>{" "}
            <div className="w-0.5  bg-gray-300"></div>
            <button className="flex items-center justify-center gap-2 rounded-r-full border-l-2 border-gray-700 bg-gray-100 px-3 py-2 font-semibold text-gray-800 hover:bg-gray-200 focus:bg-gray-200">
              <FontAwesomeIcon icon={faThumbsDown} />
            </button>
          </div>
          <button className="flex items-center justify-center gap-2 rounded-full border-l-2 border-gray-900 bg-gray-100 px-3 py-2 font-semibold text-gray-800 hover:bg-gray-200 focus:bg-gray-200">
            <FontAwesomeIcon icon={faShare} /> Share
          </button>
          <button className="flex items-center justify-center gap-2 rounded-full border-l-2 border-gray-900 bg-gray-100 px-3 py-2 font-semibold text-gray-800 hover:bg-gray-200 focus:bg-gray-200">
            <FontAwesomeIcon icon={faDownload} /> Download
          </button>
          <button className="flex items-center justify-center gap-2 rounded-full border-l-2 border-gray-900 bg-gray-100 px-3 py-2 font-semibold text-gray-800 hover:bg-gray-200 focus:bg-gray-200">
            <FontAwesomeIcon icon={faHandHoldingDollar} /> Thanks
          </button>
          <button className="flex items-center justify-center gap-2 rounded-full border-l-2 border-gray-900 bg-gray-100 px-3 py-2 font-semibold text-gray-800 hover:bg-gray-200 focus:bg-gray-200">
            <FontAwesomeIcon icon={faThumbsUp} />
            Clip
          </button>
          <button className="flex items-center justify-center gap-2 rounded-full border-l-2 border-gray-900 bg-gray-100 px-3 py-2 font-semibold text-gray-800 hover:bg-gray-200 focus:bg-gray-200">
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
    </>
  );
};

export default VideoDetails;
