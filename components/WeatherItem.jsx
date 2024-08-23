import React from "react";

const WeatherItem = ({ icon, label, value }) => (
  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
    <span className="text-3xl mr-4">{icon}</span>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-xl font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);

export default WeatherItem;
