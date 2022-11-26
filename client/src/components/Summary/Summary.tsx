import { useAppContext } from "contexts/AppContext";

import React, { useEffect, useMemo } from "react";
import { AxisOptions, Chart, UserSerie } from "react-charts";

type ISummaryDatum = {
  date: Date;
  count: number;
};

export default function Summary() {
  const {
    state: { tracks },
    feedDates,
  } = useAppContext();

  const series = (data: Date[]) => {
    const time = (date: Date) => String(+date - (+date % 1000));
    const max = +data[data.length - 1] - (+data[data.length - 1] % 1000);
    let min = +data[0] - (+data[0] % 1000);

    const tmp = [];
    while (min <= max) {
      tmp.push(min);
      min += 1000;
    }

    return Object.entries(
      tmp.reduce(
        (acc, t) => ({
          ...acc,
          [t]: data.filter((d) => +d > t && +d <= t + 1000).length,
        }),
        {} as Record<string, number>
      )
    ).map(([key, value]) => ({
      date: new Date(+key),
      count: value,
    }));
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

  const data: UserSerie<ISummaryDatum>[] = feedDates.map((feedDate, index) => ({
    label: tracks[index] || `tracks${index + 1}`,
    data: series(feedDate),
  }));

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

  console.info(data[0].data);

  if (data.some((d: { data: any[] }) => d.data.length < 2)) {
    return null;
  }

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
            dark:
              window.matchMedia &&
              window.matchMedia("(prefers-color-scheme: dark)").matches,
          }}
        />
      </div>
    </>
  );
}
