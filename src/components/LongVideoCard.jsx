import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  abbreviateNumber,
  formatDuration,
  timeSince,
} from "../utils/constants";

const LongVideoCard = ({ data }) => {
  return (
    <div className="flex w-5/6 gap-5">
      <div className="relative flex-shrink-0">
        <img
          alt={data?.snippet?.title}
          src={data?.snippet?.thumbnails?.medium?.url}
          className="h-full w-full rounded-lg object-cover"
        />
        <div className="absolute bottom-1 right-2 z-[5] rounded-md bg-gray-900 px-1 py-0.5 text-xs text-white">
          {data?.contentDetails?.duration &&
            formatDuration(data?.contentDetails?.duration)}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <div className="text-xl font-semibold text-gray-800">
          {data?.snippet?.title}
        </div>
        <div className="flex gap-3 text-sm text-slate-600">
          <Link
            to={`/channel?c=${data?.snippet?.channelId}`}
            className="line-clamp-1 flex items-center gap-1 text-nowrap transition-all duration-100 hover:font-semibold"
          >
            {data?.snippet?.channelTitle}
            <FontAwesomeIcon
              icon={faCheck}
              className="rounded-full bg-gray-700 p-0.5 text-[0.5rem] text-white"
            />
          </Link>
          <div>{abbreviateNumber(data?.statistics?.viewCount)}</div> &#8226;
          <div>{timeSince(new Date(data?.snippet?.publishedAt))}</div>
        </div>
        <div className="line-clamp-2 text-slate-800">
          {data?.snippet?.description}
        </div>
      </div>
    </div>
  );
};

export default LongVideoCard;
