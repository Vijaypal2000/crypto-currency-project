import { createSlice } from "@reduxjs/toolkit";

// Define a new slice of the Redux store called "alert"
const AlertSlice = createSlice({
	name: "alert",
	initialState:{
        type:'',
        message:''
    },
	// Define the reducers for the slice
	reducers: {
		// Define an action called "setAlert"
		setAlert(state, action) {
			// Update the state with the type and message values passed in the action payload
			state.type= action.payload.type;
			state.message= action.payload.message;
		}
	},
});

export const { setAlert } = AlertSlice.actions;
export default AlertSlice.reducer;
