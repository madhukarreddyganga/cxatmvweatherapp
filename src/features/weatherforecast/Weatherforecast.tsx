import React from 'react';
import CitySearch  from 'features/weatherforecast/citysearch/CitySearch';
import styles from './Weatherforecast.module.css';

function WeatherForecast(){
    return (
        <div className={styles.weatherfcRoot}>
            <h1 className={styles.appTitle}>Weather forecast</h1>
            <CitySearch />
        </div>
    );
}

export default WeatherForecast;