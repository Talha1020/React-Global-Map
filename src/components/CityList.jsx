import styles from "./CityList.module.css";
import Message from "./Message";

import Spinner from "./Spinner";
import CityItem from "./CityItem";

function CityList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return <Message message="Add Your First City by clicking on the map" />;

  return (
    <ul className={styles.cityList}>
      {cities.map((citydata) => (
        <CityItem citydata={citydata} key={citydata.id} />
      ))}
    </ul>
  );
}

export default CityList;
