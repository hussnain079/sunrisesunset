import React, { useState } from "react";
import axios from "axios";

const Hello = () => {
  const [formData, setFormData] = useState({
    ip: "",
    latitude: "",
    longitude: "",
    sunrise: "",
    sunset: "",
    error: "",
  });

  const { ip, sunrise, sunset, error } = formData;

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const location = await axios.get(`https://freegeoip.app/json/${ip}`);
      const { latitude, longitude } = location.data;
      const sunData = await axios.get(
        `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}`
      );
      const { sunrise, sunset } = sunData.data.results;
      setFormData({
        ...formData,
        latitude,
        longitude,
        sunrise,
        sunset,
        error: "",
      });
    } catch (error) {
      setFormData({
        ...formData,
        error: "Error fetching data. Please try again.",
      });
    }
  };

  return (
    <>
      <div className="center">
        <form onSubmit={handleSubmit}>
          <div className="mt-5 mb-3">
            <label for="ip" class="form-label">
              Enter IP Address:
            </label>
            <input
              type="text"
              name="ip"
              id="ip"
              value={ip}
              onChange={handleChange}
              placeholder="Enter IP Address"
              className="form-control form-control-lg w-100"
            />
          </div>
          <div className="center">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="center mt-5">
        {error && <p className="text-danger">{error}</p>}
        {sunrise && (
          <p className="text-success">
            Sunrise: {sunrise} | Sunset: {sunset}
          </p>
        )}
      </div>
    </>
  );
};

export default Hello;
