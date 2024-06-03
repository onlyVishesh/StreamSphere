import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("q");
  return <div>{search}</div>;
};

export default Search;
