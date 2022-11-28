import { createContext, useContext, useReducer } from "react";

import { Tweet } from "models/tweet";

import { useTwitterEventSource } from "hooks/useTwitterEventSource";

enum ActionType {
  START,
  STOP,
  RESET,
  SET_TRACK,
}

interface Action {
  type: ActionType;
  payload?: { value: string[] };
}

interface IAppState {
  tracks: string[];
  run: boolean;
}

const initialState: IAppState = {
  tracks: ["", ""],
  run: false,
};

interface IAppContext {
  state: IAppState;
  feeds: Tweet[][];
  velocities: Record<string, number>[];
  setTracks: (value: string[]) => void;
  start: () => void;
  stop: () => void;
  reset: () => void;
}

const AppContext = createContext<IAppContext>({
  state: initialState,
  velocities: [{}, {}],
  feeds: [[], []],
  setTracks: () => {
    return;
  },
  start: () => {
    return;
  },
  stop: () => {
    return;
  },
  reset: () => {
    return;
  },
});

const AppReducer = (state: IAppState, action: Action) => {
  switch (action.type) {
    case ActionType.SET_TRACK:
      return {
        ...state,
        tracks: (action.payload as { value: string[] }).value,
      };
    case ActionType.START:
      return { ...state, run: true };
    case ActionType.STOP:
      return { ...state, run: false };
    case ActionType.RESET:
      return initialState;

    default:
      return state;
  }
};

export const AppProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const trackers = state.tracks.map(useTwitterEventSource);

  const setTracks = (value: string[]) => {
    dispatch({
      type: ActionType.SET_TRACK,
      payload: {
        value,
      },
    });
  };

  const start = () => {
    trackers.forEach((tracker) => tracker.start());
    dispatch({
      type: ActionType.START,
    });
  };

  const stop = () => {
    trackers.forEach((tracker) => tracker.stop());
    dispatch({
      type: ActionType.STOP,
    });
  };

  const reset = () => {
    if (state.run) {
      stop();
    }
    trackers.forEach((tracker) => tracker.reset());
    dispatch({
      type: ActionType.RESET,
    });
  };

  return (
    <AppContext.Provider
      value={{
        state,
        setTracks,
        start,
        stop,
        reset,
        feeds: trackers.map((tracker) => tracker.tweets),
        velocities: trackers.map((tracker) => tracker.velocity),
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
