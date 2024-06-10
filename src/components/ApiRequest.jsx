import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeApiRequest } from "../utils/openApiRequestSlice";
import { useState } from "react";
import { changeApi } from "../utils/apiSlice";

const ApiRequest = () => {
  const open = useSelector((store) => store.openApiRequest.isApiRequestOpen);
  const [apiKey, setApiKey] = useState(null);
  const dispatch = useDispatch();

  if (!open) return null;

  return ReactDOM.createPortal(
    <div
      onClick={() => {
        dispatch(closeApiRequest());
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div
        className="relative flex min-w-[300px] max-w-xl flex-col gap-2 rounded-lg bg-white p-5 px-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full justify-between gap-10 text-3xl">
          <div className="font-bold">Enter Custom Api Key</div>
          <button
            onClick={() => {
              dispatch(closeApiRequest());
            }}
            className="absolute right-0 top-0 flex items-center justify-center rounded-full p-2 text-[1.2rem] hover:bg-slate-100"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Paste Api key Here"
            className="rounded-lg px-2 py-1"
            style={{ border: "1px solid black" }}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                dispatch(changeApi(apiKey));
                setApiKey("");
              }
            }}
          />
          <button
            className="rounded-lg bg-slate-200 px-2 py-1 hover:bg-slate-300"
            onClick={() => {
              dispatch(changeApi(apiKey));
            }}
          >
            Submit
          </button>
        </div>
        <div>
          Does not have Api key?{" "}
          <a
            href="http://"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-500"
          >
            Click Here
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ApiRequest;
