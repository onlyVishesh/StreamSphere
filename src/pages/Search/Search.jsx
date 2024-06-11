import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Channel from "../../components/Channel";
import LongVideoCard from "../../components/LongVideoCard";
import LongVideoCardShimmer from "../../components/LongVideoCardShimmer";
import VideoCardShimmer from "../../components/VideoCardShimmer";
import { searchApi } from "../../utils/constants";
import VideoCard from "../../components/VideoCard";

const Search = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("q");
  const [data, setData] = useState([]);
  const [pageToken, setPageToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [noVideos, setNoVideos] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setData([]);
    setPageToken(null);
    setNoVideos(false);
    getData();
  }, [search]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        getData(pageToken);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pageToken]);

  const getData = async (token) => {
    if (loading || pageToken === undefined) return;

    setLoading(true);
    try {
      let url = searchApi(search);
      if (token) {
        url += `&pageToken=${token}`;
      }
      const response = await fetch(url);
      const json = await response.json();

      if (!json.items || json.items.length === 0) {
        setNoVideos(true);
        setLoading(false);
        return;
      }

      setData((prevData) => {
        const uniqueVideos = json.items.filter((item) => {
          return !prevData.some((prevVideo) => prevVideo.id === item.id);
        });
        return [...prevData, ...uniqueVideos];
      });

      setPageToken(json.nextPageToken);
      setNoVideos(false);
    } catch (error) {
      console.error("Failed to load videos", error);
    } finally {
      setLoading(false);
    }
  };
  if (noVideos) {
    return (
      <div className="mt-20 flex w-full justify-center text-3xl">
        No videos available
      </div>
    );
  }

  if (data.length === 0 && loading) {
    return (
      <div className="mt-2 flex w-full justify-center md:mt-10">
        <div className="w-11/12 md:w-10/12 lg:w-3/4">
          <div className="mt-5 flex flex-wrap justify-center gap-2  md:justify-start md:gap-5">
            {new Array(20)
              .fill(0)
              .map((_, index) =>
                windowWidth > 767 ? (
                  <LongVideoCardShimmer key={index} />
                ) : (
                  <VideoCardShimmer key={index} />
                ),
              )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-2 flex w-full justify-center md:mt-10">
      <div className="w-11/12 md:w-10/12 lg:w-3/4">
        <div className="mt-5 flex flex-wrap justify-center gap-2  md:justify-start md:gap-5">
          {data.map((item) => {
            return (
              <>
                {item.id.kind === "youtube#video" && (
                  <Link
                    to={`/watch?v=${item.id.videoId}`}
                    key={item.id.videoId}
                  >
                    {windowWidth > 767 ? (
                      <LongVideoCard data={item} />
                    ) : (
                      <VideoCard data={item} />
                    )}
                  </Link>
                )}
                {item.id.kind === "youtube#channel" && (
                  <Link
                    to={`/channel?c=${item.id.channelId}`}
                    key={item.id.channelId}
                  >
                    <Channel channelData={item} />
                  </Link>
                )}
              </>
            );
          })}
          {new Array(5).fill(0).map((_, index) => (
            <LongVideoCardShimmer key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
