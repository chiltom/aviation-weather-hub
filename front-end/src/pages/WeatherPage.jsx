import { useState, useEffect } from "react";
import axios from "axios";

const WeatherPage = () => {
  // TODO: Use Geocoding API later to change city names into lat/lon if users do not know ICAO codes,
  // have separate endpoint to look up this data by lat/lon instead of by ICAO code
  const [latitude, setLatitude] = useState(32.0111);
  const [longitude, setLongitude] = useState(-81.147);
  const [icao, setIcao] = useState("KSVN");
  const [data, setData] = useState(null);

  // Testing get request to API endpoint for icao code and taf: WORKING
  // Use get request with header of API Key to grab TAF for ICAO code
  // Can add more than one icao code by separating them by commas
  //  - Possible use an array to store multiple locations that are checked off and use a join to ping endpoint
  useEffect(() => {
    const getRequest = async () => {
      const response = await axios.get(`https://api.checkwx.com/taf/${icao}`, {
        headers: {
          "X-API-Key": `${import.meta.env.VITE_REACT_APP_CHECK_WX_KEY}`,
        },
      });
      console.log(response.data);
      setData(response.data);
    };
    getRequest();
  }, []);

  // Testing get request for API endpoint for lat/lon and metar: WORKING
  useEffect(() => {
    const getRequestTwo = async () => {
      const response = await axios.get(
        `https://api.checkwx.com/metar/lat/${latitude}/lon/${longitude}`,
        {
          headers: {
            "X-API-Key": `${import.meta.env.VITE_REACT_APP_CHECK_WX_KEY}`,
          },
        }
      );
      console.log(response.data);
    };
    getRequestTwo();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <h1>Weather Page</h1>
    </>
  );
};

export default WeatherPage;
