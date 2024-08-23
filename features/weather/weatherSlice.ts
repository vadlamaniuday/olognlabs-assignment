"use client"
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getWeatherInfo } from '@/lib/services';

export const fetchWeatherInfo = createAsyncThunk(
  'weather/fetchWeatherInfo',
  async (localityId: string) => {
    const response = await getWeatherInfo(localityId);
    return response.locality_weather_data;
  }
);

interface WeatherState {
  data: any;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: WeatherState = {
  data: null,
  status: 'idle',
  error: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherInfo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWeatherInfo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchWeatherInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default weatherSlice.reducer;