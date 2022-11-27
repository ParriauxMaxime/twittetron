import { useAppContext } from "contexts/AppContext";

export function useFeed(feedIndex: number) {
  const {
    state: { tracks },
    feeds,
  } = useAppContext();

  return {
    track: tracks[feedIndex],
    feed: feeds[feedIndex],
  };
}
