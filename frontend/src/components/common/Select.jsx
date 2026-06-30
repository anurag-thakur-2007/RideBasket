const Select = ({
  label,
  name,
  value,
  onChange,
  required = false,
  disabled = false,
  children,
}) => {
  return (
    <div className="flex flex-col gap-2 min-w-0">

      <label className="text-sm font-semibold text-slate-700">
        {label}

        {required && (
          <span className="text-red-500 ml-1">*</span>
        )}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className="w-full min-w-0 min-h-[44px] h-12 sm:h-14 rounded-2xl border border-slate-300 bg-white px-4 sm:px-5 text-base outline-none transition-colors duration-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {children}
      </select>

    </div>
  );
};

export default Select;