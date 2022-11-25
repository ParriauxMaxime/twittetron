import { useAppContext } from "contexts/AppContext";

import React, { useMemo } from "react";
import { AxisOptions, Chart } from "react-charts";

type ISummaryDatum = {
  date: Date;
  count: number;
};

export default function Summary() {
  const {
    state: { track1, track2 },
    received1,
    received2,
  } = useAppContext();

  const series = (data: Date[]) => {
    const time = (date: Date) => String(+date - (+date % 1000));

    return Object.entries(
      data.reduce(
        (acc, date) => ({
          ...acc,
          [time(date)]: time(date) in acc ? acc[time(date)] + 1 : 1,
        }),
        {} as Record<string, number>
      )
    ).map(([key, value]) => ({
      date: new Date(Number(key)),
      count: value,
    }));
  };

  const data = [
    {
      label: track1 || "track1",
      data: series(received1),
    },
    {
      label: track2 || "track2",
      data: series(received2),
    },
  ];

  const primaryAxis = useMemo(
    (): AxisOptions<ISummaryDatum> => ({
      getValue: (datum: ISummaryDatum) => datum.date,
      scaleType: "time",
    }),
    []
  );

  const secondaryAxes = useMemo(
    (): AxisOptions<ISummaryDatum>[] => [
      {
        getValue: (datum: ISummaryDatum) => datum.count,
        scaleType: "linear",
        // elementType: "line",
      },
    ],
    []
  );

  if (data.some((d) => d.data.length < 2)) {
    return null;
  }

  return (
    <div className="h-[20vh] mt-4">
      <Chart
        options={{
          data,
          primaryAxis,
          secondaryAxes,
          dark: true,
        }}
      />
    </div>
  );
}
