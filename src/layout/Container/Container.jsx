import PropTypes from "prop-types";

import "./Container.scss";

const Container = ({ children, customClass }) => {
  return <div className={`container ${customClass}`}>{children}</div>;
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  customClass: PropTypes.string,
};

export default Container;
