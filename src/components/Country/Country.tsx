import React from "react";
import classes from "./Country.module.scss";

interface Props {
  countryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  countries: string[];
}

const Country = ({ countries, countryChange }: Props) => {
  return (
    <div>
      <form>
        <select onChange={countryChange} className={classes.select}>
          <option value="global">Global</option>
          {countries &&
            countries.map((country: string, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
        </select>
      </form>
    </div>
  );
};

export default Country;
