import { createSlice } from "@reduxjs/toolkit";

const RecentSlice = createSlice({
	name: "recent",
	initialState: [],
	reducers: {
		// create a "addRecentCoin" reducer function that will add a new coin to the beginning of the state array
		addRecentCoin(state,action){
         state.unshift(action.payload)
        },
		// create a "removeRecentCoin" reducer function that will remove a coin from the state array by name
		removeRecentCoin(state,action){

        return state.filter((item)=>{
			return item.name!==action.payload.name
		 })
        }
	},
});

export default RecentSlice.reducer;
export const {addRecentCoin,removeRecentCoin}=RecentSlice.actions
