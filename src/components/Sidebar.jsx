import {
  faBagShopping,
  faCircleQuestion,
  faCircleUser,
  faClock,
  faClockRotateLeft,
  faFilm,
  faFire,
  faFlag,
  faGamepad,
  faGear,
  faHouse,
  faLightbulb,
  faMessage,
  faMusic,
  faNewspaper,
  faPodcast,
  faSatelliteDish,
  faShirt,
  faThumbsUp,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import shorts from "../assets/shorts.svg";
import subscription from "../assets/subscription.svg";
import youtube from "../assets/youtube.svg";
import kids from "../assets/ytKids.svg";
import music from "../assets/ytMusic.svg";
import studios from "../assets/ytStudios.svg";

import { useSelector } from "react-redux";

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  return !isMenuOpen ? (
    <div className="fixed h-[95vh] w-14 bg-white px-1 py-4 text-[8px] text-slate-700 sm:w-20 sm:text-[10px]">
      <div className="">
        <ul className="flex flex-col gap-1 sm:gap-5">
          <li className="flex w-full flex-col items-center justify-center gap-2 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200">
            <FontAwesomeIcon
              icon={faHouse}
              className="size-4 text-black sm:size-6"
            />
            Home
          </li>
          <li className="flex w-full flex-col items-center justify-center gap-2 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200">
            <img src={shorts} alt="shorts" className="size-4 sm:size-6" />
            Shorts
          </li>
          <li className="flex w-full flex-col items-center justify-center gap-2 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200">
            <img
              src={subscription}
              alt="subscription"
              className="size-4 text-black sm:size-6"
            />
            Subscriptions
          </li>
          <li className="flex w-full flex-col items-center justify-center gap-2 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200">
            <FontAwesomeIcon
              icon={faCircleUser}
              className="size-4 text-black sm:size-6"
            />
            You
          </li>
        </ul>
      </div>
    </div>
  ) : (
    <div className="fixed h-[95vh] w-full bg-black bg-opacity-40 lg:bg-opacity-0">
      <div className="flex h-[95vh] w-60 flex-col flex-nowrap gap-5 overflow-y-hidden bg-white px-3 py-2 text-base text-slate-700 hover:overflow-y-scroll lg:fixed">
        <div className="">
          <ul>
            <li className="flex w-full items-center gap-5 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200">
              <FontAwesomeIcon icon={faHouse} className="size-6 text-black" />
              Home
            </li>
            <li className="flex w-full items-center gap-5 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200">
              <img src={shorts} alt="shorts" className="size-6" />
              Shorts
            </li>
            <li className="flex w-full items-center gap-5 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200">
              {" "}
              <img
                src={subscription}
                alt="subscription"
                className="size-6 text-black"
              />
              Subscriptions
            </li>
          </ul>
        </div>
        <hr />
        <div className="">
          <h2 className="-mt-1 flex w-full items-center rounded-lg px-2 py-2 font-medium text-opacity-90 hover:cursor-pointer hover:bg-slate-200">
            You
          </h2>
          <ul>
            <li className="flex w-full items-center gap-5 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200">
              <FontAwesomeIcon
                icon={faCircleUser}
                className="size-6 text-black"
              />
              Your channel
            </li>
            <li className="flex w-full items-center gap-5 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200">
              <FontAwesomeIcon
                icon={faClockRotateLeft}
                className="size-6 text-black"
              />
              History
            </li>
            <li className="flex w-full items-center gap-5 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200">
              <FontAwesomeIcon icon={faClock} className="size-6 text-black" />
              Watch later
            </li>
            <li className="flex w-full items-center gap-5 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200">
              <FontAwesomeIcon
                icon={faThumbsUp}
                className="size-6 text-black"
              />
              Liked Videos
            </li>
          </ul>
        </div>
        <hr />

        <div className="">
          <h2 className="px-2 pb-2 font-medium text-opacity-90 ">Explore</h2>
          <ul>
            <li className="flex w-full items-center gap-5 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200">
              <FontAwesomeIcon icon={faFire} className="size-6 text-black" />
              Trading
            </li>

            <li className="flex w-full items-center gap-5 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200">
              <FontAwesomeIcon
                icon={faBagShopping}
                className="size-6 text-black"
              />
              Shopping
            </li>
            <li className="flex w-full items-center gap-5 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200">
              <FontAwesomeIcon icon={faMusic} className="size-6 text-black" />
              Music
            </li>
            <li className="flex w-full items-center gap-5 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200">
              <FontAwesomeIcon icon={faFilm} className="size-6 text-black" />{" "}
              Films
            </li>
            <li className="flex w-full items-center gap-5 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200">
              <FontAwesomeIcon
                icon={faSatelliteDish}
                className="size-6 text-black"
              />
              Live
            </li>
            <li className="flex w-full items-center gap-5 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200">
              <FontAwesomeIcon icon={faGamepad} className="size-6 text-black" />
              Gaming
            </li>
            <li className="flex w-full items-center gap-5 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200">
              <FontAwesomeIcon
                icon={faNewspaper}
                className="size-6 text-black"
              />
              News
            </li>
            <li className="flex w-full items-center gap-5 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200">
              <FontAwesomeIcon icon={faTrophy} className="size-6 text-black" />
              Sport
            </li>
            <li className="flex w-full items-center gap-5 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200">
              <FontAwesomeIcon
                icon={faLightbulb}
                className="size-6 text-black"
              />
              Courses
            </li>
            <li className="flex w-full items-center gap-5 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200">
              <FontAwesomeIcon icon={faShirt} className="size-6 text-black" />
              Fashion & beauty
            </li>
            <li className="flex w-full items-center gap-5 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200">
              <FontAwesomeIcon icon={faPodcast} className="size-6 text-black" />
              Podcasts
            </li>
          </ul>
          <hr />
        </div>
        <div className="">
          <h2 className="px-2 pb-2 font-medium text-opacity-90 ">
            More from YouTube
          </h2>
          <ul>
            <li className="flex w-full items-center gap-5 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200">
              <img src={youtube} alt="shorts" className="size-6" />
              YouTube Premium
            </li>
            <li className="flex w-full items-center gap-5 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200">
              <img src={studios} alt="studios" className="size-6" />
              YouTube Studio
            </li>
            <li className="flex w-full items-center gap-5 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200">
              <img src={music} alt="music" className="size-6" />
              YouTube Music
            </li>
            <li className="flex w-full items-center gap-5 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200">
              <img src={kids} alt="kids" className="size-6" />
              YouTube Kids
            </li>
          </ul>
        </div>
        <hr />
        <div className="">
          <ul>
            <li className="hover:cursor-pointerhover:bg-slate-200 flex w-full items-center gap-5 rounded-lg px-2 py-2">
              <FontAwesomeIcon icon={faGear} />
              Setting
            </li>
            <li className="flex w-full items-center gap-5 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200">
              <FontAwesomeIcon icon={faFlag} />
              Report history
            </li>
            <li className="flex w-full items-center gap-5 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200">
              <FontAwesomeIcon icon={faCircleQuestion} />
              Help
            </li>
            <li className="flex w-full items-center gap-5 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-slate-200">
              <FontAwesomeIcon icon={faMessage} />
              Send feedback
            </li>
          </ul>
        </div>
        <hr />
        <div className="m-2.5 flex flex-col gap-3 text-xs">
          <ul className="flex flex-wrap gap-1">
            <li className="hover:cursor-pointer">About</li>
            <li className="hover:cursor-pointer">Press</li>
            <li className="hover:cursor-pointer">Copyright</li>
            <li className="hover:cursor-pointer">Contact us</li>
            <li className="hover:cursor-pointer">Creator</li>
            <li className="hover:cursor-pointer">Advertise</li>
            <li className="hover:cursor-pointer">Developers</li>
          </ul>
          <ul className="flex flex-wrap gap-1">
            <li className="hover:cursor-pointer">Terms</li>
            <li className="hover:cursor-pointer">Privacy</li>
            <li className="hover:cursor-pointer">Policy & Safety</li>
            <li className="hover:cursor-pointer">How YouTube works</li>
            <li className="hover:cursor-pointer">Test new features</li>
          </ul>
          <div className="">{new Date().getFullYear()} Google LLC</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
