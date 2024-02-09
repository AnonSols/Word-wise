import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCity } from "../context/CityContext";

const CityList = () => {
  const { cities, isLoading } = useCity();
  if (isLoading && isLoading) return <Spinner />;
  if (cities && !cities.length)
    return (
      <Message
        message={"Add your first city by clicking on a city on the map"}
      />
    );
  return (
    <ul className={styles.cityList}>
      {cities && cities.map((city) => <CityItem city={city} key={city.id} />)}
    </ul>
  );
};

export default CityList;
