import React from "react";
import SearchInput from "./SearchInput";
import { useAppDispatch } from "app/hooks";
import { ICity, TResourceState } from "features/weatherforecast/weatherforecastTypes";
import { addCity } from "features/weatherforecast/WeatherforecastSlice";
import { lookupCity } from "features/weatherforecast/weatherforecastService";
import styles from "./CitySearch.module.css";
interface ICitySearchResult {
  state: TResourceState,
  city?: ICity,
  searchQuery: string;
  message?: string;
}

function CitySearch() {
  const [result, setResult] = React.useState<ICitySearchResult>({
    state: 'initial',
    searchQuery: ""
  });
  const dispatch = useAppDispatch();

  const searchCity = async (searchQuery: string) => {
    if (searchQuery.length === 0) {
      setResult({
        state: 'initial',
        searchQuery
      });
    } else if(!navigator.onLine){
      setResult({
        state: 'error',
        message: 'No internet is available',
        searchQuery
      });
    }else {
      setResult({
        state:  'loading',
        searchQuery
      });
      const response = await lookupCity(searchQuery);
      if(response){
        setResult({
          state: 'data_available',
          city: response,
          searchQuery
        })
      }else{
        setResult({
          state: 'error',
          message: 'No city found.',
          searchQuery
        })
      }
    }
  };

  const onSelectCity = () => {
    if(result.city){
      dispatch(addCity({city: result.city}));
    }
    setResult({
      state: 'initial',
      searchQuery: ""
    })
  };

  return (
    <div className={styles.root}>
      <SearchInput onChange={searchCity} value={result.searchQuery} isLoading={result.state === 'loading'}/>
      {result?.city && (
        <div className={styles.searchResults}>
            <button
              className={styles.searchItem}
              key={result?.city.id}
              name={result?.city.name}
              onClick={onSelectCity}
            >
              <span>
                {result?.city.name}, {result?.city.country}
              </span>
            </button>
        </div>
      )}
      <p>{result.message}&nbsp;</p>
    </div>
  );
}

export default CitySearch;
