import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { bannerApi, channelApi } from "../../utils/constants";
import ChannelInfo from "./components/ChannelInfo";
import Video from "./components/Videos";

const Channel = () => {
  const [searchParams] = useSearchParams();
  const channelId = searchParams.get("c");
  const [channelData, setChannelData] = useState([]);
  const [bannerUrl, setBannerUrl] = useState([]);

  useEffect(() => {
    getChannelData(channelId);
  }, [channelData]);
  useEffect(() => {
    getChannelBanner(channelId);
  }, [bannerUrl]);

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

  return (
    <div>
      <ChannelInfo
        channelData={channelData}
        bannerUrl={bannerUrl}
        channelId={channelId}
      />
      <Video channelId={channelId} />
    </div>
  );
};

export default Channel;
