import { MdLocationOn } from "react-icons/md";
import {
  HiCalendar,
  HiLogout,
  HiMinus,
  HiPlus,
  HiSearch,
} from "react-icons/hi";
import { BsFillBookmarksFill } from "react-icons/bs";
import { LuLogIn } from "react-icons/lu";
import { FiLogOut } from "react-icons/fi";
import { useRef, useState } from "react";
import useOutsideClick from "../Hooks/useOutsideClick";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { format } from "date-fns/esm";
import {
  createSearchParams,
  Link,
  NavLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider";

function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [destination, setDestination] = useState(
    searchParams.get("destination") || ""
  );
  const [openOptions, setOpenOptions] = useState(false);
  // const [openDateRang, setOpenDateRang] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openDate, setOpenDate] = useState(false);
  const handleOptions = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  const navigate = useNavigate();
  const dateRangeRef = useRef();
  useOutsideClick(dateRangeRef, "dateRange", () => setOpenDate(false));
  const handleSearch = () => {
    const encodedParams = createSearchParams({
      date: JSON.stringify(date),
      destination,
      options: JSON.stringify(options),
    });
    navigate({
      pathname: "/hotels",
      search: encodedParams.toString(),
    });
  };

  return (
    <div className="header">
      <NavLink to="/bookmarks">
        <BsFillBookmarksFill className="bookmark" />
      </NavLink>
      <div className="headerSearch">
        <div className="inputContainer">
          <div className="headerSearchItem input">
            <MdLocationOn className="locationIcon" />
            <input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              type="text"
              placeholder="where to go?"
              className="headerSearchInput"
              name="destination"
              id="destination"
            />
          </div>
          <div className="headerSearchItem searchBtn">
            <button className="headerSearchBtn" onClick={handleSearch}>
              <HiSearch className="searchHeaderIcon" />
            </button>
          </div>
        </div>

        <div className="searchItemsContainer">
          <div className="headerSearchItem dateContainer">
            <HiCalendar className="dateIcon" />
            <div
              onClick={() => setOpenDate(!openDate)}
              className="dateDropDown">
              {`${format(date[0].startDate, "MM/dd/yyyy")} - ${format(
                date[0].endDate,
                "MM/dd/yyyy"
              )}`}
            </div>
            <div ref={dateRangeRef}>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  className="date dateRange"
                  ranges={date}
                  minDate={new Date()}
                  // moveRangeOnFirstSelection={true}
                />
              )}
            </div>
          </div>
          <div className="headerSearchItem">
            <div
              id="optionDropDown"
              onClick={() => setOpenOptions(!openOptions)}>
              <div className="detailOptions">
                {options.adult} adult &bull; {options.children} children &bull;
                {options.room} room
              </div>

              <button className="optionBtn">options</button>
            </div>
            {openOptions && (
              <GuestOptionList
                setOpenOptions={setOpenOptions}
                handleOptions={handleOptions}
                options={options}
              />
            )}
          </div>
        </div>
      </div>
      <User />
    </div>
  );
}

export default Header;

function GuestOptionList({ options, handleOptions, setOpenOptions }) {
  const optionsRef = useRef();
  useOutsideClick(optionsRef, "optionDropDown", () => setOpenOptions(false));
  return (
    <div className="guestOptions" ref={optionsRef}>
      <OptionItem
        handleOptions={handleOptions}
        type="adult"
        options={options}
        minLimit={1}
      />
      <OptionItem
        handleOptions={handleOptions}
        type="children"
        options={options}
        minLimit={0}
      />
      <OptionItem
        handleOptions={handleOptions}
        type="room"
        options={options}
        minLimit={1}
      />
    </div>
  );
}

function OptionItem({ options, type, minLimit, handleOptions }) {
  return (
    <div className="guestOptionItem">
      <span className="optionText">{type}</span>
      <div className="optionCounter">
        <button
          onClick={() => handleOptions(type, "dec")}
          className="optionCounterBtn"
          disabled={options[type] <= minLimit}>
          <HiMinus className="icon" />
        </button>
        <span className="optionCounterNumber">{options[type]}</span>
        <button
          onClick={() => handleOptions(type, "inc")}
          className="optionCounterBtn">
          <HiPlus className="icon" />
        </button>
      </div>
    </div>
  );
}

function User() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthContext();

  const handleLogOut = () => {
    logout();
    navigate("/");
  };
  return (
    <div className="test">
      {isAuthenticated ? (
        <div className="detailUser">
          <div className="userName">{user.name}</div>
          <button onClick={handleLogOut}>
            <FiLogOut className="logout" />
          </button>
        </div>
      ) : (
        <NavLink to="/login">
          <LuLogIn className="login" />
        </NavLink>
      )}
    </div>
  );
}
