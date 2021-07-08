export type TResourceState = 'loading' | 'error' | 'data_available' | 'initial';
export interface ICity {
    id: number;
    name: string;
    country: string;
    lat: number;
    lon: number;
}
export interface IWeatherData {
    temp: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    weather: string;
    curDay: string;
}
export interface ICityWeatherData {
    state: TResourceState;
    current?: IWeatherData;
    foreCastOne?: IWeatherData;
    foreCastTwo?: IWeatherData;
    foreCastThree?: IWeatherData;
}