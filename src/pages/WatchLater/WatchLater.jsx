import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LongVideoCard from "../../components/LongVideoCard";
import { addHistory, removeHistory } from "../../utils/historySlice";
import { useEffect, useState } from "react";
import VideoCard from "../../components/VideoCard";

const WatchLater = () => {
  const watchLater = useSelector((store) => store.watchLater);
  const isEmpty = Object.keys(watchLater).length === 0;

  const dispatch = useDispatch();
  const history = useSelector((store) => store.history);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="mt-2 flex w-full justify-center md:mt-10">
      <div className="w-11/12 md:w-10/12 lg:w-3/4">
        <div className="flex items-center gap-3 font-bold">
          <img
            alt=""
            src="https://www.youtube.com/img/trending/avatar/trending.png"
            className="w-8 rounded-full sm:w-12 md:w-16"
          />
          <span className="sm:2xl text-xl md:text-4xl">Watch Later</span>
        </div>
        <div className="mt-5 flex flex-wrap justify-start gap-5">
          {isEmpty ? (
            <div className="text-xl">
              You have not saved any video for later.{" "}
              <Link to="/" className="text-blue-500">
                Add Video Now
              </Link>
            </div>
          ) : (
            Object.values(watchLater).map((video) => (
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
                {windowWidth > 767 ? (
                  <LongVideoCard data={video} />
                ) : (
                  <VideoCard data={video} />
                )}
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default WatchLater;
