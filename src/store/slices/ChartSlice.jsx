import { createSlice } from "@reduxjs/toolkit";
import { getChartData } from "../../api";

const ChartSlice = createSlice({
	name: "chart",
	initialState: {
		coinNo: 1,
		coin1: { isLoading: false, data: [], isError: false },
		coin2: { isLoading: false, data: [], isError: false },
		chartList: ["bitcoin"],
		reload: true,
	},
	reducers: {
		// Reducer to set the first item in chart list
		setFirstItemChartList(state, action) {
			state.reload = true;
			state.chartList[0] = action.payload;
			state.coinNo = 1;
		},
		// Reducer to set the second item in chart list
		setSecondItemChartList(state, action) {
			state.reload = true;
			state.chartList[1] = action.payload;
			state.coinNo = 2;
		},
		removeSecondItemChartList(state, action) {
			state.reload = false;
			state.chartList.splice(1, 1);
			state.coin2.data = [];
		},
		interchangeChartItems(state, action) {
			state.reload = false;
			state.coin1.data = state.coin2.data;
			state.coin2.data = [];
			state.chartList[0] = state.chartList[1];
			state.chartList.splice(1, 1);
			state.coinNo = 1;
		},
		setChartReload(state, action) {
			state.reload = action.payload;
		},
	},
	extraReducers: (builder) => {
		// Case to handle successful data fetch
		builder.addCase(getChartData.fulfilled, (state, action) => {
			let coin = action.payload.currentCoin;
			if (coin === state.chartList[0]) {
				state.coin1.isLoading = false;
				state.coin1.isError = false;
				state.coin1.data = action.payload.result.prices;
				if (state.chartList.length !== 1) state.coinNo = 2;
			} else if (coin === state.chartList[1]) {
				state.coin2.isLoading = false;
				state.coin2.isError = false;
				state.coin2.data = action.payload.result.prices;
				if (state.chartList.length !== 1) state.coinNo = 1;
			}
		});
		// Case to handle data fetch in progress
		builder.addCase(getChartData.pending, (state, action) => {
			if (state.coinNo === 1) {
				state.coin1.isLoading = true;
				state.coin1.isError = false;
			} else if (state.coinNo === 2) {
				state.coin2.isLoading = true;
				state.coin2.isError = false;
			}
		});
		// Case to handle data fetch failure
		builder.addCase(getChartData.rejected, (state, action) => {
			console.log("error");
			if (state.coinNo === 1) {
				state.coin1.isLoading = false;
				state.coin1.isError = true;
				console.log(state.chartList.length);
				if (state.chartList.length !== 1) state.coinNo = 2;
			} else if (state.coinNo === 2) {
				state.coin2.isLoading = false;
				state.coin2.isError = true;
				if (state.chartList.length !== 1) state.coinNo = 1;
			}
		});
	},
});

export const {
	setFirstItemChartList,
	setSecondItemChartList,
	removeSecondItemChartList,
	interchangeChartItems,
	setChartReload,
} = ChartSlice.actions;
export default ChartSlice.reducer;
