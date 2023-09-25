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
      setCurrentCity(currentCity);
      setIsLoading(false);
    } catch {
      alert("There was an error loading data");
    } finally {
      setIsLoading(false);
    }
  }

  async function PostData(newData) {
    try {
      setIsLoading(true);
      const res = await fetch(`${URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      setCities((cities) => [...cities, data]);

      setIsLoading(false);
    } catch {
      alert("There was an error adding the visited city ");
    } finally {
      setIsLoading(false);
    }
  }

  async function DeleteData(id) {
    try {
      setIsLoading(true);
      await fetch(`${URL}/cities/${id}`, {
        method: "DELETE",
      });

      setCities((cities) => cities.filter((city) => city.id !== id));

      setIsLoading(false);
    } catch {
      alert("There was an error deleting the visited city ");
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
        PostData,
        DeleteData,
      }}
    >
      {children}
    </context.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export { Provider, useCities };
