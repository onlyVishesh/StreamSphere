import PropTypes from "prop-types";

const Button = (props) => {
  const { title } = props;
  return (
    <button className="h-8 text-nowrap rounded-sm bg-slate-200 px-1 py-0 text-xs font-medium text-black transition-transform duration-200 hover:scale-105 hover:cursor-pointer hover:bg-slate-300 sm:rounded-md sm:px-2 sm:py-1 sm:text-sm ">
      {title}
    </button>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Button;
