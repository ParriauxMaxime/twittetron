import React, { AnchorHTMLAttributes } from "react";

export function Link({
  to,
  children,
  ...props
}: {
  to?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className="no-underline"
      target="_blank"
      href={`https://twitter.com/${to}`}
      {...props}
    >
      {children}
    </a>
  );
}
