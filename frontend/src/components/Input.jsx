import React from "react";

const Input = ({ label, placeholder, id, value, onChange = () => {} }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <label className="block text-gray-400 text-sm mb-2" htmlFor={id}>
        {label}
      </label>

      <input
        type="text"
        placeholder={placeholder}
        value={value}
        className="w-full px-4 py-2 bg-gray-900 rounded-md border border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        id={id}
        onChange={handleChange}
      />
    </div>
  );
};

export default Input;
