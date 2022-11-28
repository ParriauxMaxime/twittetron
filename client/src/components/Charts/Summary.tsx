import React, { useMemo } from "react";
import { AxisOptions, Chart, UserSerie } from "react-charts";

import { useAppContext } from "contexts/AppContext";

type VelocityDatum = {
  date: number;
  count: number;
};

export default function Summary() {
  const {
    state: { tracks },
    velocities,
  } = useAppContext();

  const data: UserSerie<VelocityDatum>[] = useMemo(
    () =>
      velocities.map((velocity, index) => ({
        label: tracks[index] || `tracks${index + 1}`,
        data: Object.entries(velocity).map(([key, value]) => ({
          date: parseInt(key),
          count: value,
        })),
      })),
    [velocities, tracks]
  );

  const primaryAxis = useMemo(
    (): AxisOptions<VelocityDatum> => ({
      getValue: (datum: VelocityDatum) => +datum.date,
      scaleType: "linear",
      min: +new Date(),
      max: +new Date() + 10000,
      tickCount: 5,
      formatters: {
        scale(value: number) {
          return new Date(value).toLocaleTimeString();
        },
      },
    }),
    []
  );

  const secondaryAxes = useMemo(
    (): AxisOptions<VelocityDatum>[] => [
      {
        getValue: (datum: VelocityDatum) => datum.count,
        scaleType: "linear",
        hardMin: 0,
        max: 8,
      },
    ],
    []
  );

  return (
    <>
      <div className="my-4 prose max-w-full text-center dark:prose-invert">
        <h2>Velocity (tweets/second) </h2>
      </div>
      <div className="flex items-center prose font-bold dark:prose-invert">
        <div className="h-4 w-6 bg-[#0f83ab] mr-2" />
        {tracks[0]}
        <div className="h-4 w-6 bg-[#dd9237] mr-2 ml-4" />
        {tracks[1]}
      </div>
      <div className="h-[20vh]">
        <Chart
          options={{
            data: data,
            primaryAxis,
            secondaryAxes,
            dark:
              window.matchMedia &&
              window.matchMedia("(prefers-color-scheme: dark)").matches,
          }}
        />
      </div>
    </>
  );
}
