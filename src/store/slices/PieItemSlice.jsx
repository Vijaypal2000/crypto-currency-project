import { createSlice } from "@reduxjs/toolkit";

// Define a slice for managing a list of pie items
const PieItemSlice=createSlice({
    name:"PieItem",
    initialState:['Bitcoin','Ethereum','Lido Staked Ether'],  // Initial state is an array of default pie items
    reducers:{
        // Reducer function to add a new pie item to the beginning of the array, removing the last item if necessary
    addPieItem(state,action){
        
        let index= state.findIndex((item)=>{
            return item===action.payload
        })
        if(index===(-1))
        {state.pop()
        state.unshift(action.payload)}
         return state
    }
    }
})
// Export the reducer and actions
export default PieItemSlice.reducer
export const {addPieItem}=PieItemSlice.actions
