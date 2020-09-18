import React, { useEffect, useState } from "react";
import classes from "./Chart.module.scss";
import { Line } from "react-chartjs-2";

interface DailyDataObj {
  confirmed: number;
  deaths: number;
  date: string;
}

interface Props {
  dailyData: DailyDataObj[];
}

const Chart = ({ dailyData }: Props) => {
  const lineChart = dailyData ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData!.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255,0,0,0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  return <div className={classes.container}>{lineChart}</div>;
};
export default Chart;
