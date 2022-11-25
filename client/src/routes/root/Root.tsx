import { useAppContext } from "contexts/AppContext";

import Controls from "components/Controls/Controls";
import Summary from "components/Summary/Summary";
import Feed from "components/TweetsList/TweetList";

export default function Root() {
  const {
    tweets1,
    tweets2,
    state: { track1, track2 },
  } = useAppContext();

  return (
    <div className="dark:bg-slate-900 flex flex-col items-center h-full w-full">
      <header className="w-full bg-blue-700 h-12 flex items-center p-2 md:p-4">
        <div className="prose dark:prose-invert">
          <h1>Twittertron</h1>
        </div>
      </header>
      <div className="flex-col w-full justify-center lg:w-[1024px] p-2 md:p-4">
        <Controls />
        <div className="md:flex md:justify-between">
          <Feed tweets={tweets1} track={track1} />
          <br className="md:hidden" />
          <Feed tweets={tweets2} track={track2} />
        </div>
        <Summary />
      </div>
    </div>
  );
}
