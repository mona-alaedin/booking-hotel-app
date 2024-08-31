import React from "react";
import useFetche from "./../Hooks/useFetch";

function LocationList() {
  const { data, isLoading } = useFetche("http://localhost:5000/hotels", "");
  if (isLoading) <p>Loading...</p>;
  return (
    <div className="nearbyLocations">
      <h2>Nearby Locations</h2>
      <div className="locationList">
        {data.map((item) => {
          return (
            <div key={item.id} className="locationItem">
              <img src={item.medium_url} alt={item.name} />
              <div className="locationItemDesc">
                <p className="location">{item.smart_location}</p>
                <p className="name">{item.name}</p>
                <p className="price">
                  {item.price}&nbsp;
                  <span>night</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LocationList;
