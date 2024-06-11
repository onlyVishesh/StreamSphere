import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LongVideoCard from "../../components/LongVideoCard";
import {
  addHistory,
  clearHistory,
  removeHistory,
} from "../../utils/historySlice";
import { useEffect, useState } from "react";
import VideoCard from "../../components/VideoCard";

const History = () => {
  const dispatch = useDispatch();
  const history = useSelector((store) => store.history);
  const isEmpty = Object.keys(history).length === 0;
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
        <div className="flex items-center justify-between gap-3 font-bold">
          <div className="flex items-center gap-3 font-bold">
            <img
              alt=""
              src="https://www.youtube.com/img/trending/avatar/trending.png"
              className="w-8 rounded-full sm:w-12 md:w-16"
            />
            <span className="sm:2xl text-xl md:text-4xl">History</span>
          </div>
          <div
            onClick={() => {
              dispatch(clearHistory());
            }}
            className="text-blue-500 hover:cursor-pointer"
          >
            Clear History
          </div>
        </div>
        <div className="mt-5 flex flex-wrap justify-center gap-5 md:justify-start">
          {isEmpty ? (
            <div className="text-xl">
              No History Available.{" "}
              <Link to="/" className="text-blue-500">
                Watch Now
              </Link>
            </div>
          ) : (
            Object.values(history).map((video) => (
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

export default History;
