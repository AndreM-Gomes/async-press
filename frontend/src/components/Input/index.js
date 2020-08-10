import React from "react";

import "./styles.css";

const Input = ({ type, label, name, ...rest }) => {
  return (
    <div className="input-block">
      <label htmlFor={name}>{label}</label>
      <input type={type} id={name} {...rest} />
    </div>
  );
};

export default Input;
