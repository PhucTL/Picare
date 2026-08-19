import React, { useState } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";

interface DefaultInputProps {
  label?: string | null;
  placeholder?: string;
  helperText?: string | null;
  type?: string;
  value?: string | null;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  error?: string | null;
}

const DefaultInput: React.FC<DefaultInputProps> = ({
  label,
  placeholder = "",
  helperText,
  type = "text",
  value,
  onChange,
  name,
  error,
}) => {
  const [inputValue, setInputValue] = useState(value || ""); // Maintain internal state
  const [isFocused, setIsFocused] = useState(false);

  // Handle change event internally if `onChange` is not provided
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={onChange ? value || "" : inputValue} // Use state if `onChange` is not provided
        onChange={handleChange} // Handle change properly
        placeholder={placeholder}
        className={`w-full px-4 py-2 text-sm border rounded-lg outline-none transition 
          ${
            error
              ? "border-red-500 focus:ring-red-200"
              : isFocused
              ? "border-primary"
              : "border-gray-300"
          } 
          ${error ? "focus:ring-red-200" : "focus:ring-blue-200"}`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {helperText && !error && (
        <div className="flex items-center gap-x-1">
          <IoMdInformationCircleOutline className="text-gray-500" />
          <p className="text-xs text-gray-500">{helperText}</p>
        </div>
      )}
      {error && (
        <div className="flex items-center gap-x-1">
          <IoMdInformationCircleOutline className="text-red-500" />
          <p className="text-xs text-red-500">{error}</p>
        </div>
      )}
    </div>
  );
};

export default DefaultInput;
