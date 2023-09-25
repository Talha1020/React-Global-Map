import { useEffect, useState } from "react";
import { useUrlPosition } from "./useUrlPosition";

import styles from "./Form.module.css";
import Button from "./Button";

import BackButton from "./BackButton";
import Message from "./Message";
import Spinner from "./Spinner";
import { latLng } from "leaflet";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import { useCities } from "../contexts/ContextProvider";

// eslint-disable-next-line react-refresh/only-export-components
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
export default function Form() {
  const { PostData } = useCities();
  const [cityName, setCityName] = useState("");
  const { latmap, lngmap } = useUrlPosition();
  const [country, setCountry] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoadingGeoCodes, setIsLoadingGeoCodes] = useState(false);
  const [EmojiCode, setEmojiCode] = useState("");
  const [geoError, setGeoError] = useState("");

  const navigate = useNavigate();

  useEffect(
    function () {
      async function reverseGeo() {
        if (!latmap && !lngmap) return;
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
        } finally {
          setIsLoadingGeoCodes(false);
        }
      }
      reverseGeo();
    },
    [latmap, lngmap, setDate]
  );
  if (isLoadingGeoCodes) return <Spinner />;
  if (geoError) return <Message message={geoError} />;
  if (!latmap && !lngmap)
    return <Message message="Start by cicking on the map ✈️" />;

  function HandleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;
    if (!latmap && !lngmap) return;
    const cityData = {
      cityName,
      country,
      date,
      notes,
      position: { lat: latmap, lng: lngmap },
      emoji: EmojiCode,
      // id,
    };
    PostData(cityData);
    navigate(`/app/cities`);
  }
  return (
    <form onSubmit={HandleSubmit} className={styles.form}>
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
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
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
