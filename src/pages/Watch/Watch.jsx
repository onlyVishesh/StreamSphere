import {
  faCheck,
  faDownload,
  faHandHoldingDollar,
  faShare,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { closeMenu } from "../../utils/appSlice";
import {
  abbreviateNumber,
  channelApi,
  timeSince,
  videoApi,
} from "../../utils/constants";

const Watch = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const [videoData, setVideoData] = useState([]);
  const [channelData, setChannelData] = useState([]);
  const [openDescription, setOpenDescription] = useState(false);

  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeMenu());
  }, []);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    console.log(videoId);
    const data = await fetch(videoApi(videoId));
    const json = await data.json();
    setVideoData(...json.items);
    console.log(videoData);
  };

  useEffect(() => {
    if (videoData) {
      getChannelData(videoData?.snippet?.channelId);
    }
  }, [videoData]);

  const getChannelData = async (channelId) => {
    const data = await fetch(channelApi(channelId));
    const json = await data.json();
    setChannelData(...json.items);
    console.log(channelData);
  };

  const marginLeft =
    isMenuOpen && windowWidth > 1023
      ? "15rem"
      : windowWidth < 640
        ? "3rem"
        : "5rem";

  return (
    <div className={`m-5 flex gap-5 overflow-hidden`} style={{ marginLeft }}>
      <div className="ml-5 flex flex-col gap-3 lg:w-9/12">
        <iframe
          className="rounded-xl"
          width="1280"
          height="720"
          src={"https://www.youtube.com/embed/" + videoId}
          title="LEAVING FOR TOKYO! Solo in Japan Ep.11"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
        <div className="text-xl font-bold">{videoData?.snippet?.title}</div>
        <div className="flex justify-between">
          <div className="flex gap-3">
            <img
              src={channelData?.snippet?.thumbnails?.default?.url}
              alt=""
              className="h-10 w-10 rounded-full"
            />
            <div className="-gap-4 flex flex-col">
              <div className="font-semibold text-gray-800">
                {channelData?.snippet?.title}{" "}
                <FontAwesomeIcon
                  icon={faCheck}
                  className="rounded-full bg-gray-700 p-0.5 text-[0.5rem] text-white"
                />
              </div>
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
            <div className={openDescription ? "" : "line-clamp-2"}>{videoData?.snippet?.description}</div>
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

      <div className="lg:w-4/12">hi</div>
    </div>
  );
};

export default Watch;
