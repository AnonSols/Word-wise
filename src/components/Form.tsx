// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button/Button";
import BackButton from "./Button/BackButton";
import { useCity } from "../context/CityContext";
import { REDUCER_ACTION, positionProp } from "../../types/model";
import { useUrlPosition } from "../Hooks/useUrlPosition";

function Form() {
  const [cityName, setCityName] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [emoji, setEmoji] = useState<string | React.ReactNode>("");
  const [date, setDate] = useState<string>(new Date().toString());
  const [notes, setNotes] = useState<string>("");
  const { convertToEmoji } = useCity();
  const { lat, lng } = useUrlPosition();

  const position: positionProp = {
    lat,
    lng,
  };

  const { addCity } = useCity();
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [ErrorGeoCoding, setErrorGeoCoding] = useState("");

  useEffect(() => {
    // const controller = new AbortController();

    async function geoCoding() {
      try {
        setIsLoadingGeoCoding(true);
        const res = await fetch(
          `${REDUCER_ACTION.DATA_ENDPOINT} lat=${lat}&lng=${lng}`
        );
        if (!res.ok) throw new Error("There was an error fetching Data");
        const data = await res.json();
        if (!data.countryCode)
          throw new Error(
            "That doesn't seem to be a city, Click somewhere else : )"
          );

        console.log(data);
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (e) {
        // if ((e as Error).name !== "AbortError")
        setErrorGeoCoding((e as Error).message);
      } finally {
        setIsLoadingGeoCoding(false);
      }
    }

    geoCoding();

    // return () => controller.abort();
  }, [lat, lng, convertToEmoji]);

  return (
    <>
      {isLoadingGeoCoding && !ErrorGeoCoding ? (
        <form className={styles.form}>
          <div className={styles.row}>
            <label htmlFor="cityName">City name</label>
            <input
              id="cityName"
              onChange={(e) => setCityName(e.target.value)}
              value={cityName}
            />
            <span className={styles.flag}>{emoji}</span>
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
      ) : (
        <h2>{ErrorGeoCoding}</h2>
      )}
    </>
  );
}

export default Form;
