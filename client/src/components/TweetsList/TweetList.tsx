import { Tweet } from "core/models/tweet";

import React, { useCallback, useState } from "react";

import { useTwitterEventSource } from "hooks/useTwitterEventSource/useTwitterEventSource";
import { useTwitterStream } from "hooks/useTwitterStream/useTwitterStream";

export default function TweetList() {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const onData = useCallback((tweet: Tweet) => {
    setTweets((currentTweets) => [tweet, ...currentTweets].slice(0, 40));
  }, []);
  const { start, stop } = useTwitterEventSource(
    "france",
    onData,
    console.error
  );

  console.info(tweets);
  return (
    <div>
      <button className="border w-10 h-6" onClick={start}>
        Start
      </button>
      <button className="border w-10 h-6" onClick={stop}>
        Stop
      </button>
      {tweets.map((tweet) => (
        <div key={tweet.id}>{tweet.text}</div>
      ))}
    </div>
  );
}
