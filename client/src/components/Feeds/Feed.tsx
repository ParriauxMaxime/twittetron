import { Tweet as TweetModel } from "models/tweet";

import { Tweet } from "./Tweet";
import { useFeed } from "./useFeed";

export default function Feed({ trackIndex }: { trackIndex: number }) {
  const { feed, track } = useFeed(trackIndex);

  return (
    <>
      <div className="md:hidden text-center prose font-bold dark:prose-invert">
        {track}
      </div>
      <div
        style={{ visibility: feed.length ? "visible" : "hidden" }}
        className="flex flex-col border min-h-[15vh] max-h-[15vh] md:w-[50%] md:max-h-[45vh] overflow-auto mx-[-0.5rem] md:mx-2"
      >
        {feed.map((tweet: TweetModel) => (
          <Tweet key={tweet.id} tweet={tweet}></Tweet>
        ))}
      </div>
    </>
  );
}
