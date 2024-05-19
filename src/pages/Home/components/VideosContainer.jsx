import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { filterApi } from "../../../utils/constants";
import VideoCard from "./VideoCard";
import VideoCardShimmer from "./VideoCardShimmer";

const VideosContainer = () => {
  const [videoData, setVideoData] = useState([]);
  const [pageToken, setPageToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const filterId = useSelector((store) => store.app.filterId);

  useEffect(() => {
    setVideoData([]);
    setPageToken(null);
    getVideoData();
  }, [filterId]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        getVideoData(pageToken);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pageToken]);

  const getVideoData = async (token) => {
    if (loading) return;

    setLoading(true);
    if (token === null || token === undefined) {
      const data = await fetch(filterApi(filterId));
      const json = await data.json();
      setVideoData((prevData) => {
        const uniqueVideos = json.items.filter((item) => {
          return !prevData.some((prevVideo) => prevVideo.id === item.id);
        });
        return [...prevData, ...uniqueVideos];
      });
      setPageToken(json.nextPageToken);
    } else {
      const data = await fetch(filterApi(filterId) + `&pageToken=${token}`);
      const json = await data.json();
      setVideoData((prevData) => {
        const uniqueVideos = json.items.filter((item) => {
          return !prevData.some((prevVideo) => prevVideo.id === item.id);
        });
        return [...prevData, ...uniqueVideos];
      });
      setPageToken(json.nextPageToken);
    }

    setLoading(false);
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
        <Link to={`/watch?v=${video.id}`} key={video.id}>
          <VideoCard videoInfo={video} />
        </Link>
      ))}
    </div>
  );
};

export default VideosContainer;
