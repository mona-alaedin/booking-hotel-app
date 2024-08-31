import "./App.css";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header/Header";
import LocationList from "./components/locationList/LocationList";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout/AppLayout";
import Hotels from "./components/Hotels/Hotels";
import HotelsProvider from "./components/context/HotelsProvider";

function App() {
  return (
    <div>
      <HotelsProvider>
        <Toaster />
        <Header />
        <Routes>
          <Route path="/" element={<LocationList />} />
          <Route path="/hotels" element={<AppLayout />}>
            <Route index element={<Hotels />} />
            <Route path=":id" element={<div>Single Hotels...</div>} />
          </Route>
        </Routes>
      </HotelsProvider>

      {/* <LocationList /> */}
    </div>
  );
}

export default App;
