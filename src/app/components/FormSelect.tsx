"use client";

import { FormSelectOption } from "@/lib/types";
import { useEffect, useRef, useState } from "react";

interface FormSelectProps {
  className?: string;
  label: string;
  options: FormSelectOption[];
  value: string;
  onChange: (value: string) => void;
}

export function FormSelect({
  className,
  label,
  options,
  value,
  onChange,
}: FormSelectProps) {
  const [showOptions, setShowOptions] = useState(false);
  const displayName = options.find((opt) => opt.id === value)?.name;

  function updateValue(val: string) {
    onChange(val);
    setShowOptions(false);
  }

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) {
        setShowOptions(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className={`relative select-none ${className}`}>
      <div>{label}</div>
      <div
        className="rounded-sm cursor-pointer px-3 py-2 hover:bg-gray-200"
        onClick={() => setShowOptions((val) => !val)}
      >
        {displayName}
      </div>
      {showOptions && (
        <div className="absolute top-[calc(100%-4px)] w-[100%] z-999 bg-white border border-black rounded-b-lg overflow-hidden">
          {options.map((val: FormSelectOption) => (
            <div
              key={val.id}
              className="cursor-pointer p-3 hover:bg-blue-300"
              onClick={() => updateValue(val.id)}
            >
              {val.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
