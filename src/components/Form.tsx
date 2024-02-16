// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button/Button";
import BackButton from "./Button/BackButton";
import { useCity } from "../context/CityContext";
import { REDUCER_ACTION } from "../types/model";
import { useUrlPosition } from "../Hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Form() {
  const [cityName, setCityName] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [emoji, setEmoji] = useState<string>("");
  const [date, setDate] = useState(new Date().toString());
  const [notes, setNotes] = useState<string>("");
  const { convertToEmoji } = useCity();
  const { lat, lng } = useUrlPosition();

  // const position: positionProp = {
  //   lat,
  //   lng,
  // };

  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [ErrorGeoCoding, setErrorGeoCoding] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!cityName && !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };

    console.log(newCity);
  }

  useEffect(() => {
    const controller = new AbortController();

    async function geoCoding() {
      try {
        if (!lat && !lng) return;
        setIsLoadingGeoCoding(true);
        setErrorGeoCoding("");
        const res = await fetch(
          `${REDUCER_ACTION.DATA_ENDPOINT}?latitude=${lat}&longitude=${lng}`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error("There was an error fetching Data");
        const data = await res.json();

        if (!data.countryCode)
          throw new Error(
            "That doesn't seem to be a city, Click somewhere else : )"
          );

        setCityName(data.city || data.locality || "");
        setCountry(data.cityName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (e) {
        if ((e as Error).name !== "AbortError")
          setErrorGeoCoding((e as Error).message);
        console.log(e);
      } finally {
        setIsLoadingGeoCoding(false);
      }
    }

    geoCoding();

    return () => controller.abort();
  }, [lat, lng, convertToEmoji]);

  if (isLoadingGeoCoding) return <Spinner />;
  if (ErrorGeoCoding) return <Message message={ErrorGeoCoding} />;
  if (!lat && !lng) return <Message message="Start by clicking on the map" />;

  return (
    <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
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
        <label htmlFor={"date"}>When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          dateFormat="dd/MM/yyyy"
          selected={date}
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
        <Button type="primary">Add </Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
