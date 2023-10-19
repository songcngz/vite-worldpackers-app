import { useCities } from "../contexts/CitiesContext";
import CountryItem from "./CountryItem";
import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import Message from "./Message";
function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  const countries = cities.reduce((prev, city) => {
    if (!prev.map((el) => el.countryName).includes(city.country))
      return [...prev, { countryName: city.country, emoji: city.emoji }];
    else return prev;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country, i) => (
        <CountryItem country={country} key={i} />
      ))}
    </ul>
  );
}

export default CountryList;
