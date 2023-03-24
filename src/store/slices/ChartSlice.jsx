import { createSlice } from "@reduxjs/toolkit";
import { getChartData } from "../../api";

const ChartSlice = createSlice({
	name: "chart",
	initialState: {
		all:{isLoading:false,isError:false},
		coin1: { data: [], isError: false },
		coin2: { data: [], isError: false },
		chartList: ['bitcoin'],
		reload:true,
	},reducers:{
		// Reducer to set the first item in chart list
		setFirstItemChartList(state,action){
			state.reload=true;
			state.chartList[0]=action.payload
		},
		// Reducer to set the second item in chart list
		setSecondItemChartList(state,action){
			state.reload=true
			state.chartList[1]=action.payload
		},
		removeSecondItemChartList(state,action){
			state.reload=false
			state.chartList.splice(1,1);
			state.coin2.data=[]
		},
		interchangeChartItems(state,action){
			state.reload=false;
			state.coin1.data=state.coin2.data
			state.coin2.data=[]
			state.chartList[0]=state.chartList[1]
			state.chartList.splice(1,1)
		},
		setChartReload(state,action){
			state.reload=action.payload
		}
	},
	extraReducers: (builder) => {
		// Case to handle successful data fetch
		builder.addCase(getChartData.fulfilled, (state, action) => {
			state.all.isLoading = false;
			if(action.payload[0].status==='fulfilled'){
				state.coin1.data=action.payload[0].value.prices
			}
			else if(action.payload[0].status==='rejected'){
				state.coin1.isError=true
			}

			if(action.payload[1]!==undefined)
			{if (action.payload[1].status === "fulfilled") {
				state.coin2.data = action.payload[1].value.prices;
			}
			else if (action.payload[1].status === "rejected") {
				state.coin2.isError = true;
			} }
		});
		// Case to handle data fetch in progress
		builder.addCase(getChartData.pending, (state, action) => {
			state.all.isLoading=true
		});
		// Case to handle data fetch failure
		builder.addCase(getChartData.rejected, (state, action) => {
			state.all.isError=true
			state.all.isLoading=false
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
