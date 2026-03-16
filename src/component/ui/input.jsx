import React, { useState } from "react";
import "./ui.css";

const MyInput = ({ label, placeholder, type = "text", value: propValue, onChange }) => {
  const [value, setValue] = useState(propValue || "");

  const handleChange = (e) => {
    setValue(e.target.value);
    if (onChange) onChange(e.target.value);
  };

  return (
    <div className="input-container">
      {label && <label>{label}</label>}
      <input 
        type={type} 
        value={value} 
        onChange={handleChange} 
        placeholder={placeholder} 
      />
    </div>
  );
};

export default MyInput;