"use client";
import React, { ChangeEvent, useState } from "react";
import weatherData from "../db.json";
import { getWeatherInfo } from "@/lib/services";

interface WeatherInfo {
  cityName: string;
  localityName: String;
  localityId: string;
  latitude: number;
  longitude: number;
  device_type: string;
}

interface WeatherData {
  weatherInfo: WeatherInfo[];
}

const SearchInput = () => {
  const [input, setInput] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [localityID, setLocalityID] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

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
      console.log(suggestions);
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

  const handleGetWeatherInfo = async () => {
    if (localityID) {
      try {
        const response = await getWeatherInfo(localityID);
        setData(response.locality_weather_data);
      } catch (error) {
        console.error("Error fetching weather info:", error);
      }
    }
  };
  return (
    <div className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8">
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
            <ul className="absolute left-0 right-0 bg-white border mt-2 rounded-lg shadow-lg max-h-56 overflow-y-auto">
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
            className="px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base bg-gray-100 rounded hover:shadow"
            onClick={handleGetWeatherInfo}
          >
            Get Weather Info
          </button>
        </div>
        {data && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Weather Information</h2>
            <ul className="mt-4">
              <li>Temperature: {data.temperature}°C</li>
              <li>Humidity: {data.humidity}%</li>
              <li>Wind Speed: {data.wind_speed} m/s</li>
              <li>Wind Direction: {data.wind_direction}°</li>
              <li>Rain Intensity: {data.rain_intensity}</li>
              <li>Rain Accumulation: {data.rain_accumulation}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
export default SearchInput;
