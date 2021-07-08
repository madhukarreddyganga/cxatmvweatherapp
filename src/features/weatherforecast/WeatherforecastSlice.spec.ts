import weatherforecastReducer, {
    getInitialState,
    addCity,
    removeCity
} from './WeatherforecastSlice';

describe('WeatherforecastSlice', () => {
    it('should by default show atlanta in cityList', () => {
        const nextState = weatherforecastReducer(undefined, { type: 'unknown' });
        expect(nextState.cityList[0].name).toEqual('Atlanta');
    });
    it('should add city to cityList', () => {
        const tokyoCity = {
            id: 1850144,
            name: 'Tokyo',
            country: 'JP',
            lat: 33.749,
            lon: -84.388
        }
        const nextState = weatherforecastReducer(getInitialState(), addCity({ city: tokyoCity }));
        expect(nextState.cityList[0].name).toEqual('Tokyo');
        expect(nextState.cityList[1].name).toEqual('Atlanta');
    });
    it('should remove city to cityList', () => {
        const tokyoCity = {
            id: 1850144,
            name: 'Tokyo',
            country: 'JP',
            lat: 33.749,
            lon: -84.388
        };
        const initialState = getInitialState();
        initialState.cityList.push(tokyoCity);
        const nextState = weatherforecastReducer(initialState, removeCity({ cityId: 1850144 }));
        expect(nextState.cityList.length).toEqual(1);
        expect(nextState.cityList[0].name).toEqual('Atlanta');
    });
});