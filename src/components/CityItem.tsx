import { Link } from "react-router-dom";
import { cities } from "../types/cityModel";
import styles from "./CityItem.module.css";
import { useCity } from "../context/CityContext";
type Prop = {
  city: cities;
};

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));
const CityItem = ({ city }: Prop) => {
  const { cityName, emoji, date, id, position } = city;
  // const { lat, lng } = position;
  const { currentCity, deleteCity } = useCity();

  function handleClick(e: React.FormEvent) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${
          currentCity.id === id ? styles["cityItem--active"] : ""
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>

        <time className={styles.date}>({formatDate(date)})</time>
        <button
          className={styles.deleteBtn}
          onClick={(e: React.FormEvent) => handleClick(e)}
        >
          &times;
        </button>
      </Link>
    </li>
  );
};

export default CityItem;
