import React, { useEffect, useState } from "react";
import classes from "./App.module.scss";
import Cards from "./components/Cards/Cards";
import Country from "./components/Country/Country";
import Chart from "./components/Chart/Chart";
import { fetchCountries, fetchDailyData, fetchData } from "./api/api";

interface DataState {
  confirmed: { value: number };
  recovered: { value: number };
  deaths: { value: number };
  lastUpdate: string;
}

interface DailyDataOjb {
  confirmed: number;
  deaths: number;
  date: string;
}

type DailyDataState = DailyDataOjb[];

interface DailyData {
  confirmed: { total: number };
  deaths: { total: number };
  reportDate: string;
}

interface CountryData {
  name: string;
}

type CountryState = string[];

function App() {
  const [data, setData] = useState<DataState | null>(null);
  const [dailyData, setDailyData] = useState<DailyDataState | null>(null);
  const [countries, setCountries] = useState<CountryState | null>(null);

  useEffect(() => {
    const fetchedData = async () => {
      const data = await fetchData();
      setData(data);
    };
    fetchedData();
  }, []);

  useEffect(() => {
    const fetchedDailyData = async () => {
      const dailyData = await fetchDailyData();
      const modifiedData = dailyData.map((data: DailyData) => ({
        confirmed: data.confirmed.total,
        deaths: data.deaths.total,
        date: data.reportDate,
      }));
      setDailyData(modifiedData);
    };
    fetchedDailyData();
  }, [setDailyData]);

  useEffect(() => {
    const fetchedCountries = async () => {
      const countryApi = await fetchCountries();
      const modifiedCountries = countryApi.map(
        (country: CountryData) => country.name
      );
      setCountries(modifiedCountries);
    };
    fetchedCountries();
  }, [setCountries]);

  const handleCountryChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const country = event.target.value;

    if (country !== "global") {
      const fetchedCountryData = await fetchData(country);
      setData(fetchedCountryData);
    } else {
      setData(await fetchData());
    }
  };

  return (
    <div className={classes.App}>
      <img
        src="/covid-19.png"
        alt="covid-19"
        className={classes.covid__image}
      />
      {data && (
        <Cards
          confirmed={data.confirmed.value}
          recovered={data.recovered.value}
          deaths={data.deaths.value}
          lastUpdate={data.lastUpdate}
        />
      )}
      {countries && (
        <Country countryChange={handleCountryChange} countries={countries} />
      )}
      {dailyData && <Chart dailyData={dailyData} />}
    </div>
  );
}

export default App;
