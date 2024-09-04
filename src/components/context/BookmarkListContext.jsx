import { createContext, useContext, useState } from "react";
import useFetche from "../Hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";

const BookmarkContext = createContext();
const BASE_URL = "http://localhost:5000";

function BookmarkListProvider({ children }) {
  const [currentBookmark, setCurrentBookmark] = useState(null);
  const [isLoadingCurrBookmark, setIsLoadingCurrBookmark] = useState(false);

  const { isLoading, data: bookmarks } = useFetche(`${BASE_URL}/bookmarks`);
  async function getBookmark(id) {
    setIsLoadingCurrBookmark(true);
    setCurrentBookmark(null);
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      setCurrentBookmark(data);
      setIsLoadingCurrBookmark(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoadingCurrBookmark(false);
    }
  }

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        isLoading,
        getBookmark,
        currentBookmark,
        isLoadingCurrBookmark,
      }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export default BookmarkListProvider;

export function useBookmark() {
  return useContext(BookmarkContext);
}
