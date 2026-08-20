// components/CustomSelect.jsx
import { useState, useRef } from 'react';
import { useOutsideClick } from '../hooks/useOutsideClick.js';

function CustomSelect({
  label,
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
  disabled = false, // 🟢 پشتیبانی از حالت غیرفعال
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useOutsideClick(dropdownRef, isOpen, () => setIsOpen(false));

  const getOptionValue = (opt) => opt?.id ?? opt?.value;
  const getOptionLabel = (opt) => opt?.name ?? opt?.title ?? opt?.label ?? '';
  const getOptionImage = (opt) => opt?.image_url ?? opt?.image ?? opt?.cover_url;

  const selectedOption = options.find(
    (opt) => String(getOptionValue(opt)) === String(value)
  );

  function handleSelect(val) {
    if (disabled) return;
    onChange(val);
    setIsOpen(false);
  }

  return (
    <div className={`flex flex-col gap-y-2 w-full relative select-none ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`} ref={dropdownRef}>
      {label && (
        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider px-0.5">
          {label}
        </label>
      )}

      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        className={`w-full bg-black text-left px-4 py-3.5 rounded-xl border transition-all duration-200 flex items-center justify-between text-sm font-medium ${
          disabled
            ? "border-[#262626] cursor-not-allowed text-gray-600"
            : isOpen
              ? "border-white ring-1 ring-white cursor-pointer"
              : "border-[#262626] hover:border-[#3e3e3e] cursor-pointer"
        }`}
      >
        <div className="flex items-center gap-2.5 truncate">
          {selectedOption && getOptionImage(selectedOption) && (
            <img
              src={getOptionImage(selectedOption)}
              alt=""
              className="w-5 h-5 rounded-full object-cover bg-[#262626] shrink-0"
            />
          )}
          <span className={selectedOption ? "text-white" : "text-gray-500"}>
            {selectedOption ? getOptionLabel(selectedOption) : placeholder}
          </span>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="currentColor"
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 shrink-0 ${
            isOpen ? "rotate-180 text-white" : ""
          }`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {isOpen && !disabled && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-[#181818] border border-[#262626] rounded-xl shadow-2xl overflow-hidden py-1.5 max-h-60 overflow-y-auto animate-[fadeIn_.15s_ease-out]">
          {options.length === 0 ? (
            <div className="px-4 py-3 text-xs text-gray-500 text-center">
              No options available
            </div>
          ) : (
            options.map((option) => {
              const optVal = getOptionValue(option);
              const optLabel = getOptionLabel(option);
              const optImg = getOptionImage(option);
              const isSelected = String(optVal) === String(value);

              return (
                <div
                  key={optVal}
                  onClick={() => handleSelect(optVal)}
                  className={`px-4 py-2.5 text-sm flex items-center justify-between cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-white/10 text-[#1ed760] font-bold"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    {optImg && (
                      <img
                        src={optImg}
                        alt={optLabel}
                        className="w-6 h-6 rounded-full object-cover bg-black shrink-0 border border-white/10"
                      />
                    )}
                    <span className="truncate">{optLabel}</span>
                  </div>

                  {isSelected && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4 text-[#1ed760] shrink-0 ml-2"
                    >
                      <path
                        fillRule="evenodd"
                        d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

export default CustomSelect;