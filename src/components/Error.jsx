import { useDispatch, useSelector } from "react-redux";
import { toggleApiRequest } from "../utils/openApiRequestSlice";
import ApiRequest from "./ApiRequest";
import { useEffect, useState } from "react";
import { apiKey, ytApi } from "../utils/constants";

const Error = () => {
  const userApiKey = useSelector((store) => store.api.apiKey);
  const dispatch = useDispatch();
  const [response, setResponse] = useState("");
  useEffect(() => {
    getResponseCode();
  }, [userApiKey]);
  const getResponseCode = async () => {
    console.log(userApiKey);
    const response = await fetch(ytApi(userApiKey));
    const data = await response.json();
    setResponse(data?.error?.code);
  };
  return (
    <>
      <div className="flex flex-col-reverse items-center justify-center gap-16 px-4 py-24 md:gap-28 md:px-44 md:py-20 lg:flex-row lg:px-24 lg:py-24">
        <div className="relative w-full pb-12 lg:pb-0 xl:w-1/2 xl:pt-24">
          <div className="relative">
            <div className="absolute">
              <div className="">
                <h1 className="my-2 text-2xl font-bold text-gray-800 sm:text-5xl">
                  {response === 400
                    ? "Looks like given api key is not valid"
                    : "Looks like daily api limit has been reached."}
                </h1>
                <p className="my-2 text-gray-800 sm:text-xl">
                  {response === 400
                    ? "Try using a valid api key"
                    : "Sorry about that! But if you want to still use my app, You can do so by use you own api key."}
                </p>
                <button
                  className="md my-2 rounded border bg-indigo-600 px-8 py-4 text-center text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50 sm:w-full lg:w-auto"
                  onClick={() => {
                    dispatch(toggleApiRequest());
                  }}
                >
                  Use My Api key
                </button>
              </div>
            </div>
            <div>
              <img src="https://i.ibb.co/G9DC8S0/404-2.png" />
            </div>
          </div>
        </div>
        <div>
          <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
        </div>
      </div>
      <ApiRequest />
    </>
  );
};

export default Error;
