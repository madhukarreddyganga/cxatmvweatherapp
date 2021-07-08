import { ICity, ICityWeatherData, IWeatherData } from "features/weatherforecast/weatherforecastTypes";
import { toDate, format } from 'date-fns';

const API_KEY = "69d8a2ec66988d75784132afe4ca3f1a";
/**
 *  This function will take a query and check if there is any city exist
 *  in openweathermap database by calling current weather data for one location api.
 *  We have to do this as there is no API in openweathermap for city lookup.
 * @param cityQuery
 */
export async function lookupCity(cityQuery: string): Promise<ICity | undefined> {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityQuery}&appid=${API_KEY}`);
        const { cod, coord, sys, id, name } = await response.json();
        if (cod === 200) {
            return {
                id,
                name,
                country: sys.country,
                lat: coord.lat,
                lon: coord.lon
            }
        }
        return undefined;
    } catch (e) {
        console.error(e);
        return undefined;
    }
}
function extractWeatherDataFromResponse(dailyData: any): IWeatherData {
    return {
        temp: dailyData?.temp?.day,
        feelsLike: dailyData?.feels_like?.day,
        humidity: dailyData?.humidity,
        windSpeed: dailyData?.wind_speed,
        weather: dailyData?.weather[0]?.description,
        curDay: format(toDate(dailyData?.dt * 1000), 'iii LLL dd')
    }
}
export async function fetchCityWeatherData(city: ICity): Promise<ICityWeatherData> {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&exclude=minutely,hourly,alerts&units=metric`);
        const { daily } = await response.json();
        return {
            state: 'data_available',
            current: extractWeatherDataFromResponse(daily[0]),
            foreCastOne: extractWeatherDataFromResponse(daily[1]),
            foreCastTwo: extractWeatherDataFromResponse(daily[2]),
            foreCastThree: extractWeatherDataFromResponse(daily[3])
        }
    } catch (e) {
        console.error(e);
        return {
            state: 'error'
        };
    }
}