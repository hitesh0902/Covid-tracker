import React, { useEffect, useState } from "react";
import classes from "./App.module.scss";
import Cards from "./components/Cards/Cards";
import Country from "./components/Country/Country";

import { fetchData } from "./api/api";
import Chart from "./components/Chart/Chart";

interface State {
  confirmed: { value: number };
  recovered: { value: number };
  deaths: { value: number };
  lastUpdate: string;
}

function App() {
  const [data, setData] = useState<State | null>(null);
  const [countries, setCountries] = useState();
  useEffect(() => {
    const fetchedData = async () => {
      const data = await fetchData();
      setData(data);
    };
    fetchedData();
  }, [setData]);

  const handleCountryChange = (event: { target: { value: any } }) => {
    // console.log(countries);
    console.log(event.target.value);
  };

  return (
    <div className={classes.App}>
      <img
        src="/covid-19.png"
        alt="covid-19"
        className={classes.covid__image}
      />
      <Cards
        confirmed={data?.confirmed.value}
        recovered={data?.recovered.value}
        deaths={data?.deaths.value}
        lastUpdate={data?.lastUpdate}
      />
      {/* <Country countryChange={handleCountryChange} /> */}
      <Chart />
    </div>
  );
}

export default App;
