import { Tweet } from "core/models/tweet";

import { useEffect, useRef } from "react";

export function useTwitterStream(
  track: string,
  onData: (data: Tweet) => void,
  onError: (error: unknown) => void
) {
  const controller = useRef(new AbortController()).current;

  useEffect(() => {
    console.info("tmp");
    fetch(`http://localhost:5000/track/${track}`, { signal: controller.signal })
      .then((response) => {
        const reader = (response.body as ReadableStream).getReader();

        return new ReadableStream({
          start(control) {
            const read = () => {
              reader.read().then(({ done, value }) => {
                if (done) {
                  control.close();
                  return;
                }

                return read();
              });
            };
            return read();
          },
        });
      })
      .then((stream) => new Response(stream))
      .catch(onError);
  }, [track, onData, onError, controller.signal]);

  return { abort: controller.abort };
}
