import React, { ButtonHTMLAttributes } from "react";

export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="border bg-blue-700 w-24 rounded cursor-pointer disabled:bg-slate-500 disabled:cursor-not-allowed"
    />
  );
}
