import React, { AnchorHTMLAttributes } from "react";

import { Tweet as TweetModel } from "models/tweet";

import Favorite from "./Counters/Favorite";
import Reply from "./Counters/Reply";
import Retweet from "./Counters/Retweet";

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
            className="max-w-[48px] rounded-full overflow-hidden prose dark:prose-invert"
            src={tweet.user?.profile_image_url}
            alt={tweet.user?.name}
          ></img>
        </Link>
      </div>
      <div className="flex flex-col prose dark:prose-invert ml-2 overflow-hidden">
        <div className="flex overflow-ellipsis">
          <Link
            className="no-underline hover:underline"
            to={tweet.user?.screen_name}
          >
            <span className="font-bold mr-2 max-w-{50%} whitespace-nowrap">
              {tweet.user?.name}
            </span>
          </Link>
          <Link to={tweet.user?.screen_name}>
            <span className=" text-slate-500 whitespace-nowrap overflow-ellipsis">
              {`@${tweet.user?.screen_name}`}
            </span>
          </Link>
        </div>
        <div className="prose-sm dark:prose-invert">{tweet.text}</div>
        <div className="flex">
          <Reply count={tweet.reply_count} />
          <Retweet count={tweet.retweet_count} />
          <Favorite count={tweet.favorite_count} />
        </div>
      </div>
    </div>
  );
}
