import React from "react";
import classes from "./Chart.module.scss";
import { Bar, Line } from "react-chartjs-2";

interface DailyDataObj {
  confirmed: number;
  deaths: number;
  date: string;
}

interface Props {
  dailyData: DailyDataObj[];
  data: {
    confirmed: { value: number };
    recovered: { value: number };
    deaths: { value: number };
    lastUpdate: string;
  };
  country: string;
}

const Chart = (props: Props) => {
  const {
    dailyData,
    data: { confirmed, recovered, deaths },
    country,
  } = props;
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

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0,0,255, 0.5)",
              "rgba(0,255,0, 0.5)",
              "rgba(255,0,0, 0.5)",
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{ legend: { display: false } }}
    />
  ) : null;
  return (
    <div className={classes.container}>
      {country === "global" ? lineChart : barChart}
    </div>
  );
};
export default Chart;
