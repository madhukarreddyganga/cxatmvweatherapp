import React from "react";
import { Provider } from 'react-redux';
import {
    render,
    fireEvent,
    waitFor,
    screen,
    cleanup,
} from "@testing-library/react";
import { getStore } from "common/testUtils";
import CitySearch from "./CitySearch";
import * as  weatherforecastService from "features/weatherforecast/weatherforecastService";

describe('CitySearch', () => {
    let lookupCityMock: jest.SpiedFunction<typeof weatherforecastService.lookupCity>;
    beforeAll(() => {
        lookupCityMock = jest.spyOn(weatherforecastService, "lookupCity");
    });
    afterAll(() => {
        lookupCityMock.mockRestore();
    });
    afterEach(() => {
        lookupCityMock.mockClear();
        cleanup();
    });
    test("should renders properly", () => {
        const store = getStore();
        render(<Provider store={store}>
            <CitySearch />
        </Provider>);
        expect(screen.getByPlaceholderText("Search for cities...")).toBeTruthy();
    });
    test("should show proper message when user is offline", async () => {
        const navigatorCityMock = jest.spyOn(navigator, "onLine", "get").mockReturnValueOnce(false);
        const store = getStore();
        render(<Provider store={store}>
            <CitySearch />
        </Provider>);
    
        const searchInput = screen.getByPlaceholderText("Search for cities...");
        fireEvent.change(searchInput, { target: { value: "london" } });
        await waitFor(()=>{
            expect(
                screen.queryByText(
                  "No internet is available"
                )
              ).toBeTruthy();
        });
        navigatorCityMock.mockRestore();
      });
    test("should show test result", async () => {
        lookupCityMock.mockResolvedValueOnce(
            {
                id: 2643743,
                name: 'London',
                country: 'GB',
                lat: 51.5085,
                lon: -0.1257
            }
        )
        const store = getStore();
        render(<Provider store={store}>
            <CitySearch />
        </Provider>);
        fireEvent.change(screen.getByPlaceholderText("Search for cities..."), { target: { value: "london" } });
        await waitFor(()=>{
            expect(screen.queryByText("London, GB")).toBeTruthy();
        });
    })
})