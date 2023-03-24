import { createSlice } from "@reduxjs/toolkit";

const WatchSlice = createSlice({
	name: "watch",
	initialState: {
		list: [],
	},
	reducers: {
		// create an "addWatchItem" reducer function that will add a new item to the beginning of the list array
		addWatchItem(state, action) {
			state.list.unshift(action.payload);
		},
		// create a "removeWatchItem" reducer function that will remove an item from the list array
		removeWatchItem(state, action) {
			 state.list= state.list.filter((item) => {
					return item !== action.payload;
				});
		},
		// create a "setWatchList" reducer function that will set the entire list array to a new value
		setWatchList(state,action){
			state.list=action.payload
		}
	},
});

export const { addWatchItem,removeWatchItem,setWatchList } = WatchSlice.actions;
export default WatchSlice.reducer;
