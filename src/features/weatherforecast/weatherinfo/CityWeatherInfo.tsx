
import React from 'react';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from "app/hooks";
import { MdClear } from "react-icons/md";
import Throbber from 'common/ui/Throbber';
import { ICity } from "features/weatherforecast/weatherforecastTypes";
import { removeCity, fetchCityWeatherDataThunk, getWeatherForecastState } from "features/weatherforecast/WeatherforecastSlice";
import IconButton from "common/ui/IconButton";
import styles from './CityWeatherInfo.module.css';

interface ICityWeatherInfoProps{
    city: ICity
}
function CityWeatherInfo(props: ICityWeatherInfoProps){
    const dispatch = useAppDispatch();
    const {cityWeatherData} = useAppSelector(getWeatherForecastState);
    React.useEffect(()=>{
        if(!cityWeatherData[props.city.id]){
            dispatch(fetchCityWeatherDataThunk(props.city));
        }
    }, [cityWeatherData,dispatch, props.city]);
    const removeCityFromList = () => {
        dispatch(removeCity({cityId: props.city.id}))
    }
    const currentCityWeatherData = cityWeatherData[props.city.id];
    return (
        <div className={styles.cityWeatherInfoRoot}>
            {currentCityWeatherData?.state === 'loading' && <Throbber/>}
            <IconButton className={clsx(styles.deleteIcon, "visibleOnHover")} onClick={removeCityFromList}>
                <MdClear />
            </IconButton>
            <div className={styles.cityWeatherInfoCard}>
                <div className={styles.currentWeather}>
                    <div className={styles.currentWeatherTitle}>
                        <h2 className={styles.cardTitle}>{props.city.name}, {props.city.country}</h2>
                        <h2 className={styles.dayInfo}>{currentCityWeatherData?.current?.curDay}</h2>
                    </div>
                    <div className={styles.weatherSummary}>
                        <h2 className={styles.temperature}>{currentCityWeatherData?.current?.temp} &#8451;</h2>
                        <p>{currentCityWeatherData?.current?.weather}</p>
                    </div>
                    <div className={styles.currentWeatherInfo}>
                        <div>
                        <h2 className={styles.weatherAttribValue}>{currentCityWeatherData?.current?.feelsLike} &#8451;</h2>
                        <h2 className={styles.weatherAttrib}>Feels Like</h2>
                        </div>

                        <div>
                        <h2 className={styles.weatherAttribValue}>{currentCityWeatherData?.current?.humidity}</h2>
                        <h2 className={styles.weatherAttrib}>Humidity</h2>

                        </div>
                        <div>
                        <h2 className={styles.weatherAttribValue}>{currentCityWeatherData?.current?.windSpeed}</h2>
                        <h2 className={styles.weatherAttrib}>Wind Speed</h2>
                        </div>
                    </div>
                </div>
                <div className={styles.forecastData}>
                    <div className={clsx(styles.forecast,styles.forecast1)}>
                        <h2 className={styles.dayInfo}>{currentCityWeatherData?.foreCastOne?.curDay}</h2>
                        <div className={styles.weatherSummary}>
                            <h2 className={styles.temperature}>{currentCityWeatherData?.foreCastOne?.temp} &#8451;</h2>
                            <p>{currentCityWeatherData?.foreCastOne?.weather}</p>
                        </div>
                    </div>
                    <div className={clsx(styles.forecast,styles.forecast2)}>
                        <h2 className={styles.dayInfo}>{currentCityWeatherData?.foreCastTwo?.curDay}</h2>
                        <div className={styles.weatherSummary}>
                            <h2 className={styles.temperature}>{currentCityWeatherData?.foreCastTwo?.temp} &#8451;</h2>
                            <p>{currentCityWeatherData?.foreCastTwo?.weather}</p>
                        </div>
                    </div>
                    <div className={clsx(styles.forecast,styles.forecast3)}>
                        <h2 className={styles.dayInfo}>{currentCityWeatherData?.foreCastThree?.curDay}</h2>
                        <div className={styles.weatherSummary}>
                            <h2 className={styles.temperature}>{currentCityWeatherData?.foreCastThree?.temp} &#8451;</h2>
                            <p>{currentCityWeatherData?.foreCastThree?.weather}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CityWeatherInfo;