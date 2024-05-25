import PropTypes from "prop-types";

const Button = ({ info, isActive, onClick }) => {
  return (
    <button
      className={`h-8 text-nowrap rounded-sm px-1 py-0 text-xs font-medium transition-transform duration-200 hover:scale-105 hover:cursor-pointer sm:rounded-md sm:px-2 sm:py-1 sm:text-sm ${
        isActive ? "bg-black text-white" : "bg-slate-200 text-black"
      }`}
      onClick={onClick}
    >
      {info.snippet.title}
    </button>
  );
};

Button.propTypes = {
  info: PropTypes.shape({
    id: PropTypes.string.isRequired,
    snippet: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
