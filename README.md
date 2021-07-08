# Weather forecast app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to run

* clone this repository
* run `yarn`
* run `yarn start`
* open [http://localhost:3000/](http://localhost:3000/) in browser
* search for any city by providing full city name

## City search
Currently city search only supports searching by full name. e.g. if you type `atlan` no result will be there, to get the city you need to type the full city name like `atlanta`.

This is because there is no `city search` api in `openweathermap`. We are just hitting [current weather data](https://openweathermap.org/current) api to get city information. e.g. `id` `lat` `lon`. And later using these information calling [One call](https://openweathermap.org/api/one-call-api) api to get current data as well as 3 days forecast. We need to do some of these decision because of the availability of APIs in free subscriptions.

## Libraries and tools used
This project is built using `react`,`redux` with `typescript`. We also used [Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started) to avoid writing redux boilerplates.