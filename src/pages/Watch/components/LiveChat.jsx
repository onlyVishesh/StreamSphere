import { faArrowTurnUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import coolImages from "cool-images";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sentence } from "txtgen";
import {
  adjectives,
  animals,
  colors,
  uniqueNamesGenerator,
} from "unique-names-generator";
import { addMessage } from "../../../utils/chatSlice";
import ChatMessage from "../components/ChatMessage";

const LiveChat = () => {
  const [liveMessage, setLiveMessage] = useState("");
  const dispatch = useDispatch();
  const chatMessages = useSelector((store) => store.chat.messages);
  const [userName] = useState(
    uniqueNamesGenerator({
      dictionaries: [adjectives, animals, colors],
      separator: " ",
      length: Math.floor(Math.random() * 3) + 1,
    }),
  );
  const [userIcon] = useState(coolImages.one(50, 50));

  useEffect(() => {
    const timer = setInterval(
      () => {
        dispatch(
          addMessage({
            icon: coolImages.one(50, 50),
            name: uniqueNamesGenerator({
              dictionaries: [adjectives, animals, colors],
              separator: " ",
              length: Math.floor(Math.random() * 3) + 1,
            }),
            message: sentence(),
          }),
        );
      },
      Math.floor(Math.random() * 4 + 2) * 1000, // Interval between 2 to 5 seconds
    );

    return () => clearInterval(timer);
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (liveMessage.trim()) {
      dispatch(
        addMessage({
          icon: userIcon,
          name: userName,
          message: liveMessage,
        }),
      );
      setLiveMessage("");
    }
  };

  return (
    <div className="relative flex h-[45rem] w-[95%] flex-col gap-2 rounded-lg border-2 border-slate-100 bg-slate-50 lg:h-[38rem] xl:h-[45rem]">
      <div className=" border-b-2 bg-white px-4 py-2 text-lg lg:w-[30vw]">
        Top Chat
      </div>
      <div className="mb-10 flex flex-col-reverse overflow-y-scroll">
        {chatMessages.slice(-50).map(
          (
            message,
            index, // Display only the last 50 messages
          ) => (
            <ChatMessage
              icon={message.icon}
              name={message.name}
              message={message.message}
              key={index}
            />
          ),
        )}
      </div>
      <form
        onSubmit={handleSubmit}
        className="absolute bottom-0 flex w-full items-center justify-center gap-3 bg-white"
      >
        <input
          placeholder="Chat..."
          className="w-[22rem] rounded-full bg-slate-100 px-2 py-1"
          value={liveMessage}
          onChange={(e) => setLiveMessage(e.target.value)}
        />
        <button
          type="submit"
          className="flex h-8 w-8 items-center justify-center rounded-full p-2 hover:bg-slate-200"
        >
          <FontAwesomeIcon icon={faArrowTurnUp} />
        </button>
      </form>
    </div>
  );
};

export default LiveChat;
