import { createSlice } from "@reduxjs/toolkit";

// Create a new slice of the Redux store called "phone"
const PhoneSlice = createSlice({
	name: "phone",
	initialState: {
        chartDisplay:'flex' // Initialize the chartDisplay property to 'flex'
    },
	reducers: {
		setChartDisplay(state, action) {
            state.chartDisplay=action.payload // Set the chartDisplay property to the value provided in the action payload
		},
		
	},
});

export default PhoneSlice.reducer;
export const { setChartDisplay } = PhoneSlice.actions;
