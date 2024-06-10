import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filters } from "../../../utils/constants";
import { changeFilterId } from "../../../utils/filterSlice";
import Button from "./Button";

const FilterButtons = () => {
  const [titles, setTitles] = useState([]);
  const filterId = useSelector((store) => store.filter.filterId);
  const [activeButtonId, setActiveButtonId] = useState(filterId);
  const dispatch = useDispatch();

  useEffect(() => {
    getTitles();
  }, []);

  const getTitles = async () => {
    const data = await fetch(filters);
    const json = await data.json();
    setTitles(json.items);
  };

  const handleButtonClick = (id) => {
    setActiveButtonId(id);
    dispatch(changeFilterId(id));
  };

  return (
    <div className="fixed z-0 flex w-full justify-center bg-white">
      <div className="my-2 flex h-fit w-11/12 cursor-grabbing flex-nowrap items-center gap-2 overflow-x-scroll px-10 no-scrollbar 2xs:px-4 sm:gap-4 sm:px-0 lg:mx-4">
        <button
          className={`h-8 text-nowrap rounded-sm px-1 py-0 text-xs font-medium transition-transform duration-200 hover:scale-105 hover:cursor-pointer sm:rounded-md sm:px-2 sm:py-1 sm:text-sm ${
            activeButtonId === 0
              ? "bg-black text-white"
              : "bg-slate-200 text-black"
          }`}
          onClick={() => handleButtonClick(0)}
        >
          All
        </button>
        {titles.map((title) => (
          <Button
            info={title}
            key={title.id}
            isActive={activeButtonId === title.id}
            onClick={() => handleButtonClick(title.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default FilterButtons;
