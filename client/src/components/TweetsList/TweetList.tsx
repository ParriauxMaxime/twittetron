import { Tweet as TweetModel } from "core/models/tweet";

import { Tweet } from "components/Tweet/Tweet";

export default function Feed({
  tweets,
  track,
}: {
  tweets: TweetModel[];
  track: string;
}) {
  if (!tweets.length) {
    return null;
  }

  return (
    <>
      <div className="mb-2 md:hidden prose prose-sm dark:prose-invert">
        {track}
      </div>
      <div className="flex border flex-col max-h-[20vh] md:w-[50%] md:max-h-[50vh] overflow-auto mx-[-0.5rem] md:mx-2">
        {tweets.map((tweet: TweetModel) => (
          <Tweet key={tweet.id} tweet={tweet}></Tweet>
        ))}
      </div>
    </>
  );
}
