import React from "react";

import Feed from "./Feed";

export default function Feeds() {
  return (
    <div className="md:flex md:justify-between h-[40vh] md:h-[50vh]">
      <Feed trackIndex={0} />
      <br className="md:hidden" />
      <Feed trackIndex={1} />
    </div>
  );
}
