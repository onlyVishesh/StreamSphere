import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LongVideoCard from "../../../../components/LongVideoCard";
import LongVideoCardShimmer from "../../../../components/LongVideoCardShimmer";
import { filterApi } from "../../../../utils/constants";
import { addHistory, removeHistory } from "../../../../utils/historySlice";
import { useDispatch, useSelector } from "react-redux";

const VideosContainer = ({ filterId }) => {
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
    if (loading || pageToken === undefined) return;

    setLoading(true);
    try {
      let url = filterApi(filterId);
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

  if (noVideos) {
    return (
      <div className="mt-20 flex w-full justify-center text-3xl">
        No videos available
      </div>
    );
  }

  if (videoData.length === 0 && loading) {
    return (
      <div className="mt-5 flex flex-wrap justify-start gap-1">
        {new Array(20).fill(0).map((_, index) => (
          <LongVideoCardShimmer key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="mt-5 flex flex-wrap justify-start gap-5">
      {videoData.map((video) => (
        <Link
          to={`/watch?v=${video.id}`}
          key={video.id}
          onClick={() => {
            if (history[video.id]) {
              dispatch(removeHistory(video.id));
              dispatch(addHistory({ [video.id]: video }));
            } else {
              dispatch(addHistory({ [video.id]: video }));
            }
          }}
        >
          <LongVideoCard data={video} />
        </Link>
      ))}

      {loading && pageToken && (
        <>
          {new Array(5).fill(0).map((_, index) => (
            <LongVideoCardShimmer key={index} />
          ))}
        </>
      )}
    </div>
  );
};

export default VideosContainer;
