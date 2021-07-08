import { ICity } from "features/weatherforecast/weatherforecastTypes";

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