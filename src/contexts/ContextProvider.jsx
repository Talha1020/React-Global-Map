import { createContext, useContext, useEffect, useState } from "react";

const context = createContext(null);
function useCities() {
  return useContext(context);
}
const URL = "http://localhost:9000";
function Provider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch(`${URL}/cities`);
        const data = await res.json();
        setCities(data);
        setIsLoading(false);
      } catch {
        alert("There was an error loading data");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  async function getCityDetails(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`http://localhost:9000/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
      setIsLoading(false);
    } catch {
      alert("There was an error loading data");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <context.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCityDetails,
      }}
    >
      {children}
    </context.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export { Provider, useCities };
