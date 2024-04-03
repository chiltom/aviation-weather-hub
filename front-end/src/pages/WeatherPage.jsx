import { useState, useEffect } from "react";
import axios from "axios";

const WeatherPage = () => {
  const [latitude, setLatitude] = useState(32.0111);
  const [longitude, setLongitude] = useState(-81.147);
  const [model, setModel] = useState("namConus");
  const [parameters, setParameters] = useState([
    "temp",
    "dewpoint",
    "precip",
    "convPrecip",
    "snowPrecip",
    "wind",
    "windGust",
    "cape",
    "ptype",
    "lclouds",
    "mclouds",
    "hclouds",
    "rh",
    "gh",
    "pressure",
  ]);
  const [levels, setLevels] = useState(["surface"]);
  const [data, setData] = useState(null);

  useEffect(() => {
    const postRequest = async () => {
      const body = {
        lat: latitude,
        lon: longitude,
        model: model,
        parameters: parameters,
        levels: levels,
        key: `${import.meta.env.VITE_REACT_APP_POINT_API_KEY}`,
      };
      const response = await axios.post(
        "https://api.windy.com/api/point-forecast/v2",
        body
      );
      console.log(response);
      setData(response.data);
    };
    postRequest();
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
