import {
  faAngleDown,
  faAngleUp,
  faArrowsTurnRight,
  faArrowTurnUp,
  faArrowUpWideShort,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import {
  abbreviateNumber,
  commentsApi,
  replyApi,
} from "../../../utils/constants";
import { Comment } from "./Comment";

const Comments = ({ data }) => {
  const [VideoId, noOfComments = 0] = data;
  const [comments, setComments] = useState([]);
  const [pageToken, setPageToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [sortOrder, setSortOrder] = useState("relevance");
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const sortRef = useRef(null);

  useEffect(() => {
    setComments([]);
    setPageToken(null);
    setHidden(false);
    getComments(VideoId, sortOrder, null);
  }, [sortOrder]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setShowSortOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sortRef]);

  useEffect(() => {
    if (comments.length > 0) {
      const handleScroll = () => {
        if (
          window.innerHeight + window.scrollY >=
            document.body.offsetHeight - 100 &&
          !loading
        ) {
          getComments(VideoId, sortOrder, pageToken);
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [pageToken, loading, comments, sortOrder]);

  const getComments = async (VideoId, sortOrder, token) => {
    setLoading(true);
    try {
      let url = commentsApi(VideoId) + `&order=${sortOrder}`;
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
      setShowLoadMore(!!json.nextPageToken);
    } catch (comments) {
      return <>Comments are hidden</>;
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    setShowSortOptions(false);
  };

  const loadMoreReplies = async (commentId, token) => {
    try {
      let url = replyApi(commentId);
      if (token) {
        url += `&pageToken=${token}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setComments((prevComments) => {
        return prevComments.map((comment) => {
          if (comment.id === commentId) {
            const updatedReplies = comment.replies
              ? [...comment.replies.items, ...data.items]
              : data.items;
            return { ...comment, replies: { ...data, items: updatedReplies } };
          }
          return comment;
        });
      });
    } catch (error) {
      console.error("Error loading replies:", error);
    }
  };

  const toggleRepliesVisibility = (commentId) => {
    const commentIndex = comments.findIndex(
      (comment) => comment.id === commentId,
    );
    if (commentIndex !== -1) {
      const updatedComments = [...comments];
      updatedComments[commentIndex].showReplies =
        !updatedComments[commentIndex].showReplies;
      setComments(updatedComments);
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
      <div className="flex items-center gap-14">
        <div className="py-3 text-lg font-semibold">
          {abbreviateNumber(noOfComments)} Comments
        </div>
        <div
          className="relative flex cursor-pointer items-center gap-1 text-lg"
          onClick={() => setShowSortOptions(!showSortOptions)}
          ref={sortRef}
        >
          <FontAwesomeIcon icon={faArrowUpWideShort} />
          Sort
          {showSortOptions && (
            <div className="absolute mt-2 flex flex-col gap-1 rounded-lg border bg-white shadow-lg">
              <div
                className={`cursor-pointer text-nowrap p-2 hover:bg-gray-200 ${
                  sortOrder === "relevance" ? "bg-gray-300" : ""
                }`}
                onClick={() => handleSortChange("relevance")}
              >
                Top comments
              </div>
              <div
                className={`cursor-pointer p-2  hover:bg-gray-200 ${
                  sortOrder === "time" ? "bg-gray-300" : ""
                }`}
                onClick={() => handleSortChange("time")}
              >
                Newest first
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {comments?.map((comment) => (
          <div key={comment.id}>
            <Comment comment={comment?.snippet?.topLevelComment?.snippet} />
            {comment?.snippet?.totalReplyCount !== 0 && (
              <>
                <button
                  onClick={() => {
                    loadMoreReplies(comment.id);
                    toggleRepliesVisibility(comment.id);
                  }}
                >
                  <div className="ml-16 flex items-center gap-2 rounded-full px-2 py-1 font-[500] text-blue-700 hover:bg-gray-200">
                    <FontAwesomeIcon
                      icon={comment.showReplies ? faAngleUp : faAngleDown}
                    />
                    {comment?.snippet?.totalReplyCount} Replies
                  </div>
                </button>
                <div>
                  {comment.showReplies && comment.replies && (
                    <div className="ml-12">
                      {comment?.replies?.items.map((reply) => (
                        <div key={reply.id}>
                          <Comment comment={reply?.snippet} />
                        </div>
                      ))}
                      {showLoadMore && comment.replies.nextPageToken && (
                        <button
                          onClick={() => {
                            loadMoreReplies(
                              comment.id,
                              comment.replies.nextPageToken,
                            );
                          }}
                          className="ml-4 flex items-center gap-2 rounded-full px-2 py-1 font-[500] text-blue-700 hover:bg-gray-200"
                        >
                          <FontAwesomeIcon
                            icon={faArrowTurnUp}
                            className="rotate-90"
                          />
                          Load More Replies
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
        {loading && <div>Loading more comments...</div>}
        {!showLoadMore && <div>No more replies to load</div>}
      </div>
    </div>
  );
};

export default Comments;
