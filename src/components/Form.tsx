// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button/Button";
import BackButton from "./Button/BackButton";
import { useSearchParams } from "react-router-dom";
import { useCity } from "../context/CityContext";
import { positionProp } from "../../types/model";

function Form() {
  const [cityName, setCityName] = useState<string>("");
  // const [country, setCountry] = useState<string>("");
  const [date, setDate] = useState<string>(new Date().toString());
  const [notes, setNotes] = useState<string>("");

  const [searchParams] = useSearchParams();

  const mapLat = Number(searchParams.get("lat"));
  const mapLng = Number(searchParams.get("lng"));

  const position: positionProp = {
    lat: mapLat,
    lng: mapLng,
  };

  const { addCity } = useCity();
  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button
          type="primary"
          onclick={() => addCity({ cityName, date, notes, position })}
        >
          Add{" "}
        </Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
