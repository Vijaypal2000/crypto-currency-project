import { createSlice } from "@reduxjs/toolkit";
import { getCoins } from "../../api";

const CoinSlice = createSlice({
	name: "coins",
	initialState: {
		isLoading: false, // flag to indicate whether the coins data is currently being loaded
		data: [], // array to hold the coins data
		isError:false, // flag to indicate if there was an error while loading the coins data
	},
	extraReducers: (builder) => {
		builder.addCase(getCoins.fulfilled, (state, action) => {
			state.isLoading=false;  // set the isLoading flag to false as the data has been successfully loaded
			state.data=action.payload; // update the coins data array with the data received from the API
		});
		builder.addCase(getCoins.pending, (state, action) => {
			state.isLoading=true; // set the isLoading flag to true as the data is currently being loaded
		});
		builder.addCase(getCoins.rejected, (state, action) => {
			state.isError=true // set the isError flag to true as there was an error while loading the data
			state.isLoading=false // set the isLoading flag to false as the loading process has completed (even though it was unsuccessful
		});
	},
});

export default CoinSlice.reducer;
