import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ShortVideoCard from "../../../components/ShortVideoCard";
import ShortVideoCardShimmer from "../../../components/ShortVideoCardShimmer";
import { channelVideoApi } from "../../../utils/constants";
import { addHistory, removeHistory } from "../../../utils/historySlice";
import { useDispatch, useSelector } from "react-redux";

const Video = ({ channelId }) => {
  const [filter, setFilter] = useState("date");
  const [videoData, setVideoData] = useState([]);
  const [pageToken, setPageToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [noVideos, setNoVideos] = useState(false);

  const dispatch = useDispatch();
  const history = useSelector((store) => store.history);

  useEffect(() => {
    setVideoData([]);
    setPageToken(null);
    setNoVideos(false);
    getVideoData(filter, channelId);
  }, [filter]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        getVideoData(filter, channelId, pageToken);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pageToken]);

  const getVideoData = async (filter, channelId, token) => {
    if (loading || pageToken === undefined) return;

    setLoading(true);
    try {
      let url = channelVideoApi(filter, channelId);
      if (token) {
        url += `&pageToken=${token}`;
      }
      const data = await fetch(url);
      const json = await data.json();

      if (!json.items || json.items.length === 0) {
        setNoVideos(true);
        setLoading(false);
        return;
      }

      setVideoData((prevData) => {
        const uniqueVideos = json.items.filter((item) => {
          return !prevData.some((prevVideo) => prevVideo.id === item.id);
        });
        return [...prevData, ...uniqueVideos];
      });

      setPageToken(json.nextPageToken);
      setNoVideos(false);
    } catch (error) {
      console.error("Failed to load videos", error);
    } finally {
      setLoading(false);
    }
  };

  if (videoData.length === 0 && loading) {
    return (
      <div className="m-10 mt-0 flex w-full flex-col items-center justify-center gap-4 ">
        <div className="flex w-4/5 flex-col gap-2">
          <div className="text-2xl font-bold">Videos</div>
          <div className="flex items-center justify-start gap-5">
            <button
              className={`flex items-center justify-center rounded-lg px-2 py-1 ${filter === "date" ? "bg-black text-white" : "bg-slate-100 hover:bg-slate-200"}`}
              onClick={() => setFilter("date")}
            >
              Latest
            </button>
            <button
              className={`flex items-center justify-center rounded-lg px-2 py-1 ${filter === "viewCount" ? "bg-black text-white" : "bg-slate-100 hover:bg-slate-200"}`}
              onClick={() => setFilter("viewCount")}
            >
              Popular
            </button>
          </div>
          <div className="flex flex-wrap justify-center">
            {new Array(20).fill(0).map((_, index) => (
              <ShortVideoCardShimmer key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="m-10 mt-0 flex w-full flex-col items-center justify-center gap-4">
      <div className="flex w-3/4 flex-col gap-2">
        <div className="text-2xl font-bold">Videos</div>
        <div className="flex items-center justify-start gap-5">
          <button
            className={`flex items-center justify-center rounded-lg px-2 py-1 ${filter === "date" ? "bg-black text-white" : "bg-slate-100 hover:bg-slate-200"}`}
            onClick={() => setFilter("date")}
          >
            Latest
          </button>
          <button
            className={`flex items-center justify-center rounded-lg px-2 py-1 ${filter === "viewCount" ? "bg-black text-white" : "bg-slate-100 hover:bg-slate-200"}`}
            onClick={() => setFilter("viewCount")}
          >
            Popular
          </button>
        </div>
        <div className="flex flex-wrap justify-center">
          {videoData.map((video) => (
            <Link
              to={`/watch?v=${video.id.videoId}`}
              key={video.id.videoId}
              onClick={() => {
                if (history[video.id]) {
                  dispatch(removeHistory(video.id));
                  dispatch(addHistory({ [video.id]: video }));
                } else {
                  dispatch(addHistory({ [video.id]: video }));
                }
              }}
            >
              <ShortVideoCard videoInfo={video} />
            </Link>
          ))}
          {loading && pageToken && (
            <>
              {new Array(8).fill(0).map((_, index) => (
                <ShortVideoCardShimmer key={index} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Video;
