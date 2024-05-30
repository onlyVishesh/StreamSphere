import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { bannerApi, channelApi } from "../../utils/constants";
import ChannelInfo from "./components/ChannelInfo";
import Video from "./components/Videos";

const Channel = () => {
  const [searchParams] = useSearchParams();
  const channelId = searchParams.get("c");
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [channelData, setChannelData] = useState([]);
  const [bannerUrl, setBannerUrl] = useState([]);

  useEffect(() => {
    getChannelData(channelId);
  }, []);
  useEffect(() => {
    getChannelBanner(channelId);
  }, []);

  const getChannelData = async (channelId) => {
    const data = await fetch(channelApi(channelId));
    const json = await data.json();
    setChannelData(json.items);
  };
  const getChannelBanner = async () => {
    const data = await fetch(bannerApi(channelId));
    const json = await data.json();
    setBannerUrl(json.items[0].brandingSettings.image.bannerExternalUrl);
  };
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const marginLeft =
    isMenuOpen && windowWidth > 1023
      ? "15rem"
      : windowWidth < 640
        ? "3rem"
        : "5rem";

  return (
    <div className={`flex flex-col overflow-hidden`} style={{ marginLeft }}>
      <ChannelInfo
        channelData={channelData}
        bannerUrl={bannerUrl}
        channelId={channelId}
      />
      <Video channelId={channelId}/>
    </div>
  );
};

export default Channel;
