import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetche from "../Hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";

const HotelContext = createContext();
const BASE_URL = "http://localhost:5000";

function HotelsProvider({ children }) {
  const [currentHotel, setCurrentHotel] = useState(null);
  const [isLoadingCurrentHotel, setIsLoadingCurrentHotel] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options"))?.room;

  const { isLoading, data: hotels } = useFetche(
    `${BASE_URL}/hotels`,
    `q=${destination || " "}&accommodates_gte=${room || 1}`
  );
  async function getHotel(id) {
    setIsLoadingCurrentHotel(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      setCurrentHotel(data);
      setIsLoadingCurrentHotel(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoadingCurrentHotel(false);
    }
  }

  return (
    <HotelContext.Provider
      value={{
        hotels,
        isLoading,
        getHotel,
        currentHotel,
        isLoadingCurrentHotel,
      }}>
      {children}
    </HotelContext.Provider>
  );
}

export default HotelsProvider;

export function useHotels() {
  return useContext(HotelContext);
}
