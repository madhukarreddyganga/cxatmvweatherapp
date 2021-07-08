import { RootState } from 'app/store';
import { configureStore } from '@reduxjs/toolkit';
import weatherforecastReducer from 'features/weatherforecast/WeatherforecastSlice';

export const getStore = (initialState: Partial<RootState> | undefined = undefined) => {
    return configureStore({
        reducer: {
            weatherforecast: weatherforecastReducer
        }
    })
}
