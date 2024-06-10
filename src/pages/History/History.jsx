import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LongVideoCard from "../../components/LongVideoCard";
import { addHistory, clearHistory, removeHistory } from "../../utils/historySlice";

const History = () => {
  const dispatch = useDispatch();
  const history = useSelector((store) => store.history);
  const isEmpty = Object.keys(history).length === 0;

  return (
    <div className="mt-10 flex w-full justify-center">
      <div className="w-3/4">
        <div className="flex justify-between">
          <div className="flex items-center gap-3 font-bold">
            <img
              alt=""
              src="https://www.youtube.com/img/trending/avatar/trending.png"
              className="w-16 rounded-full"
            />
            <span className="text-4xl">History</span>
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
        <div className="mt-5 flex flex-wrap justify-start gap-5">
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
                <LongVideoCard data={video} />
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
