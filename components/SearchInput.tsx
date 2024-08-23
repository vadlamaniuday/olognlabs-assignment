"use client";
import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import weatherData from "../db.json";
import { fetchWeatherInfo } from "@/features/weather/weatherSlice";
import { RootState, AppDispatch } from "@/store";
import WeatherItem from "@/components/WeatherItem";

interface WeatherInfo {
  cityName: string;
  localityName: string;
  localityId: string;
  latitude: number;
  longitude: number;
  device_type: string;
}

interface WeatherData {
  weatherInfo: WeatherInfo[];
}

const SearchInput = () => {
  const dispatch = useDispatch<AppDispatch>();
  const weatherState = useSelector((state: RootState) => state.weather);

  const [input, setInput] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [localityID, setLocalityID] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    if (value.length > 0) {
      const filteredSuggestions = (weatherData as WeatherData).weatherInfo
        .filter((item) =>
          item.localityName.toLowerCase().includes(value.toLowerCase())
        )
        .map((item) => item.localityName)
        .filter((city, index, self) => self.indexOf(city) === index);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    setSuggestions([]);
    const selectedLocality = (weatherData as WeatherData).weatherInfo.find(
      (item) => item.localityName === suggestion
    );
    if (selectedLocality) {
      setLocalityID(selectedLocality.localityId);
    }
  };

  const handleGetWeatherInfo = () => {
    if (localityID) {
      dispatch(fetchWeatherInfo(localityID));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center w-full max-w-4xl">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 text-gray-800">
          Weather Search
        </h1>
        <div className="relative max-w-md sm:max-w-xl md:max-w-2xl mx-auto">
          <input
            type="text"
            className="w-full px-5 py-3 rounded-full border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a city or location"
            value={input}
            onChange={handleInputChange}
          />
          {suggestions.length > 0 && (
            <ul className="absolute left-0 right-0 bg-white border mt-2 rounded-lg shadow-lg max-h-56 overflow-y-auto z-10">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mt-8 space-x-2 sm:space-x-4">
          <button
            className="px-6 py-3 text-sm sm:text-base bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            onClick={handleGetWeatherInfo}
          >
            Get Weather Info
          </button>
        </div>

        {weatherState.status === "loading" && (
          <div className="mt-8 text-gray-600">
            <p className="text-xl">Loading weather data...</p>
          </div>
        )}

        {weatherState.status === "failed" && (
          <div className="mt-8 text-red-500">
            <p className="text-xl">Error: {weatherState.error}</p>
          </div>
        )}

        {weatherState.status === "succeeded" && weatherState.data && (
          <div className="mt-12 bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-blue-500 text-white py-4">
              <h2 className="text-3xl font-semibold">Weather Information</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <WeatherItem
                  icon="🌡️"
                  label="Temperature"
                  value={`${weatherState.data.temperature}°C`}
                />
                <WeatherItem
                  icon="💧"
                  label="Humidity"
                  value={`${weatherState.data.humidity}%`}
                />
                <WeatherItem
                  icon="💨"
                  label="Wind Speed"
                  value={`${weatherState.data.wind_speed} m/s`}
                />
                <WeatherItem
                  icon="🧭"
                  label="Wind Direction"
                  value={`${weatherState.data.wind_direction}°`}
                />
                <WeatherItem
                  icon="🌧️"
                  label="Rain Intensity"
                  value={weatherState.data.rain_intensity}
                />
                <WeatherItem
                  icon="☔"
                  label="Rain Accumulation"
                  value={weatherState.data.rain_accumulation}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default SearchInput;
