import styles from "./CountryList.module.css";
import { CountryProp } from "../types/cityModel";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";
import { useCity } from "../context/CityContext";

const CountryList = () => {
  const { cities, isLoading } = useCity();
  if (isLoading && isLoading) return <Spinner />;
  if (cities && !cities.length)
    return (
      <Message
        message={"Add your first city by clicking on a city on the map"}
      />
    );
  const check: CountryProp[] = [];

  const countries =
    cities &&
    cities.reduce((arr, city) => {
      if (!arr.map((el) => el.country).includes(city.country))
        return [...arr, { country: city.country, emoji: city.emoji }];
      else return arr;
    }, check);
  return (
    <ul className={styles.countryList}>
      {countries?.map((country) => (
        <CountryItem Country={country} key={country.country} />
      ))}
    </ul>
  );
};

export default CountryList;
