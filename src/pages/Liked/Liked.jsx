import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LongVideoCard from "../../components/LongVideoCard";
import { addHistory, removeHistory } from "../../utils/historySlice";
import VideoCard from "../../components/VideoCard";

const Liked = () => {
  const liked = useSelector((store) => store.likeDislike.liked);
  const isEmpty = Object.keys(liked).length === 0;
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
          <span className="sm:2xl text-xl md:text-4xl">Liked Videos</span>
        </div>
        <div className="mt-5 flex flex-wrap justify-center gap-5 md:justify-start">
          {isEmpty ? (
            <div className="text-xl">
              You have not Liked any video.{" "}
              <Link to="/" className="text-blue-500">
                Like Video Now
              </Link>
            </div>
          ) : (
            Object.values(liked).map((video) => (
              <Link
                to={`/watch?v=${video.id}`}
                key={video.id}
                onClick={() => {
                  if (history[video[0].id]) {
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

export default Liked;
