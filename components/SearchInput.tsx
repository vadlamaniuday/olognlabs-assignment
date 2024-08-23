import React from "react";
const SearchInput = () => {
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
          />
        </div>
        <div className="mt-8 space-x-2 sm:space-x-4">
          <button className="px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base bg-gray-100 rounded hover:shadow">
            Get Weather Info
          </button>
        </div>
      </div>
    </div>
  );
};
export default SearchInput;
