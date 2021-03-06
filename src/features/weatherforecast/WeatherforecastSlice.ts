import { ICity, ICityWeatherData } from "features/weatherforecast/weatherforecastTypes";
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCityWeatherData } from "features/weatherforecast/weatherforecastService";
import { RootState } from 'app/store';

export interface IWeatherForecastState {
    cityList: ICity[],
    cityWeatherData: { [key: string]: ICityWeatherData }
}

export const CITY_LIST_LOCAL_SK = "CITY_LIST_LOCAL_SK";

const atlantaCity = {
    id: 4180439,
    name: 'Atlanta',
    country: 'US',
    lat: 33.749,
    lon: -84.388
};

const getCityListFromLocalStorage = (): ICity[] => {
    const cityListString = localStorage.getItem(CITY_LIST_LOCAL_SK);
    if (cityListString) {
        const cityList = JSON.parse(cityListString) as ICity[];
        if (cityList.length > 0) {
            return cityList;
        }
    }
    return [atlantaCity]
}

export const getInitialState = (): IWeatherForecastState => ({
    cityList: getCityListFromLocalStorage(),
    cityWeatherData: {},
});

export const fetchCityWeatherDataThunk = createAsyncThunk(
    'fetchCityWeatherData',
    async (city: ICity) => {
        return await fetchCityWeatherData(city);
    }
);

const addCityReducer = (state: IWeatherForecastState, action: PayloadAction<{ city: ICity }>) => {
    //remove the city if it is already added.
    const filteredCityList = state.cityList.filter(city => city.id !== action.payload.city.id);
    // Add the city to the front of the list
    const updatedCityList = [
        action.payload.city,
        ...filteredCityList
    ];

    localStorage.setItem(CITY_LIST_LOCAL_SK, JSON.stringify(updatedCityList));

    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    state.cityList = updatedCityList;
}

const removeCityReducer = (state: IWeatherForecastState, action: PayloadAction<{ cityId: number }>) => {
    const updatedCityList = state.cityList.filter(city => city.id !== action.payload.cityId);
    localStorage.setItem(CITY_LIST_LOCAL_SK, JSON.stringify(updatedCityList));
    delete state.cityWeatherData[action.payload.cityId];
    state.cityList = updatedCityList;
}

export const weatherforecastSlice = createSlice({
    name: 'weatherforecast',
    initialState: getInitialState(),
    reducers: {
        addCity: addCityReducer,
        removeCity: removeCityReducer
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCityWeatherDataThunk.pending, (state, action) => {
                state.cityWeatherData[action.meta.arg.id] = { state: 'loading' }
            })
            .addCase(fetchCityWeatherDataThunk.fulfilled, (state, action) => {
                state.cityWeatherData[action.meta.arg.id] = action.payload;
            })
    },
});

export const { addCity, removeCity } = weatherforecastSlice.actions;
export const getWeatherForecastState = (state: RootState) => state.weatherforecast;


export default weatherforecastSlice.reducer;