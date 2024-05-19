import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { abbreviateNumber, apiKey, timeSince } from "../../../utils/constants";

const VideoCard = ({ videoInfo }) => {
  const [channelProfile, setChannelProfile] = useState([]);

  const { snippet, statistics } = videoInfo;
  const { thumbnails, title, channelId, channelTitle, publishedAt } = snippet;
  const { viewCount } = statistics;

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
      <div className="m-1 flex w-80 cursor-pointer flex-col gap-1 p-2">
        <div>
          <img src={thumbnails.medium.url} alt="" className="rounded-lg" />
        </div>
        <div className="flex gap-3">
          <Link to="test" className="h-10 w-10 rounded-full">
            <img
              src={channelProfile}
              alt={channelTitle}
              className="h-10 w-10 rounded-full"
            />
          </Link>
          <div className="w-10/12">
            <div className="line-clamp-2 font-bold">{title}</div>
            <Link
              to="test"
              className="transition-all duration-100 hover:font-semibold"
            >
              {channelTitle}
            </Link>
            <div className="flex gap-1 text-sm">
              <div>{abbreviateNumber(viewCount)} Views</div>
              &#8226;
              <div>{timeSince(new Date(publishedAt))}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

VideoCard.propTypes = {
  videoInfo: PropTypes.object.isRequired,
};

export default VideoCard;
