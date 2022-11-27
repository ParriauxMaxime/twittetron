import React, { ChangeEvent } from "react";

import { useAppContext } from "contexts/AppContext";

import Button from "./Button";
import Input from "./Input";

export default function Controls() {
  const {
    state: { tracks, run },
    setTracks,
    start,
    stop,
    reset,
  } = useAppContext();

  const handleChange =
    (trackIndex: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const newTracks = [...tracks];
      newTracks[trackIndex] = event.target.value;

      setTracks(newTracks);
    };

  return (
    <div className="mb-4 md:my-8">
      <div className="md:flex justify-around">
        {tracks.map((track: string, index: number) => (
          <Input
            id={"track" + (index + 1)}
            key={"track" + (index + 1)}
            label={"track" + (index + 1)}
            value={track}
            disabled={run}
            onChange={handleChange(index)}
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
