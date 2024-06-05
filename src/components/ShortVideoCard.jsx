import PropTypes from "prop-types";
import { decodeHtml, timeSince } from "../utils/constants";
import { addWatchLater, removeWatchLater } from "../utils/watchLaterSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";

const ShortVideoCard = ({ videoInfo }) => {
  const { snippet } = videoInfo;
  const { thumbnails, title, publishedAt } = snippet;
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

  return (
    <div className="group m-0.5 flex w-[19.3rem] cursor-pointer flex-col gap-1 p-2">
      <div className="relative -z-10">
        <img src={thumbnails.medium.url} alt="" className=" rounded-lg" />
      </div>
      <div className="flex justify-between gap-3">
        <div className="w-10/12">
          <div className="line-clamp-2 font-bold ">{decodeHtml(title)}</div>
          <div className="flex gap-1 text-xs text-slate-500">
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
  );
};

export default ShortVideoCard;
