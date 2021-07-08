
import React from 'react';
import clsx from 'clsx';
import { useDispatch } from "react-redux";
import { MdClear } from "react-icons/md";
import { ICity } from "features/weatherforecast/weatherforecastTypes";
import { removeCity } from "features/weatherforecast/WeatherforecastSlice";

import IconButton from "common/ui/IconButton";
import styles from './CityWeatherInfo.module.css';

interface ICityWeatherInfoProps{
    city: ICity
}
function CityWeatherInfo(props: ICityWeatherInfoProps){
    const dispatch = useDispatch();
    const removeCityFromList = () => {
        dispatch(removeCity({cityId: props.city.id}))
    }
    return (
        <div className={styles.cityWeatherInfoRoot}>
            <IconButton className={clsx(styles.deleteIcon, "visibleOnHover")} onClick={removeCityFromList}>
                    <MdClear />
                </IconButton>
            <div className={styles.cityWeatherInfoCard}>
                <div className={styles.currentWeather}>
                    <div className={styles.currentWeatherTitle}>
                        <h2 className={styles.cardTitle}>{props.city.name}, {props.city.country}</h2>
                        <h2 className={styles.dayInfo}>Thursday</h2>
                    </div>
                    <div className={styles.weatherSummary}>
                        <h2 className={styles.temperature}>23 &#8451;</h2>
                        <p>Partially cloudy</p>
                    </div>
                    <div className={styles.currentWeatherInfo}>
                        <div>
                        <h2 className={styles.weatherAttribValue}>23 &#8451;</h2>
                        <h2 className={styles.weatherAttrib}>Feels Like</h2>
                        </div>

                        <div>
                        <h2 className={styles.weatherAttribValue}>115</h2>
                        <h2 className={styles.weatherAttrib}>Humidity</h2>

                        </div>
                        <div>
                        <h2 className={styles.weatherAttribValue}>115</h2>
                        <h2 className={styles.weatherAttrib}>Wind Speed</h2>
                        </div>
                    </div>
                </div>
                <div className={styles.forecastData}>
                    <div className={clsx(styles.forecast,styles.forecast1)}>
                        <h2 className={styles.dayInfo}>Friday</h2>
                        <div className={styles.weatherSummary}>
                        <h2 className={styles.temperature}>23 &#8451;</h2>
                        <p>Partially cloudy</p>
                    </div>
                    </div>
                    <div className={clsx(styles.forecast,styles.forecast2)}>
                        <h2 className={styles.dayInfo}>Saturday</h2>
                        <div className={styles.weatherSummary}>
                        <h2 className={styles.temperature}>23 &#8451;</h2>
                        <p>Partially cloudy</p>
                    </div>
                    </div>
                    <div className={clsx(styles.forecast,styles.forecast3)}>
                        <h2 className={styles.dayInfo}>Sunday</h2>
                        <div className={styles.weatherSummary}>
                        <h2 className={styles.temperature}>23 &#8451;</h2>
                        <p>Partially cloudy</p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CityWeatherInfo;