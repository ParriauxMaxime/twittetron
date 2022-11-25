import { useAppContext } from "contexts/AppContext";

import React from "react";

import Button from "components/Button/Button";
import Input from "components/Input/Input";

export default function Controls() {
  const {
    state: { track1, track2, run },
    setTrack,
    start,
    stop,
    reset,
  } = useAppContext();

  return (
    <div className="mb-4">
      <div className="md:flex justify-around">
        <Input
          id={"track1"}
          label={"track1"}
          value={track1}
          onChange={(event) => setTrack("track1", event.target.value)}
        />
        <Input
          id={"track2"}
          label={"track2"}
          value={track2}
          onChange={(event) => setTrack("track2", event.target.value)}
        />
      </div>
      <div className="md:flex justify-around mt-2">
        <Button disabled={run || !track1 || !track2} onClick={start}>
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
