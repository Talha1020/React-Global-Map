import styles from "./CountryItem.module.css";

function CountryItem({ countrydata }) {
  return (
    <li className={styles.countryItem}>
      <span>{countrydata.emoji}</span>
      <span>{countrydata.country}</span>
    </li>
  );
}

export default CountryItem;
