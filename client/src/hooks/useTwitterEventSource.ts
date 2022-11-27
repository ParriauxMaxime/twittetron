import { useEffect, useRef, useState } from "react";

import { Tweet } from "models/tweet";

const URL = "http://localhost:5000/track";

export function useTwitterEventSource(track: string) {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [run, setRun] = useState(false);
  const onStop = useRef<CallableFunction>();
  const feedRef = useRef<Tweet[]>([]);
  const velocityRef = useRef<Record<string, number>>({});

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (run) {
      let i = 0;
      interval = setInterval(() => {
        const now = Date.now();
        const second = now - (now % 1000);
        velocityRef.current[second] = i;
        i = 0;
        if (second - 60000 in velocityRef.current) {
          delete velocityRef.current[second - 60000];
        }
      }, 1000);
      const source = new EventSource(`${URL}/${track}`);
      source.addEventListener(
        "message",
        (e) => {
          const tweet = JSON.parse(e.data);
          if (!feedRef.current.find((t) => t.id === tweet.id)) {
            setTweets((currentTweets) =>
              [tweet, ...currentTweets].slice(0, 40)
            );
            i++;
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
      clearInterval(interval);
    };
  }, [track, run]);

  return {
    start: () => setRun(true),
    stop: () => {
      if (onStop.current) onStop.current();
      setRun(false);
    },
    reset: () => {
      velocityRef.current = {};
      setTweets([]);
    },
    tweets,
    velocity: velocityRef.current,
  };
}
