import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country?: string) => {
  let changedUrl = url;

  if (country) {
    changedUrl = `${url}/countries/${country}`;
  }

  try {
    const response = await axios.get(changedUrl);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDailyData = async () => {
  try {
    const response = await axios.get(`${url}/daily`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountries = async () => {
  try {
    const response = await axios.get(`${url}/countries`);
    return response.data.countries;
  } catch (error) {
    console.log(error);
  }
};
