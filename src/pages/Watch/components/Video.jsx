const Video = (data) => {
  const [videoId, title] = data.data;
  return (
    <>
      <iframe
        className="aspect-video w-[82vw] rounded-xl lg:w-[60vw]"
        src={"https://www.youtube.com/embed/" + videoId}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </>
  );
};

export default Video;
