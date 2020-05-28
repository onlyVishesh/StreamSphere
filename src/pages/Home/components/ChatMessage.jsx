const ChatMessage = ({ icon, name, message }) => {
  return (
    <div className="flex gap-2 px-4">
      <img src={icon} alt="test" className="h-6 w-6 rounded-full" />
      <div className="flex">
        <div>
          <span className="font-semibold">{name}</span>{" "}
          <span className="text-sm">{message}</span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
