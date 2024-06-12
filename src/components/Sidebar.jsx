import {
  faBagShopping,
  faCircleQuestion,
  faClock,
  faClockRotateLeft,
  faFaceLaughSquint,
  faFilm,
  faFire,
  faFlag,
  faGamepad,
  faGear,
  faHouse,
  faMessage,
  faMusic,
  faNewspaper,
  faThumbsUp,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import youtube from "../assets/StreamSphere.svg";
import subscription from "../assets/subscription.svg";
import kids from "../assets/ytKids.svg";
import music from "../assets/ytMusic.svg";
import studios from "../assets/ytStudios.svg";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const subscriptions = useSelector((store) => store.subscriptions);

  return !isMenuOpen ? (
    <div className=" fixed h-[95vh] w-14 bg-white px-1 py-4 text-[8px] text-slate-700 sm:w-20 sm:text-[10px]">
      <div className="">
        <ul className="flex flex-col gap-1 sm:gap-5">
          <Link
            to="/"
            className="flex w-full flex-col items-center justify-center gap-2 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200"
          >
            <FontAwesomeIcon
              icon={faHouse}
              className="size-4 text-black sm:size-6"
            />
            Home
          </Link>
          <Link to="/subscriptions">
            <li className="flex w-full flex-col items-center justify-center gap-2 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200">
              <img
                src={subscription}
                alt="subscription"
                className="size-4 text-black sm:size-6"
              />
              Subscriptions
            </li>
          </Link>
          <Link to="history">
            <li className="flex w-full flex-col items-center justify-center gap-2 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200">
              <FontAwesomeIcon
                icon={faClockRotateLeft}
                className="size-4 text-black sm:size-6"
              />
              History
            </li>
          </Link>
        </ul>
      </div>
    </div>
  ) : (
    <div className="fixed z-50 h-[95vh] w-full bg-black bg-opacity-40 lg:w-60">
      <div className="flex h-[95vh] w-60 flex-col flex-nowrap gap-5 overflow-y-hidden bg-white px-3 py-2 text-base text-slate-700 hover:overflow-y-scroll lg:fixed">
        <div className="">
          <ul>
            <Link
              to="/"
              className="flex w-full items-center gap-5 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200"
            >
              <FontAwesomeIcon icon={faHouse} className="size-6 text-black" />
              Home
            </Link>
            <Link to="/subscriptions">
              <li className="flex w-full items-center gap-5 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200">
                <img
                  src={subscription}
                  alt="subscription"
                  className="size-6 text-black"
                />
                Subscriptions
              </li>
            </Link>
          </ul>
        </div>
        <hr />
        <div className="">
          <h2 className="-mt-1 flex w-full items-center rounded-lg px-2 py-2 font-medium text-opacity-90 hover:cursor-pointer hover:bg-slate-200">
            You
          </h2>
          <ul>
            <Link to="history">
              <li className="flex w-full items-center gap-5 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200">
                <FontAwesomeIcon
                  icon={faClockRotateLeft}
                  className="size-6 text-black"
                />
                History
              </li>
            </Link>
            <Link to="/watchLater">
              <li className="flex w-full items-center gap-5 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200">
                <FontAwesomeIcon icon={faClock} className="size-6 text-black" />
                Watch later
              </li>
            </Link>
            <Link to="/liked">
              <li className="flex w-full items-center gap-5 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200">
                <FontAwesomeIcon
                  icon={faThumbsUp}
                  className="size-6 text-black"
                />
                Liked Videos
              </li>
            </Link>
          </ul>
        </div>
        <hr />
        {Object.keys(subscriptions).length !== 0 && (
          <>
            <div className="">
              <h2 className="-mt-1 flex w-full items-center rounded-lg px-2 py-2 font-medium text-opacity-90 hover:cursor-pointer hover:bg-slate-200">
                Subscriptions
              </h2>
              <ul className="max-h-60 overflow-y-hidden hover:overflow-y-scroll">
                {Object.values(subscriptions).map((subscription) => (
                  <Link
                    to={`/channel?c=${subscription.id}`}
                    key={subscription.id}
                  >
                    <li className="flex w-full items-center gap-5 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200">
                      <img
                        src={subscription?.snippet?.thumbnails.default.url}
                        alt={subscription?.snippet?.title}
                        className="size-6 rounded-full"
                      />
                      <span className="line-clamp-1">
                        {subscription?.snippet?.title}
                      </span>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
            <hr />
          </>
        )}

        <div className="">
          <h2 className="px-2 pb-2 font-medium text-opacity-90 ">Explore</h2>
          <ul>
            <Link to="trending">
              <li className="flex w-full items-center gap-5 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200">
                <FontAwesomeIcon icon={faFire} className="size-6 text-black" />
                Trending
              </li>
            </Link>
            <Link to="entertainment">
              <li className="flex w-full items-center gap-5 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200">
                <FontAwesomeIcon
                  icon={faBagShopping}
                  className="size-6 text-black"
                />
                Entertainment
              </li>
            </Link>
            <Link to="music">
              <li className="flex w-full items-center gap-5 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200">
                <FontAwesomeIcon icon={faMusic} className="size-6 text-black" />
                Music
              </li>
            </Link>
            <Link to="films">
              <li className="flex w-full items-center gap-5 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200">
                <FontAwesomeIcon icon={faFilm} className="size-6 text-black" />
                Films
              </li>
            </Link>
            <Link to="gaming">
              <li className="flex w-full items-center gap-5 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200">
                <FontAwesomeIcon
                  icon={faGamepad}
                  className="size-6 text-black"
                />
                Gaming
              </li>
            </Link>
            <Link to="news">
              <li className="flex w-full items-center gap-5 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200">
                <FontAwesomeIcon
                  icon={faNewspaper}
                  className="size-6 text-black"
                />
                News
              </li>
            </Link>
            <Link to="sports">
              <li className="flex w-full items-center gap-5 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200">
                <FontAwesomeIcon
                  icon={faTrophy}
                  className="size-6 text-black"
                />
                Sport
              </li>
            </Link>
            <Link to="comedy">
              <li className="flex w-full items-center gap-5 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200">
                <FontAwesomeIcon
                  icon={faFaceLaughSquint}
                  className="size-6 text-black"
                />
                Comedy
              </li>
            </Link>
          </ul>
          <hr />
        </div>
        <div className="">
          <h2 className="px-2 pb-2 font-medium text-opacity-90 ">
            More from YouTube
          </h2>
          <ul>
            <a
              href="https://www.youtube.com/premium"
              target="_blank"
              rel="noopener noreferrer"
            >
              <li className="flex w-full items-center gap-5 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200">
                <img src={youtube} alt="shorts" className="size-6" />
                YouTube Premium
              </li>
            </a>
            <a
              href="https://studio.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <li className="flex w-full items-center gap-5 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200">
                <img src={studios} alt="studios" className="size-6" />
                YouTube Studio
              </li>
            </a>
            <a
              href="https://music.youtube.com/browse/FEmusic_language_selection "
              target="_blank"
              rel="noopener noreferrer"
            >
              <li className="flex w-full items-center gap-5 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200">
                <img src={music} alt="music" className="size-6" />
                YouTube Music
              </li>
            </a>

            <a
              href="https://www.youtubekids.com/?source=youtube_web"
              target="_blank"
              rel="noopener noreferrer"
            >
              <li className="flex w-full items-center gap-5 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200">
                <img src={kids} alt="kids" className="size-6" />
                YouTube Kids
              </li>
            </a>
          </ul>
        </div>
        <hr />
        <div className="">
          <ul>
            <a
              href="https://www.youtube.com/account"
              target="_blank"
              rel="noopener noreferrer"
            >
              <li className="flex w-full items-center gap-5 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200">
                <FontAwesomeIcon icon={faGear} />
                Setting
              </li>
            </a>
            <a
              href="https://www.youtube.com/reporthistory"
              target="_blank"
              rel="noopener noreferrer"
            >
              <li className="flex w-full items-center gap-5 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200">
                <FontAwesomeIcon icon={faFlag} />
                Report history
              </li>
            </a>
            <a
              href="https://www.youtubekids.com/?source=youtube_web"
              target="_blank"
              rel="noopener noreferrer"
            >
              <li className="flex w-full items-center gap-5 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200">
                <FontAwesomeIcon icon={faCircleQuestion} />
                Help
              </li>
            </a>
            <a
              href="https://www.youtubekids.com/?source=youtube_web"
              target="_blank"
              rel="noopener noreferrer"
            >
              <li className="flex w-full items-center gap-5 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200">
                <FontAwesomeIcon icon={faMessage} />
                Send feedback
              </li>
            </a>
          </ul>
        </div>
        <hr />
        <div className="m-2.5 flex flex-col gap-3 text-xs">
          <ul className="flex flex-wrap gap-1">
            <a
              href="https://www.youtube.com/about/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <li className="hover:cursor-pointer">About</li>
            </a>
            <a
              href="https://www.youtube.com/about/press/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <li className="hover:cursor-pointer">Press</li>
            </a>
            <a
              href="https://www.youtube.com/about/copyright/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <li className="hover:cursor-pointer">Copyright</li>
            </a>
            <a
              href="https://www.youtube.com/t/contact_us/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <li className="hover:cursor-pointer">Contact us</li>
            </a>
            <a
              href="https://www.youtube.com/creators/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <li className="hover:cursor-pointer">Creator</li>
            </a>
            <a
              href="https://www.youtube.com/ads/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <li className="hover:cursor-pointer">Advertise</li>
            </a>
            <a
              href="https://developers.google.com/youtube"
              target="_blank"
              rel="noopener noreferrer"
            >
              <li className="hover:cursor-pointer">Developers</li>
            </a>
          </ul>
          <ul className="flex flex-wrap gap-1">
            <a
              href="https://www.youtube.com/t/terms"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <li className="hover:cursor-pointer">Terms</li>
            </a>
            <a
              href="https://www.youtube.com/t/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <li className="hover:cursor-pointer">Privacy</li>
            </a>
            <a
              href="https://www.youtube.com/about/policies/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <li className="hover:cursor-pointer">Policy & Safety</li>
            </a>
            <a
              href="https://www.youtube.com/howyoutubeworks?utm_campaign=ytgen&utm_source=ythp&utm_medium=LeftNav&utm_content=txt&u=https%3A%2F%2Fwww.youtube.com%2Fhowyoutubeworks%3Futm_source%3Dythp%26utm_medium%3DLeftNav%26utm_campaign%3Dytgen"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <li className="hover:cursor-pointer">How YouTube works</li>
            </a>
            <a
              href="https://www.youtube.com/new"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <li className="hover:cursor-pointer">Test new features</li>
            </a>
          </ul>
          <div className="">{new Date().getFullYear()} Google LLC</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
