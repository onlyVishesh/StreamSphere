import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  abbreviateNumber,
  formatDuration,
  timeSince,
} from "../utils/constants";

const LongVideoCard = ({ data }) => {
  console.log(data);
  const { snippet, contentDetails, statistics } = data;
  return (
    <div className="flex w-5/6 gap-5">
      <div className="relative flex-shrink-0">
        <img
          alt={snippet.title}
          src={snippet?.thumbnails?.medium?.url}
          className="h-full w-full rounded-lg object-cover"
        />
        <div className="absolute bottom-1 right-2 z-10 rounded-md bg-gray-900 px-1 py-0.5 text-xs text-white">
          {formatDuration(contentDetails.duration)}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <div className="text-xl font-semibold text-gray-800">
          {snippet.title}
        </div>
        <div className="flex gap-3 text-sm text-slate-600">
          <Link
            to={`/channel?c=${snippet?.channelId}`}
            className="line-clamp-1 flex items-center gap-1 text-nowrap transition-all duration-100 hover:font-semibold"
          >
            {snippet?.channelTitle}
            <FontAwesomeIcon
              icon={faCheck}
              className="rounded-full bg-gray-700 p-0.5 text-[0.5rem] text-white"
            />
          </Link>
          <div>{abbreviateNumber(statistics?.viewCount)}</div> &#8226;
          <div>{timeSince(new Date(snippet?.publishedAt))}</div>
        </div>
        <div className="line-clamp-2 text-slate-800">
          {snippet?.description}
        </div>
      </div>
    </div>
  );
};

export default LongVideoCard;
