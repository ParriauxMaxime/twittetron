import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Input({
  id,
  label,
  value,
  onChange,
  ...props
}: InputProps) {
  return (
    <div className="flex my-1">
      <label className="prose dark:prose-invert w-12" htmlFor={label}>
        {label}
      </label>
      <input
        {...{ id, value, onChange, ...props }}
        className="border rounded outline-none px-1"
      ></input>
    </div>
  );
}
