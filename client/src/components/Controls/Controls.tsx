import { useAppContext } from "contexts/AppContext";

import React from "react";

import Button from "components/Button/Button";
import Input from "components/Input/Input";

export default function Controls() {
  const {
    state: { tracks, run },
    setTracks,
    start,
    stop,
    reset,
  } = useAppContext();

  return (
    <div className="mb-4">
      <div className="md:flex justify-around">
        {tracks.map((track: string, index: number) => (
          <Input
            id={"track" + (index + 1)}
            key={"track" + (index + 1)}
            label={"track" + (index + 1)}
            value={track}
            disabled={run}
            onChange={(event) => {
              const newTracks = [...tracks];
              newTracks[index] = event.target.value;

              setTracks(newTracks);
            }}
          />
        ))}
      </div>
      <div className="md:flex justify-around mt-2">
        <Button
          disabled={run || tracks.some((track) => !track)}
          onClick={start}
        >
          Start
        </Button>
        <Button disabled={!run} onClick={stop}>
          Stop
        </Button>
        <Button onClick={reset}>Reset</Button>
      </div>
    </div>
  );
}
