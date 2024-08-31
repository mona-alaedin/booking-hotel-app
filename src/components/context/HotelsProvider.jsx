import { createContext, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import useFetche from "../Hooks/useFetch";
const HotelContext = createContext();

function HotelsProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options")).room;
  // const { adult, children, room } = JSON.parse(searchParams.get("options"));
  // const [date] = JSON.parse(searchParams.get("date"));

  const { isLoading, data: hotels } = useFetche(
    `http://localhost:5000/hotels`,
    `q=${destination || ""}&accommodates_gte=${room || 1}`
  );

  return (
    <HotelContext.Provider value={{ isLoading, hotels }}>
      {children}
    </HotelContext.Provider>
  );
}

export default HotelsProvider;

export function useHotels() {
  return useContext(HotelContext);
}
