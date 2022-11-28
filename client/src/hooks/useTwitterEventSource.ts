import { useEffect, useRef, useState } from "react";

import { Tweet } from "models/tweet";

const URL = "http://localhost:5000/track";

export function useTwitterEventSource(track: string) {
  const tweetStore = useRef<Record<string, Tweet>>({});
  const [tweetList, setTweetList] = useState<string[]>([]);
  const [run, setRun] = useState(false);
  const onStop = useRef<CallableFunction>();
  const [velocity, setVelocity] = useState<Record<string, number>>({});

  const stop = () => {
    if (onStop.current) onStop.current();
    setRun(false);
  };

  useEffect(() => {
    let tweetCountInPeriod = 0;

    const interval = setInterval(() => {
      const now = +Date.now();
      const second = +now - (+now % 1000);
      setVelocity((currentVelocity) => ({
        ...currentVelocity,
        [second]: tweetCountInPeriod,
      }));
      tweetCountInPeriod = 0;
    }, 1000);

    if (run) {
      const source = new EventSource(`${URL}/${track}`);
      source.addEventListener(
        "message",
        (e) => {
          const tweet = JSON.parse(e.data);
          tweetStore.current[tweet.id] = tweet;

          setTweetList((currentTweetList) =>
            // There is no guarantee than a tweet will be streamed only once
            [...new Set([tweet.id, ...currentTweetList])].slice(0, 40)
          );
          tweetCountInPeriod++;
        },
        false
      );

      source.addEventListener(
        "open",
        () => {
          onStop.current = source.close.bind(source);
        },
        false
      );

      source.addEventListener("error", stop, false);
    }

    return () => {
      if (onStop.current) onStop.current();
      clearInterval(interval);
    };
  }, [track, run]);

  return {
    start: () => setRun(true),
    stop,
    reset: () => {
      setVelocity({});
      setTweetList([]);
    },
    tweets: tweetList.map((tweetId: string) => tweetStore.current[tweetId]),
    velocity,
  };
}
