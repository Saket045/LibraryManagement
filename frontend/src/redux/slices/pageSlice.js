import { createSlice } from "@reduxjs/toolkit";

const pageSlice=createSlice({
    name:'page',
    initialState:{
        title:""
    },
    reducers:{
        setPage:(state,action)=>{
            state.title=action.payload;
        }
    }
})

export const {setPage}=pageSlice.actions;
export default pageSlice.reducer;