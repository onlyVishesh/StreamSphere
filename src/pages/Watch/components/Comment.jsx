import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { abbreviateNumber, timeSince } from "../../../utils/constants";

export const Comment = (comment) => {
  const commentData = comment.comment;
  return (
    <>
      <div className="group m-2 flex w-full gap-3">
        <div className="w-10">
          <img
            src={commentData?.authorProfileImageUrl.toString()}
            alt={commentData?.authorDisplayName}
            className="rounded-full"
          />
        </div>
        <div className="flex w-full flex-col gap-1">
          <div className="flex gap-2">
            <div className="text-xs font-semibold">
              {commentData?.authorDisplayName}
            </div>
            <div className="text-xs">
              {timeSince(new Date(commentData?.updatedAt))}
              {commentData?.updatedAt !== commentData?.publishedAt
                ? " (edited)"
                : ""}
            </div>
          </div>
          <div className="text-md">{commentData?.textDisplay}</div>
          <div>
            <div className="flex items-center gap-2">
              <div className="rounded-full px-2 py-0.5 hover:bg-gray-200 ">
                <FontAwesomeIcon icon={faThumbsUp} />{" "}
                {abbreviateNumber(commentData?.likeCount)}
              </div>
              <div className="rounded-full px-1 py-0.5 hover:bg-gray-200 ">
                <FontAwesomeIcon icon={faThumbsDown} />
              </div>
              <div className="rounded-full px-2 py-0.5 hover:bg-gray-200 ">
                Reply
              </div>
            </div>
          </div>
        </div>
        <div className="invisible w-5 hover:cursor-pointer group-hover:visible">
          &#8942;
        </div>
      </div>
    </>
  );
};
