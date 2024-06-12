import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { closeMenu } from "../../utils/appSlice";
import { channelApi, videoApi } from "../../utils/constants";
import Comments from "./components/Comments";
import LiveChat from "./components/LiveChat";
import Video from "./components/Video";
import VideoDetails from "./components/VideoDetails";

const Watch = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const [videoData, setVideoData] = useState([]);
  const [channelData, setChannelData] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeMenu());
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
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
    }
  }, [videoData]);

  const getChannelData = async (channelId) => {
    const data = await fetch(channelApi(channelId));
    const json = await data.json();
    setChannelData(...json.items);
  };

  return (
    <div>
      <div className="ml-5 flex flex-col justify-center gap-3 lg:w-9/12 ">
        <div className="flex flex-col justify-between gap-5 lg:flex-row">
          <div className="flex flex-col">
            <Video data={[videoId, videoData?.snippet?.title]} />
            <VideoDetails data={[videoData, channelData]} />
          </div>

          <LiveChat />
        </div>
        <Comments data={[videoId, videoData?.statistics?.commentCount]} />
      </div>
    </div>
  );
};

export default Watch;
