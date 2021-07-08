import React from 'react';
import CitySearch  from 'features/weatherforecast/citysearch/CitySearch';
import WeatherInfo from 'features/weatherforecast/weatherinfo/WeatherInfo';
import styles from './Weatherforecast.module.css';

function WeatherForecast(){
    return (
        <div className={styles.weatherfcRoot}>
            <h1 className={styles.appTitle}>Weather forecast</h1>
            <CitySearch />
            <WeatherInfo/>
        </div>
    );
}

export default WeatherForecast;