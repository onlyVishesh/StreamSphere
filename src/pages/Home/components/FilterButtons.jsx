import { useEffect, useState } from "react";
import { filters } from "../../../utils/constants";
import Button from "./Button";

const FilterButtons = () => {
  const [titles, setTitles] = useState([]);

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
      <div className="my-2 flex h-fit w-11/12 flex-nowrap items-center gap-2 overflow-x-scroll px-10 no-scrollbar 2xs:px-4 sm:gap-4 sm:px-0 lg:mx-4">
        {titles.map((title) => (
          <Button title={title.snippet.title} key={title.id} />
        ))}
      </div>
    </div>
  );
};

export default FilterButtons;
