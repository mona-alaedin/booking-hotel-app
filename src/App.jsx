import "./App.css";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header/Header";
import LocationList from "./components/locationList/LocationList";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout/AppLayout";
import Hotels from "./components/Hotels/Hotels";
import HotelsProvider from "./components/context/HotelsProvider";
import SingleHotel from "./components/SingleHotel/SingleHotel";
import BookmarkLayout from "./components/BookmarkLayout/BookMarkLayout";
import Bookmark from "./components/Bookmark/Bookmark";
import BookmarkListProvider from "./components/context/BookmarkListContext";

function App() {
  return (
    <div>
      <BookmarkListProvider>
        <HotelsProvider>
          <Toaster />
          <Header />
          <Routes>
            <Route path="/" element={<LocationList />} />
            <Route path="/hotels" element={<AppLayout />}>
              <Route index element={<Hotels />} />
              <Route path=":id" element={<SingleHotel />} />
            </Route>
            <Route path="/bookmarks" element={<BookmarkLayout />}>
              <Route index element={<Bookmark />} />
              <Route path=":id" element={<div>Single Bookmark</div>} />
              <Route path="add" element={<div>Add New Bookmark !</div>} />
            </Route>
          </Routes>
        </HotelsProvider>
      </BookmarkListProvider>
    </div>
  );
}

export default App;
