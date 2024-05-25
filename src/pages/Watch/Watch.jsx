import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { closeMenu } from "../../utils/appSlice";
import { channelApi, videoApi } from "../../utils/constants";
import Comments from "./components/Comments";
import Video from "./components/Video";
import VideoDetails from "./components/VideoDetails";

const Watch = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const [videoData, setVideoData] = useState([]);
  const [channelData, setChannelData] = useState([]);

  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeMenu());
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
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
    const data = await fetch(videoApi(videoId));
    const json = await data.json();
    setVideoData(...json.items);
  };

  useEffect(() => {
    if (videoData) {
      getChannelData(videoData?.snippet?.channelId);
      console.log(videoData);
    }
  }, [videoData]);

  const getChannelData = async (channelId) => {
    const data = await fetch(channelApi(channelId));
    const json = await data.json();
    setChannelData(...json.items);
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
        <Video data={[videoId, videoData?.snippet?.title]} />
        <VideoDetails data={[videoData, channelData]} />
        <Comments data={[videoId, videoData?.statistics?.commentCount]} />
      </div>

      <div className="lg:w-4/12">hi</div>
    </div>
  );
};

export default Watch;
