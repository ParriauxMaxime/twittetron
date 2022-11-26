import { Tweet } from "models/tweet";

import { useEffect, useRef, useState } from "react";

const URL = "http://localhost:5000/track";

export function useTwitterEventSource(track: string) {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [run, setRun] = useState(false);
  const [tweetDates, setTweetDates] = useState<Date[]>([]);
  const onStop = useRef<CallableFunction>();
  const feedRef = useRef<Tweet[]>([]);
  const dateRef = useRef<Date[]>([]);

  useEffect(() => {
    if (run) {
      const source = new EventSource(`${URL}/${track}`);
      source.addEventListener(
        "message",
        (e) => {
          const tweet = JSON.parse(e.data);
          if (!feedRef.current.find((t) => t.id === tweet.id)) {
            setTweets((currentTweets) =>
              [tweet, ...currentTweets].slice(0, 40)
            );
            setTweetDates((currentTweetDates) => [
              ...currentTweetDates,
              new Date(),
            ]);
          }
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

      source.addEventListener(
        "error",
        () => {
          if (onStop.current) onStop.current();
        },
        false
      );
    }

    return () => {
      if (onStop.current) onStop.current();
    };
  }, [track, run]);

  return {
    start: () => setRun(true),
    stop: () => {
      if (onStop.current) onStop.current();
      setRun(false);
    },
    reset: () => {
      dateRef.current = [];
      feedRef.current = [];
      setTweetDates([]);
      setTweets([]);
    },
    tweets,
    tweetDates,
  };
}
