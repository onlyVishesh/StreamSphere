import {
  faBars,
  faBell,
  faMagnifyingGlass,
  faMicrophone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/youtube.svg";
import { toggleMenu } from "../utils/appSlice";
import { searchSuggestionApi } from "../utils/constants";
import { cacheResults } from "../utils/searchSlice";

const Header = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchCache = useSelector((store) => store.search);

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  const getSearchSuggestion = async () => {
    const data = await fetch(searchSuggestionApi + searchQuery);
    const json = await data.json();
    setSuggestions(json[1]);
    console.log(searchQuery);
    dispatch(cacheResults({ [searchQuery]: json[1] }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestion();
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <div className="sticky top-0 z-10 flex w-screen items-center justify-between bg-white px-1 py-2 sm:px-4">
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-gray-200 sm:h-9 sm:w-9"
          onClick={() => toggleMenuHandler()}
        >
          <FontAwesomeIcon
            icon={faBars}
            className="text-sm hover:cursor-pointer md:text-base lg:text-lg"
          />
        </button>
        <a href="/">
          <figcaption className="flex content-center items-center gap-1 hover:cursor-pointer">
            <img src={logo} alt="YouTube" className="w-6 md:w-8" />
            <p className="hidden text-sm font-semibold -tracking-[1.5px] 2xs:block sm:text-xl">
              YouTube
            </p>
          </figcaption>
        </a>
      </div>
      <div>
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-between rounded-full border-2 border-gray-200">
            <input
              type="text"
              placeholder="Search"
              className="w-20 px-3 py-0 2xs:w-36 xs:w-52 sm:w-64 lg:w-[30rem] xl:w-[35rem]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => {
                setShowSuggestions(true);
              }}
              onBlur={() => {
                setShowSuggestions(false);
              }}
            />
            <button
              type="button"
              className="flex h-6 w-10 items-center justify-center rounded-full rounded-l-none border-y-0 border-l-2 border-r-0 border-solid border-gray-200 bg-gray-100 hover:bg-gray-200 sm:h-9 sm:w-9 sm:px-8"
            >
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="text-sm text-slate-800 sm:text-lg "
              />
            </button>
          </div>
          <button
            type="button"
            className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 sm:h-9 sm:w-9"
          >
            <FontAwesomeIcon
              icon={faMicrophone}
              className="text-sm text-slate-800 sm:text-lg"
            />
          </button>
        </div>
        {showSuggestions && suggestions.length > 0 && (
          <div className="fixed my-2 flex w-40 flex-col gap-1 rounded-lg border-2 border-gray-300 bg-white px-2 py-2 shadow-lg shadow-gray-600 2xs:w-48 xs:w-52 sm:w-64 lg:w-[30rem] xl:w-[35rem]">
            {suggestions.map((suggestion) => (
              <li
                className="flex items-center gap-2 rounded-md px-2 hover:cursor-pointer hover:bg-gray-200"
                key={suggestion}
              >
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="text-xs text-slate-800 sm:text-sm"
                />
                {suggestion}
              </li>
            ))}
          </div>
        )}
      </div>
      <div className="mr-4 flex gap-2 sm:gap-4 lg:mr-12 ">
        <button
          type="button"
          className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 sm:h-9 sm:w-9"
        >
          <FontAwesomeIcon
            icon={faBell}
            className="text-sm text-slate-800 sm:text-lg"
          />
        </button>

        <button
          type="button"
          className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 sm:h-9 sm:w-9"
        >
          <FontAwesomeIcon
            icon={faUser}
            className="text-sm text-slate-800 sm:text-lg"
          />
        </button>
      </div>
    </div>
  );
};

export default Header;
