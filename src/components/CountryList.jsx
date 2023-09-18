import styles from "./CountryList.module.css";
import Message from "./Message";

import Spinner from "./Spinner";
import CountryItem from "./CountryItem";

function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return <Message message="Add Your First City by clicking on the map" />;

  const countries = cities.reduce((arr, curr) => {
    if (!arr.map((el) => el.country).includes(curr.country))
      return [
        ...arr,
        { country: curr.country, emoji: curr.emoji, id: curr.id },
      ];
    else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((countrydata) => (
        <CountryItem countrydata={countrydata} key={countrydata.id} />
      ))}
    </ul>
  );
}

export default CountryList;
