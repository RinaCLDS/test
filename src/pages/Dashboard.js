import React, { useEffect, useState } from "react";
import L from "leaflet";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  GeoJSON,
  useMapEvents,
} from "react-leaflet"; //import react-leaflet packages
import avatar from "../images/avatar.jpg";
import mapData from "./../data/countries.json";
import "./../App.css";
import Loading from "./Loading";

const maxBounds = L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180));

// Legends

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [countryData, setCountryData] = useState(["Philippines"]); //country data will go here
  const openDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const locationStyle = {
    weight: 1,
    color: "rgb(107, 114, 128)",
    fillColor: "white",
    fillOpacity: 1,
  };

  const countryMouseOver = (event) => {
    event.target.setStyle({
      fillColor: "rgba(125, 211, 252, 0.5)",
    });
    event.target.openPopup();
  };

  const countryMouseOut = (event) => {
    event.target.setStyle({
      fillColor: "white",
    });
    event.target.closePopup();
  };

  const movePopup = (event) => {
    const popup = event.target.getPopup();
    if (popup && popup.isOpen()) {
      popup.setLatLng(event.latlng);
    } else {
      event.target.openPopup();
    }
  };

  const onEachCountry = (country, layer) => {
    const countryName = country.properties.ADMIN;
    const population = "'s (population data will go here)"; //Population Data
    layer.bindPopup(`${countryName}${population}`, {
      closeButton: false,
      autoPan: false,
    });
    layer.on({
      mouseover: countryMouseOver,
      mouseout: countryMouseOut,
      mousemove: movePopup, // Call the movePopup function on mousemove event
    });
  };

  const handleFindLocation = () => {
    setIsEnabledLocation(true);
  };

  const handleLocationFound = () => {
    setIsEnabledLocation(false);
  };

  const [isLocationEnabled, setIsEnabledLocation] = useState(false);
  const FindCurrentLocation = ({ isEnabled, onLocationFound }) => {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      click() {
        if (isEnabled) {
          map.locate();

        }
      },
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom(), map.zoomIn(5));
        onLocationFound();
      },
    });

    useEffect(() => {
      if (isEnabled) {
        map.locate();
      }
    }, [isEnabled, map]);

    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    );
  };

  return (
    <div className="main">
      <div className="flex justify-between items-center px-7 py-2 bg-gray-900 text-gray-50 shadow">
        <div className="font-bold tracking-wider ">Gurjar.</div>

        <button
          onClick={openDropdown}
          className="inline-block h-9 w-9 rounded-full ring-4 ring-transparent hover:ring-slate-800 cursor-pointer active:ring-transparent"
        >
          <img
            className="overflow-hidden rounded-full"
            src={avatar}
            alt="avatar"
          />
        </button>
        {isOpen && (
          <div className="absolute right-1 top-10 mt-2 bg-gray-700 divide-y divide-gray-500 rounded-lg shadow-lg z-20">
            <div
              className="py-3 flex flex-col"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {/* Add your dropdown options here */}
              <div
                className="px-4 text-left text-sm text-gray-50"
                role="menuitem"
              >
                John Doe
              </div>
              <div
                className="px-4 text-left text-sm text-gray-50"
                role="menuitem"
              >
                johndoe@gmail.com
              </div>
            </div>
            <div
              className="py-1 flex flex-col"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {/* Add your dropdown options here */}
              <button
                className="px-4 text-left py-2 text-sm text-gray-50 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                Dashboard
              </button>
              <button
                className="px-4 text-left py-2 text-sm text-gray-50 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                Profile Settings
              </button>
              <button
                className="px-4 text-left py-2 text-sm text-gray-50 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                Points
              </button>
            </div>
            <div
              className="py-1 flex flex-col"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {/* Add your dropdown options here */}
              <button
                className="px-4 text-left py-2 text-sm text-gray-50 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-5xl">
        {/* MAP */}
        <div className="my-2 shadow">
          {/* Map Container, where all map the customizing goes... */}
          <MapContainer
            center={[51.505, -0.09]}
            zoom={2}
            scrollWheelZoom={false}
            style={{ height: "70vh", zIndex: 0 }}
            maxBounds={maxBounds} // Set the maxBounds option
            maxBoundsViscosity={1.0} // Adjust the viscosity as needed
          >
            <div>
              {countryData.length === 0 ? (
                <Loading />
              ) : (
                <div>
                  <TileLayer
                    attribution='&copy; <a href="https://carto.com/">Carto</a> contributors'
                    url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
                    zIndex={0}
                    minZoom={2}
                  />

                  <GeoJSON
                    style={locationStyle}
                    data={mapData.features}
                    onEachFeature={onEachCountry}
                  />

                  {/* The Marker and the popup tells the place you started. (A follow up feature where you will start at your current location should be added ) */}
                  <FindCurrentLocation
                    isEnabled={isLocationEnabled}
                    onLocationFound={handleLocationFound}
                  />
                </div>
              )}
            </div>

            {/* Here as you can see, I put a different tile layer (Carto maps) to continue customizing panes*/}
          </MapContainer>
        </div>

        <button
          className="bg-blue-800 text-gray-50 rounded-lg p-2 w-full mb-10 shadow"
          onClick={handleFindLocation}
        >
          Find Current Location
        </button>

        {/* User */}
        <div className="mb-10">
          <p>Gurjar Population of the World: </p>
          <p>Gurjar Population of India: </p>
          <p>Gurjar ID: </p>
          <p>Gurjar Points: </p>
        </div>

        {/* Map Details */}
        <table className="table-auto w-full text-left shadow rounded-lg">
          <thead className="bg-gray-900 text-gray-50 px-4 py-2">
            <tr>
              <th className="px-4 py-2 rounded-tl-lg">Countries</th>
              <th className="px-4 py-2 rounded-tr-lg">Population</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            <tr>
              <td className="pl-4 pr-2 py-1">India</td>
              <td className="pl-4 pr-2 py-1">99,999</td>
            </tr>
            <tr>
              <td className="pl-4 pr-2 py-1">Philippines</td>
              <td className="pl-4 pr-2 py-1">78,381</td>
            </tr>
            <tr>
              <td className="pl-4 pr-2 py-1">Vietnam</td>
              <td className="pl-4 pr-2 py-1">100,101</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
