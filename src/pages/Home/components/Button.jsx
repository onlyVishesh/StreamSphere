import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { changeFilterId } from "../../../utils/appSlice";

const Button = (props) => {
  const { info } = props;
  const dispatch = useDispatch();
  const SetFilterId = () => {
    dispatch(changeFilterId(info.id));
  };

  Button.propTypes = {
    info: PropTypes.shape({
      id: PropTypes.string.isRequired,
      snippet: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  return (
    <button
      className="h-8 text-nowrap rounded-sm bg-slate-200 px-1 py-0 text-xs font-medium text-black transition-transform duration-200 hover:scale-105 hover:cursor-pointer hover:bg-slate-300 focus:bg-black focus:text-white sm:rounded-md sm:px-2 sm:py-1 sm:text-sm"
      onClick={() => {
        SetFilterId();
      }}
    >
      {info.snippet.title}
    </button>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Button;
