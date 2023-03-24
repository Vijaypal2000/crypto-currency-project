import { createSlice } from "@reduxjs/toolkit";

const ThemeSlice = createSlice({
	name: "theme",
	initialState:'dark',
    reducers:{
        // create a "setThemeDark" reducer function that will set the theme to "dark"
            setThemeDark(state,action){
                return action.payload
            },
            // create a "setThemeLight" reducer function that will set the theme to "light"
            setThemeLight(state,action){
                return action.payload
            }

    }
});

export const  {setThemeLight, setThemeDark} = ThemeSlice.actions;
export default ThemeSlice.reducer;
