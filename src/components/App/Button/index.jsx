import PropTypes from "prop-types";

const Button = ({ children }) => {
  return <button className="btn">{children}</button>;
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Button;
