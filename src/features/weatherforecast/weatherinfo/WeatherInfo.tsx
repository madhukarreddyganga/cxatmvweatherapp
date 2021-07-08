
import React from "react";
import { useAppSelector } from "app/hooks";
import CityWeatherInfo from "features/weatherforecast/weatherinfo/CityWeatherInfo";
import { getWeatherForecastState } from "features/weatherforecast/WeatherforecastSlice";
import styles from "./WeatherInfo.module.css";

function WeatherInfo(){
    const { cityList } = useAppSelector(getWeatherForecastState);
    return (
        <div className={styles.weatherinfoRoot}>
            {cityList.map(city=>(<CityWeatherInfo city={city} key={city.id}/>))}
        </div>
    );
}

export default WeatherInfo;