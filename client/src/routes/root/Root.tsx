import { useAppContext } from "contexts/AppContext";

import Controls from "components/Controls/Controls";
import TweetList from "components/TweetsList/TweetList";

export default function Root() {
  const {
    tweets1,
    tweets2,
    state: { track1, track2 },
  } = useAppContext();

  return (
    <div className="flex flex-col items-center">
      <header className="w-full bg-blue-700 h-12 flex items-center p-4">
        <h1 className="prose">Twittertron</h1>
      </header>
      <div className="flex-col w-full justify-center lg:w-[1024px] p-4">
        <Controls />
        <div className="md:flex md:justify-between">
          <div className="md:hidden">Keyword: {track1}</div>
          <TweetList tweets={tweets1} />
          <div className="mt-4 md:hidden">Keyword: {track2}</div>
          <TweetList tweets={tweets2} />
        </div>
      </div>
    </div>
  );
}
