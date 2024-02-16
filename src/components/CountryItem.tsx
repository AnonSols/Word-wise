import { CountryProp } from "../types/model";
import styles from "./CountryItem.module.css";

type prop = {
  Country: CountryProp;
};
function CountryItem({ Country }: prop) {
  const { emoji, country } = Country;
  return (
    <li className={styles.countryItem}>
      <span>{emoji}</span>
      <span>{country}</span>
    </li>
  );
}

export default CountryItem;
