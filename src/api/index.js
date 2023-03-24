// Import the createAsyncThunk function from the Redux Toolkit library
import { createAsyncThunk } from "@reduxjs/toolkit";

// Define an async thunk to fetch data for a list of coins based on the specified currency
export const getCoins = createAsyncThunk("getCoins", async (currency) => {
	// Make a fetch request to the Coingecko API with the specified currency and other parameters
	const response = await fetch(
		`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=250&page=1&sparkline=false`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
	// Convert the response to a JSON object and return it
	return response.json();
});

// Define another async thunk to fetch data for a single coin's market chart
export const getChartData = createAsyncThunk(
	"getChartData",
	async ({chartList,timePeriod,currency}) => {
		// Make a fetch request to the Coingecko API with the specified parameters
		let interval;
		if(timePeriod>5 && timePeriod<70){
			interval='daily'
		}
		else if(timePeriod>70 && timePeriod<190){
			interval='monthly'
		}
		else if (timePeriod>=190){
			interval='yearly'
		}
		else interval='hourly'

		const response1 = await fetch(
			`https://api.coingecko.com/api/v3/coins/${chartList[0]}/market_chart?vs_currency=${currency}&days=${timePeriod}&interval=${interval}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if(chartList[1]!==undefined)
		var response2 = await fetch(
			`https://api.coingecko.com/api/v3/coins/${chartList[1]}/market_chart?vs_currency=${currency}&days=${timePeriod}&interval=${interval}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		// Convert the response to a JSON object and return it
		if(chartList[1]===undefined)
		return Promise.allSettled([response1.json()])
		else return Promise.allSettled([response1.json(),response2.json()]) 


	}
);


