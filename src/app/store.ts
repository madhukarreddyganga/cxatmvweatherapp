import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import weatherforecastReducer from 'features/weatherforecast/WeatherforecastSlice';

export const store = configureStore({
  reducer: {
    weatherforecast: weatherforecastReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
