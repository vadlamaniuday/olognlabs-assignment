export const getWeatherInfo = async (locality_id: string) => {
  try {
    const response = await fetch(
      `https://www.weatherunion.com/gw/weather/external/v0/get_locality_weather_data?locality_id=${locality_id}`,
      {
        headers: {
          'X-Zomato-Api-Key': "58fe197bf8a9b07a97008541420ef509" || '', 
        },
      }
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error; 
  }
};
