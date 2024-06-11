import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { bannerApi, channelApi } from "../../utils/constants";
import ChannelInfo from "./components/ChannelInfo";
import Video from "./components/Videos";

const Channel = () => {
  const [searchParams] = useSearchParams();
  const channelId = searchParams.get("c");
  const [channelData, setChannelData] = useState([]);
  const [bannerUrl, setBannerUrl] = useState("");

  useEffect(() => {
    if (channelId) {
      getChannelData(channelId);
      getChannelBanner(channelId);
    }
  }, [channelId]);

  const getChannelData = async (channelId) => {
    try {
      const response = await fetch(channelApi(channelId));
      const json = await response.json();
      setChannelData(json.items);
    } catch (error) {
      console.error("Failed to fetch channel data:", error);
    }
  };

  const getChannelBanner = async (channelId) => {
    try {
      const response = await fetch(bannerApi(channelId));
      const json = await response.json();
      setBannerUrl(json.items[0].brandingSettings.image.bannerExternalUrl);
    } catch (error) {
      console.error("Failed to fetch channel banner:", error);
    }
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
