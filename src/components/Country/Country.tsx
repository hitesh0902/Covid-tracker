import React, { useEffect, useState } from "react";
import { fetchCountries } from "../../api/api";

interface Props {
  countryChange: (event: { target: { value: any } }) => void;
}

interface data {
  name: string;
}

type State = string[];

const Country = (props: Props) => {
  const [countries, setCountries] = useState<State | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const countryApi = await fetchCountries();
      const modifiedCountries = countryApi.map((country: data) => country.name);
      setCountries(modifiedCountries);
    };
    fetch();
  }, [setCountries]);

  return (
    <div>
      <form>
        <select onChange={props.countryChange}>
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
