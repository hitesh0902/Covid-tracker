import React, { useEffect, useState } from "react";
import classes from "./Chart.module.scss";
import { fetchDailyData } from "../../api/api";
import { Line } from "react-chartjs-2";

interface data {
  confirmed: { total: number };
  deaths: { total: number };
  reportDate: string;
}

interface dailyDataOjb {
  confirmed: number;
  deaths: number;
  date: string;
}

type State = dailyDataOjb[];

interface Props {}

const Chart = (props: Props) => {
  const [dailyData, setDailyData] = useState<State | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const dailyData = await fetchDailyData();
      const modifiedData = dailyData.map((data: data) => ({
        confirmed: data.confirmed.total,
        deaths: data.deaths.total,
        date: data.reportDate,
      }));
      setDailyData(modifiedData);
    };

    fetch();
  }, [setDailyData]);

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
