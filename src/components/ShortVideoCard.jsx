import PropTypes from "prop-types";
import { decodeHtml, timeSince } from "../utils/constants";

const ShortVideoCard = ({ videoInfo }) => {
  const { snippet } = videoInfo;
  const { thumbnails, title, publishedAt } = snippet;

  return (
    <>
      <div className="m-0.5 flex w-[19.3rem] cursor-pointer flex-col gap-1 p-2">
        <div className="relative -z-10">
          <img src={thumbnails.medium.url} alt="" className=" rounded-lg" />
        </div>
        <div className="flex gap-3">
          <div className="w-10/12">
            <div className="line-clamp-2 font-bold ">{decodeHtml(title)}</div>
            <div className="flex gap-1 text-xs text-slate-500">
              <div>{timeSince(new Date(publishedAt))}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ShortVideoCard.propTypes = {
  videoInfo: PropTypes.object.isRequired,
};

export default ShortVideoCard;
