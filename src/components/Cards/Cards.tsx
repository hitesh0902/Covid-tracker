import React from "react";
import CountUp from "react-countup";
import classes from "./Cards.module.scss";

interface Props {
  confirmed: number;
  recovered: number;
  deaths: number;
  lastUpdate: string;
}

const Cards = (props: Props) => {
  const { confirmed, recovered, deaths, lastUpdate } = props;
  const lastUpdated = new Date(lastUpdate!).toDateString();
  return (
    <div className={classes.cards}>
      <div className={classes.card}>
        <h2 className={classes.card__title}>Infected</h2>
        <p className={classes.card__data}>
          <CountUp start={0} end={confirmed} duration={2} separator="," />
        </p>

        <p className={classes.card__date}>{lastUpdated}</p>
        <p className={classes.card__about}>
          Number of active cases from COVID-19.
        </p>
      </div>
      <div className={classes.card}>
        <h2 className={classes.card__title}>Recovered</h2>
        <p className={classes.card__data}>
          <CountUp start={0} end={recovered} duration={2} separator="," />
        </p>
        <p className={classes.card__date}>{lastUpdated}</p>
        <p className={classes.card__about}>
          Number of active cases from COVID-19.
        </p>
      </div>
      <div className={classes.card}>
        <h2 className={classes.card__title}>Deaths</h2>
        <p className={classes.card__data}>
          <CountUp start={0} end={deaths} duration={2} separator="," />
        </p>
        <p className={classes.card__date}>{lastUpdated}</p>
        <p className={classes.card__about}>
          Number of active cases from COVID-19.
        </p>
      </div>
    </div>
  );
};

export default Cards;
