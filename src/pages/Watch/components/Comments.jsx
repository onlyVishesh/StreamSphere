import { useEffect, useState } from "react";
import { abbreviateNumber, commentsApi } from "../../../utils/constants";
import { Comment } from "./Comment";

const Comments = ({ data }) => {
  console.log(data);
  const [VideoId, noOfComments = 0] = data;
  const [comments, setComments] = useState([]);
  const [pageToken, setPageToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    getComments(VideoId, pageToken);
  }, []);

  useEffect(() => {
    if (comments.length > 0) {
      const handleScroll = () => {
        if (
          window.innerHeight + window.scrollY >=
            document.body.offsetHeight - 100 &&
          !loading
        ) {
          getComments(VideoId, pageToken);
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [pageToken, loading]);

  const getComments = async (VideoId, token) => {
    setLoading(true);
    try {
      let url = commentsApi(VideoId);
      if (token) {
        url += `&pageToken=${token}`;
      }
      const data = await fetch(url);
      const json = await data.json();
      if (json.items === undefined) {
        setHidden(true);
        return;
      }
      setComments((prevComments) => [...prevComments, ...json.items]);
      setPageToken(json.nextPageToken);
    } catch (comments) {
      return <>Comments are hidden</>;
    } finally {
      setLoading(false);
    }
  };
  if (hidden)
    return (
      <div className="flex justify-center p-4 text-sm">
        Comments Are Turn Off
      </div>
    );

  return (
    <div>
      <div className="py-3 text-lg font-semibold">
        {abbreviateNumber(noOfComments)} Comments
      </div>
      <div className="flex flex-col gap-3">
        {comments?.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
        {loading && <div>Loading more comments...</div>}
      </div>
    </div>
  );
};

export default Comments;
