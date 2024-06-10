import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Channel from "../../components/Channel";
import LongVideoCard from "../../components/LongVideoCard";
import LongVideoCardShimmer from "../../components/LongVideoCardShimmer";
import { searchApi } from "../../utils/constants";

const Search = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("q");
  const [data, setData] = useState([]);
  const [pageToken, setPageToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [noVideos, setNoVideos] = useState(false);

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
      <div className="ml-2 mt-20 flex flex-wrap justify-center gap-1">
        {new Array(20).fill(0).map((_, index) => (
          <LongVideoCardShimmer key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="mt-10 flex w-full justify-center">
      <div className="w-2/3">
        <div className="flex flex-col gap-4">
          {data.map((item) => {
            return (
              <>
                {item.id.kind === "youtube#video" && (
                  <Link
                    to={`/watch?v=${item.id.videoId}`}
                    key={item.id.videoId}
                  >
                    <LongVideoCard data={item} />
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
