import { useSelector } from "react-redux";
import { key } from "./apiSlice";

const UseApiKey = () => {
  const userApiKey = useSelector(key);
  return userApiKey || import.meta.env.VITE_YOUTUBE_API;
};

export default UseApiKey;
