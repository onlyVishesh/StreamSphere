import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { closeMenu } from "../../utils/appSlice";

const Watch = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");

  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeMenu());
  }, []);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const marginLeft =
    isMenuOpen && windowWidth > 1023
      ? "15rem"
      : windowWidth < 640
        ? "3rem"
        : "5rem";

  return (
    <div className={`flex flex-col overflow-hidden`} style={{ marginLeft }}>
      <div className="m-5">
        <iframe
          className="rounded-xl"
          width="1280"
          height="720"
          src={"https://www.youtube.com/embed/" + videoId}
          title="LEAVING FOR TOKYO! Solo in Japan Ep.11"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Watch;
