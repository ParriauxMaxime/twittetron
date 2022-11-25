import { type } from "os";

import { createContext, useContext, useReducer } from "react";

import { Tweet } from "core/models/tweet";

import { useTwitterEventSource } from "hooks/useTwitterEventSource/useTwitterEventSource";

enum ActionType {
  START,
  STOP,
  RESET,
  SET_TRACK,
}

interface Action {
  type: ActionType;
  payload?: any;
}

interface IAppState {
  track1: string;
  track2: string;
  run: boolean;
}

const initialState: IAppState = {
  track1: "macron",
  track2: "trump",
  run: false,
};

interface IAppContext {
  state: IAppState;
  setTrack: (key: string, value: string) => void;
  start: () => void;
  stop: () => void;
  reset: () => void;
  tweets1: Tweet[];
  tweets2: Tweet[];
  received1: Date[];
  received2: Date[];
}

const AppContext = createContext<IAppContext>({
  state: initialState,
  setTrack: () => {
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
  tweets1: [],
  tweets2: [],
  received1: [],
  received2: [],
});

const AppReducer = (state: IAppState, action: Action) => {
  switch (action.type) {
    case ActionType.SET_TRACK:
      return { ...state, [action.payload.key]: action.payload.value };
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
  const {
    start: start1,
    stop: stop1,
    reset: reset1,
    tweets: tweets1,
    received: received1,
  } = useTwitterEventSource(state.track1);
  const {
    start: start2,
    stop: stop2,
    reset: reset2,
    tweets: tweets2,
    received: received2,
  } = useTwitterEventSource(state.track2);

  const setTrack = (key: string, value: string) => {
    dispatch({
      type: ActionType.SET_TRACK,
      payload: {
        key,
        value,
      },
    });
  };
  const start = () => {
    dispatch({
      type: ActionType.START,
    });
    start1();
    start2();
  };

  const stop = () => {
    dispatch({
      type: ActionType.STOP,
    });
    stop1();
    stop2();
  };

  const reset = () => {
    if (state.run) {
      stop();
    }

    reset1();
    reset2();

    dispatch({
      type: ActionType.RESET,
    });
  };

  return (
    <AppContext.Provider
      value={{
        state,
        setTrack,
        start,
        stop,
        reset,
        tweets1,
        tweets2,
        received1,
        received2,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
