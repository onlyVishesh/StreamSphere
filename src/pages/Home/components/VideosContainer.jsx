import { useEffect, useState } from "react";
import { ytApi } from "../../../utils/constants";
import VideoCard from "./VideoCard";
import VideoCardShimmer from "./VideoCardShimmer";

const VideosContainer = () => {
  const [videoData, setVideoData] = useState(undefined);

  useEffect(() => {
    getVideoData();
  }, []);

  const getVideoData = async () => {
    const data = await fetch(ytApi);
    const json = await data.json();
    setVideoData(json.items);
  };

  return videoData === undefined ? (
    <div className="ml-2 mt-20 flex flex-wrap justify-center gap-1">
      {new Array(20).fill(0).map((element, index) => {
        return <VideoCardShimmer key={index} />;
      })}
    </div>
  ) : (
    <div className="mt-20 flex flex-wrap justify-center">
      {videoData.map((video) => (
        <VideoCard videoInfo={video} key={video.id} />
      ))}
    </div>
  );
};

export default VideosContainer;
