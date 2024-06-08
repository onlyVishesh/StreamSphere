import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { abbreviateNumber } from "../../utils/constants";
import { removeSubscription } from "../../utils/subscriptionsSlice";
import AboutModel from "../Channel/components/AboutModel";

const Subscriber = () => {
  const [openAbout, setOpenAbout] = useState(false);
  const subscriptions = useSelector((store) => store.subscriptions);
  const dispatch = useDispatch();

  return (
    <div className="mt-10 flex w-full justify-center">
      <div className=" w-3/4">
        <div className="flex items-center gap-3 font-bold">
          <img
            alt=""
            src="https://www.youtube.com/img/trending/avatar/trending.png"
            className="w-16 rounded-full"
          />
          <span className=" text-4xl">Yours subscriptions</span>
        </div>
        <div className="mt-10">
          {Object.keys(subscriptions).length === 0 ? (
            <div className="text-xl">
              You have not subscribed to any channel.{" "}
              <Link to="/" className="text-blue-500">
                Explore Now
              </Link>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-5">
                {Object.values(subscriptions).map((subscription) => (
                  <>
                    <Link
                      to={`/channel?c=${subscription.id}`}
                      key={subscription.id}
                    >
                      <div className="flex w-full items-center justify-center gap-0 ">
                        <div className="w-4/12 rounded-full">
                          <img
                            src={subscription?.snippet?.thumbnails?.medium?.url}
                            alt={subscription?.snippet?.title}
                            className="w-8/12 rounded-full"
                          />
                        </div>
                        <div className="flex w-full flex-col gap-2">
                          <div className="text-4xl font-bold ">
                            {subscription?.snippet?.title}
                          </div>
                          <div className="flex gap-2 text-sm text-slate-600">
                            <div>{subscription?.snippet?.customUrl}</div>&#8226;
                            <div>
                              {abbreviateNumber(
                                subscription?.statistics?.subscriberCount,
                              )}{" "}
                              subscribers
                            </div>
                            &#8226;
                            <div>
                              {abbreviateNumber(
                                subscription?.statistics?.videoCount,
                              )}{" "}
                              videos
                            </div>
                          </div>
                          <div className="w-5/6 text-slate-500">
                            <div className={"line-clamp-2"}>
                              {subscription?.snippet?.description}
                            </div>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                setOpenAbout(!openAbout);
                              }}
                              className="text-slate-700"
                            >
                              {openAbout ? "Less" : "More"}
                            </button>
                          </div>
                          <div className="flex gap-2">
                            <button
                              className={`focus:bg-gray-200" flex items-center justify-center rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-black hover:bg-gray-200 `}
                              onClick={(e) => {
                                e.preventDefault();
                                dispatch(removeSubscription(subscription.id));
                              }}
                            >
                              Subscribed
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <AboutModel
                      open={openAbout}
                      onClose={() => setOpenAbout(false)}
                      channelId={subscription.id}
                    />
                  </>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Subscriber;
