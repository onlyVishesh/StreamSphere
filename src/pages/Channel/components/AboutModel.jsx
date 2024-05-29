import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowTrendUp,
  faCircleInfo,
  faEarthAsia,
  faUsers,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  abbreviateNumber,
  aboutApi,
  formatDate,
} from "../../../utils/constants";

const AboutModel = ({ open, onClose, channelId }) => {
  const [aboutData, setAboutData] = useState([]);

  useEffect(() => {
    getAbout(channelId);
  }, [open]);

  const getAbout = async () => {
    const data = await fetch(aboutApi + channelId);
    const json = await data.json();
    setAboutData(json.items[0]);
    console.log(aboutData);
  };

  if (!open) return null;
  return ReactDOM.createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center  bg-black bg-opacity-50"
    >
      <div
        className="flex max-h-[40rem] max-w-xl flex-col gap-2 overflow-y-scroll rounded-lg bg-white p-5 px-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full justify-between text-xl">
          <div className="font-bold">About</div>
          <button
            onClick={onClose}
            className="flex items-center justify-center rounded-full p-2 hover:bg-slate-100"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div>{aboutData?.about?.description}</div>
        {aboutData?.about?.links !== undefined &&
          aboutData.about.links.length > 0 && (
            <div>
              <div className="text-xl font-bold">Links</div>
              <div className="my-4 flex flex-col gap-3">
                {aboutData?.about?.links.map((link) => (
                  <li className="flex items-center gap-3" key={link.title}>
                    <img
                      src={link?.favicon[4]?.url}
                      alt=""
                      className="h-6 w-6"
                    />
                    <div className="flex flex-col text-sm">
                      <div>{link?.title}</div>
                      <a
                        href={link?.url}
                        target="_blank"
                        className="text-blue-600"
                      >
                        {link.title}
                      </a>
                    </div>
                  </li>
                ))}
              </div>
            </div>
          )}

        <div>
          <div className="text-xl font-bold">Channel details</div>
          <div className="my-3 flex flex-col gap-4">
            <li className="flex items-center gap-4">
              <FontAwesomeIcon icon={faUsers} className="text-xl" />
              <div className="flex flex-col">
                {abbreviateNumber(aboutData?.about?.stats?.subscriberCount)}{" "}
                subscribers
              </div>
            </li>
            <li className="flex items-center gap-4">
              <FontAwesomeIcon icon={faYoutube} className="text-xl" />
              <div className="flex flex-col ">
                {abbreviateNumber(aboutData?.about?.stats?.videoCount)} Videos
              </div>
            </li>
            <li className="flex items-center gap-4">
              <FontAwesomeIcon icon={faArrowTrendUp} className="text-xl" />
              <div className="flex flex-col">
                {abbreviateNumber(aboutData?.about?.stats?.viewCount)} Views
              </div>
            </li>
            <li className="flex items-center gap-4">
              <FontAwesomeIcon icon={faCircleInfo} className="text-xl" />
              <div className="flex flex-col">
                Joined {formatDate(aboutData?.about?.stats?.joinedDate)}
              </div>
            </li>
            <li className="flex items-center gap-4">
              <FontAwesomeIcon icon={faEarthAsia} className="text-xl" />
              <div className="flex flex-col">
                {aboutData?.about?.details?.location}
              </div>
            </li>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default AboutModel;
