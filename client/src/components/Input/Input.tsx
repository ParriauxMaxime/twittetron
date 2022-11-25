import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Input({ id, label, value, onChange }: InputProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={label}>{label}</label>
      <input
        {...{ id, value, onChange }}
        className="border rounded outline-none"
      ></input>
    </div>
  );
}
