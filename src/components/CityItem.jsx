import { useCities } from "../contexts/ContextProvider";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ citydata }) {
  const { currentCity, DeleteData } = useCities();
  const { cityName, emoji, date, id, position } = citydata;
  function HandleDelete(e) {
    e.preventDefault();
    DeleteData(id);
  }
  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button onClick={HandleDelete} className={styles.deleteBtn}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
