import React from "react";

export function Counter({
  count,
  children,
}: {
  count: number;
  children: JSX.Element;
}) {
  return (
    <div className="flex flex-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        {children}
      </svg>
      <span className="prose-sm mx-1">{count}</span>
    </div>
  );
}
