import PropTypes from "prop-types";

import "../../pages/Register/Register.scss";

const Input = (props) => {
  return (
    <label>
      <span>
        {props.label}
        {props.label && ":"}
      </span>
      <input
        type={props.type}
        name={props.name}
        placeholder={`${props.placeholder}...`}
        onChange={props.onChange}
        value={props.value}
      />
    </label>
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  text: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export default Input;
