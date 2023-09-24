import { useEffect, useState } from "react";
import { useUrlPosition } from "./useUrlPosition";

import styles from "./Form.module.css";
import Button from "./Button";

import BackButton from "./BackButton";
import Message from "./Message";
import Spinner from "./Spinner";

// eslint-disable-next-line react-refresh/only-export-components
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const { latmap, lngmap } = useUrlPosition();
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeoCodes, setIsLoadingGeoCodes] = useState(false);
  const [EmojiCode, setEmojiCode] = useState("");
  const [geoError, setGeoError] = useState("");

  useEffect(
    function () {
      async function reverseGeo() {
        try {
          setIsLoadingGeoCodes(true);
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latmap}&longitude=${lngmap}`
          );
          const data = await res.json();
          setGeoError("");
          if (!data.countryCode)
            throw new Error(
              "This is not a city 🫤, please click somewhere else. Thanks 😊"
            );

          setCityName(data.countryName ? data.city || data.locality : "");
          setCountry(data.countryName);
          const emojiCode = convertToEmoji(data.countryCode);
          setEmojiCode(emojiCode);
          setIsLoadingGeoCodes(false);
        } catch (err) {
          setGeoError(err.message);
        }
      }
      reverseGeo();
    },
    [latmap, lngmap]
  );
  if (isLoadingGeoCodes) return <Spinner />;
  if (geoError) return <Message message={geoError} />;
  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{EmojiCode}</span>
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
        <Button type="primary">ADD</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
