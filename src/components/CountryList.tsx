import { useEffect } from "react";
import styles from "./CountryList.module.css";
import { CountryProp, cities } from "../../types/model";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";

type Prop = {
  cities?: cities[];
  isLoading?: boolean;
};

const CountryList = ({ cities, isLoading }: Prop) => {
  useEffect;
  if (isLoading) return <Spinner />;
  if (cities && !cities.length)
    return (
      <Message
        message={"Add your first city by clicking on a city on the map"}
      />
    );

  const countries: CountryProp[] =
    cities &&
    cities.reduce((arr, city) => {
      if (!arr.map((el) => el.country).includes(city.country)) {
        return [...arr, { country: city.country, emoji: city.emoji }];
      } else return arr;
    }, []);
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem Country={country} />
      ))}
    </ul>
  );
};

export default CountryList;
