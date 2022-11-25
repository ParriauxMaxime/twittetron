import { useEffect, useRef, useState } from "react";

import { Tweet } from "core/models/tweet";

export function useTwitterEventSource(track: string) {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [run, setRun] = useState(false);
  const onStop = useRef<CallableFunction>();

  useEffect(() => {
    if (run) {
      const source = new EventSource(`http://localhost:5000/track/${track}`);
      source.addEventListener(
        "message",
        (e) => {
          console.log("message", e.data);
          const tweet = JSON.parse(e.data);
          setTweets((currentTweets) => [tweet, ...currentTweets].slice(0, 40));
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
        (error) => {
          console.error("error", error);
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
      console.info("onStop");
      if (onStop.current) onStop.current();
      setRun(false);
    },
    tweets,
  };
}
