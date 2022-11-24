import { Tweet } from "core/models/tweet";

import { useEffect, useRef, useState } from "react";

export function useTwitterEventSource(
  track: string,
  onData: (data: Tweet) => void,
  onError: (error: unknown) => void
) {
  const [run, setRun] = useState(false);
  const onStop = useRef<CallableFunction>();

  useEffect(() => {
    if (run) {
      const source = new EventSource(`http://localhost:5000/track/${track}`);
      console.info("tmp");
      source.addEventListener(
        "message",
        function (e) {
          console.log("message", e.data);
          onData(JSON.parse(e.data));
        },
        false
      );

      source.addEventListener(
        "open",
        function (e) {
          console.log("connected", e);
          onStop.current = source.close.bind(source);
        },
        false
      );

      source.addEventListener(
        "error",
        function (e) {
          console.log("error", e);
          onError(e);
          if (onStop.current) onStop.current();
          // error occurred
        },
        false
      );
    }

    return () => {
      if (onStop.current) onStop.current();
    };
  }, [track, onData, onError, run]);

  return {
    start: () => setRun(true),
    stop: () => {
      console.info("onStop");
      if (onStop.current) onStop.current();
      setRun(false);
    },
  };
}
