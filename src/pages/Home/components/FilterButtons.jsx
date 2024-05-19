import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeFilterId } from "../../../utils/appSlice";
import { filters } from "../../../utils/constants";
import Button from "./Button";

const FilterButtons = () => {
  const [titles, setTitles] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getTitles();
  }, []);

  const getTitles = async () => {
    const data = await fetch(filters);
    const json = await data.json();
    setTitles(json.items);
  };

  return (
    <div className="fixed z-0 flex w-full justify-center bg-white">
      <div className="my-2 flex h-fit w-11/12 cursor-grabbing flex-nowrap items-center gap-2 overflow-x-scroll px-10 no-scrollbar 2xs:px-4 sm:gap-4 sm:px-0 lg:mx-4">
        <button
          className="h-8 text-nowrap rounded-sm bg-slate-200 px-1 py-0 text-xs font-medium text-black transition-transform duration-200 hover:scale-105 hover:cursor-pointer hover:bg-slate-300 focus:bg-black focus:text-white sm:rounded-md sm:px-2 sm:py-1 sm:text-sm"
          onClick={() => {
            dispatch(changeFilterId(0));
          }}
        >
          All
        </button>
        {titles.map((title) => (
          <Button info={title} key={title.id} />
        ))}
      </div>
    </div>
  );
};

export default FilterButtons;
