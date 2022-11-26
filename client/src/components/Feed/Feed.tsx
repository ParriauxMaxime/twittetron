import { useFeed } from "hooks/useFeed/useFeed";

import { Tweet } from "components/Tweet/Tweet";

import { Tweet as TweetModel } from "../../models/tweet";

export default function Feed({ trackIndex }: { trackIndex: number }) {
  const { feed, track } = useFeed(trackIndex);

  return (
    <>
      <div className="mb-2 md:hidden prose prose-sm dark:prose-invert">
        {track}
      </div>
      <div
        style={{ visibility: feed.length ? "visible" : "hidden" }}
        className="flex flex-col border max-h-[15vh] md:w-[50%] md:max-h-[50vh] overflow-auto mx-[-0.5rem] md:mx-2"
      >
        {feed.map((tweet: TweetModel) => (
          <Tweet key={tweet.id} tweet={tweet}></Tweet>
        ))}
      </div>
    </>
  );
}
