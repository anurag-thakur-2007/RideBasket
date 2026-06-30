import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  autoComplete,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type;

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-slate-700">
          {label}
          {required && (
            <span className="text-red-500 ml-1">*</span>
          )}
        </label>
      )}

      <div className="relative">
        <input
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          /* Updated bg-slate-50 to bg-white */
          className={`w-full min-w-0 min-h-[44px] h-12 sm:h-14 rounded-2xl border border-slate-300 bg-white px-4 sm:px-5 text-base outline-none transition-colors duration-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:opacity-60 disabled:cursor-not-allowed ${type === "password" ? "pr-12 sm:pr-14" : ""}`}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-2 text-slate-500 hover:text-blue-600 transition-colors"
          >
            {showPassword ? (
              <FaEyeSlash size={18} />
            ) : (
              <FaEye size={18} />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;