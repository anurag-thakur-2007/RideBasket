import React from "react";

const Button = ({
  children,
  type = "button",
  onClick,
  loading = false,
  disabled = false,
  className = "",
  variant = "primary",
  ...rest
}) => {
  const variants = {
    // Updated primary variant with elevation and colored shadow
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white shadow-md",
    
    secondary:
      "bg-slate-200 hover:bg-slate-300 text-slate-800",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      {...rest}
      className={`w-full min-h-[44px] h-12 sm:h-14 px-4 sm:px-6 rounded-2xl font-semibold text-base transition-colors duration-200
        disabled:opacity-60 disabled:cursor-not-allowed
        flex items-center justify-center gap-2 
        ${variants[variant] || variants.primary} ${className}`}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin h-5 w-5 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;