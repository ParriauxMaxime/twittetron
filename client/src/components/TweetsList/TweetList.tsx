import { Tweet as TweetModel } from "core/models/tweet";

import { Tweet } from "components/Tweet/Tweet";

export default function TweetList({ tweets }: { tweets: TweetModel[] }) {
  // const tweets = localStorage.getItem("tmp")
  //   ? JSON.parse(localStorage.getItem("tmp") as string)
  //   : [];

  return (
    <div>
      <div className="flex border flex-col mx-2 max-h-[50vh] overflow-auto">
        {tweets.map((tweet: TweetModel) => (
          <Tweet key={tweet.id} tweet={tweet}></Tweet>
        ))}
      </div>
    </div>
  );
}
