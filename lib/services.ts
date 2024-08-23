export const getWeatherInfo = async (locality_id: string) => {
  try {
    const response = await fetch(
      `https://www.weatherunion.com/gw/weather/external/v0/get_locality_weather_data?locality_id=${locality_id}`,
      {
        headers: {
          'X-Zomato-Api-Key': process.env.NEXT_PUBLIC_API_KEY || '', 
        },
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error; 
  }
};
