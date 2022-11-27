import React, { useMemo } from "react";
import { AxisOptions, Chart, UserSerie } from "react-charts";

import { useAppContext } from "contexts/AppContext";

type ISummaryDatum = {
  date: number;
  count: number;
};

export default function Summary() {
  const {
    state: { tracks },
    velocities,
  } = useAppContext();

  const data: UserSerie<ISummaryDatum>[] = velocities.map(
    (velocity, index) => ({
      label: tracks[index] || `tracks${index + 1}`,
      data: Object.entries(velocity).map(([key, value]) => ({
        date: parseInt(key),
        count: value,
      })),
    })
  );

  const primaryAxis = useMemo(
    (): AxisOptions<ISummaryDatum> => ({
      getValue: (datum: ISummaryDatum) => +datum.date,
      scaleType: "linear",
      min: +new Date(),
      max: +new Date(Date.now() + 10000),
      formatters: {
        scale(value: number) {
          return new Date(value).toLocaleTimeString();
        },
      },
    }),
    []
  );

  const secondaryAxes = useMemo(
    (): AxisOptions<ISummaryDatum>[] => [
      {
        getValue: (datum: ISummaryDatum) => datum.count,
        scaleType: "linear",
        hardMin: 0,
        max: 5,
      },
    ],
    []
  );

  return (
    <>
      <div className="my-4 prose dark:prose-invert">
        <h2>Velocity (tweets/second) </h2>
      </div>
      <div className="h-[20vh]">
        <Chart
          options={{
            data: data,
            primaryAxis,
            secondaryAxes,
            interactionMode: "closest",
            dark:
              window.matchMedia &&
              window.matchMedia("(prefers-color-scheme: dark)").matches,
          }}
        />
      </div>
    </>
  );
}
