// import styles from "./City.module.css";

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCity } from "../context/CityContext";
import styles from "./City.module.css";
import Button from "./Button/Button";
import Spinner from "./Spinner";
import BackButton from "./Button/BackButton";

const formatDate = (date: string | null) =>
  date !== null &&
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  // TEMP DATA
  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    id !== undefined && getCity(id);
  }, [id]);

  const { getCity, currentCity, isLoading } = useCity();

  const { cityName, emoji, date, notes } = currentCity;

  if (isLoading && isLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
