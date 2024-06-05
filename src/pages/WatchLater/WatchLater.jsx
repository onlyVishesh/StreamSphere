import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LongVideoCard from "../../components/LongVideoCard";

const WatchLater = () => {
  const watchLater = useSelector((store) => store.watchLater);
  const isEmpty = Object.keys(watchLater).length === 0;

  return (
    <div className="mt-10 flex w-full justify-center">
      <div className="w-3/4">
        <div className="flex items-center gap-3 font-bold">
          <img
            alt=""
            src="https://www.youtube.com/img/trending/avatar/trending.png"
            className="w-16 rounded-full"
          />
          <span className="text-4xl">Watch Later</span>
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
              <Link to={`/watch?v=${video.id}`} key={video.id}>
                <LongVideoCard data={video} />
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default WatchLater;
