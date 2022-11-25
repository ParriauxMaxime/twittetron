import React, { AnchorHTMLAttributes } from "react";

import { Tweet as TweetModel } from "core/models/tweet";

function Link({
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

export function Tweet({ tweet }: { tweet: TweetModel }) {
  return (
    <div className="flex p-2 border-b-2 last:border-b-0">
      <div className="w-[48px] mt-1">
        <Link to={tweet.user?.screen_name}>
          <img
            className="max-w-[48px] rounded-full overflow-hidden prose"
            src={tweet.user?.profile_image_url}
            alt={tweet.user?.name}
          ></img>
        </Link>
      </div>
      <div className="flex flex-col prose ml-2">
        <div className="flex">
          <Link
            className="no-underline hover:underline"
            to={tweet.user?.screen_name}
          >
            <span className="font-bold mr-2 whitespace-nowrap">
              {tweet.user?.name}
            </span>
          </Link>
          <Link to={tweet.user?.screen_name}>
            <span className=" text-slate-500 whitespace-nowrap overflow-ellipsis">
              {`@${tweet.user?.screen_name}`}
            </span>
          </Link>
        </div>
        <div className="prose-sm">{tweet.text}</div>
      </div>
    </div>
  );
}
