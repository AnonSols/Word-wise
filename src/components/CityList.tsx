import { useEffect } from "react";
import styles from "./CityList.module.css";
import { cities } from "../../types/model";
import CityItem from "./CityItem";
import Spinner from "./Spinner";
import Message from "./Message";

type Prop = {
  cities?: cities[];
  isLoading?: boolean;
};
const CityList = ({ cities, isLoading }: Prop) => {
  useEffect;
  if (isLoading) return <Spinner />;
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
