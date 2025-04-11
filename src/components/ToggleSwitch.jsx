import React from "react";

const ToggleSwitch = ({ checked, onChange }) => {
  return (
    <label className="flex cursor-pointer select-none items-center">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <div
          className={`block h-8 w-14 rounded-full transition ${
            checked ? "bg-blue-600" : "bg-gray-300"
          }`}
        ></div>
        <div
          className={`dot absolute top-1 h-6 w-6 rounded-full bg-white transition ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        ></div>
      </div>
    </label>
  );
};

export default ToggleSwitch;
