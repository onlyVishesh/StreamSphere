import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  abbreviateNumber,
  apiKey,
  formatDuration,
  timeSince,
} from "../utils/constants";
import { addWatchLater, removeWatchLater } from "../utils/watchLaterSlice";

const VideoCard = ({ videoInfo }) => {
  const [channelProfile, setChannelProfile] = useState([]);

  const { snippet, statistics, contentDetails } = videoInfo;
  const { thumbnails, title, channelId, channelTitle, publishedAt } = snippet;
  const { viewCount } = statistics;
  const { duration } = contentDetails;

  const [isSaveVisible, setIsSaveVisible] = useState(false);
  const saveRef = useRef(null);
  const watchLater = useSelector((store) => store.watchLater);
  const dispatch = useDispatch();

  const toggleSave = () => {
    setIsSaveVisible(!isSaveVisible);
  };

  const addVideo = () => {
    if (!watchLater[videoInfo.id]) {
      dispatch(addWatchLater({ [videoInfo.id]: videoInfo }));
    } else {
      dispatch(removeWatchLater(videoInfo.id));
    }
  };

  useEffect(() => {
    channelProfileURL(channelId);
  }, []);

  const channelProfileURL = async (channelId) => {
    const data = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet&fields=items%2Fsnippet%2Fthumbnails%2Fdefault&id=${channelId}&key=${apiKey}`,
    );
    const json = await data.json();
    setChannelProfile(json.items[0].snippet.thumbnails.default.url);
  };

  return (
    <>
      <div className="group m-1 flex w-80 cursor-pointer flex-col gap-1 p-2">
        <div className="relative -z-10">
          <img src={thumbnails.medium.url} alt="" className=" rounded-lg" />
          <div className="absolute bottom-1 right-2 z-10 rounded-md bg-gray-900 px-1 py-0.5 text-xs text-white">
            {formatDuration(duration)}
          </div>
        </div>
        <div className="flex gap-3">
          <Link
            to={`/channel?c=${channelId}`}
            className="h-10 w-10 rounded-full"
          >
            <img
              src={channelProfile}
              alt={channelTitle}
              className="h-10 w-10 rounded-full"
            />
          </Link>
          <div className="w-10/12">
            <div className="line-clamp-2 font-bold">{title}</div>
            <Link
              to={`/channel?c=${channelId}`}
              className="line-clamp-1 flex items-center gap-1 text-nowrap transition-all duration-100 hover:font-semibold"
            >
              {channelTitle}
              <FontAwesomeIcon
                icon={faCheck}
                className="rounded-full bg-gray-700 p-0.5 text-[0.5rem] text-white"
              />
            </Link>
            <div className="flex gap-1 text-sm">
              <div>{abbreviateNumber(viewCount)} Views</div>
              &#8226;
              <div>{timeSince(new Date(publishedAt))}</div>
            </div>
          </div>
          <div
            className="invisible relative h-6 rounded-full hover:cursor-pointer hover:bg-slate-100 group-hover:visible"
            onClick={(e) => {
              e.preventDefault();
              toggleSave();
            }}
            ref={saveRef}
          >
            &#8942;
            {isSaveVisible && (
              <div
                className={` absolute flex items-center justify-center gap-2 rounded-full border-gray-900 px-3 py-2 font-semibold ${!watchLater[videoInfo.id] ? "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:bg-gray-200" : "bg-gray-800 text-gray-100 hover:bg-gray-700 focus:bg-gray-700"}`}
                onClick={() => {
                  addVideo();
                }}
              >
                {!watchLater[videoInfo.id] ? "Save" : "Saved"}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoCard;
