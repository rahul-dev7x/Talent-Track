import { createSlice } from "@reduxjs/toolkit";




const initialState={
    isAuthenticated:false,
    user:null,
    loading:true
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.user=action.payload;
            state.isAuthenticated=true;
        },
        setLoading:(state,action)=>{
            state.loading=action.payload;
        }
    }
})


export const {setUser,setLoading}=authSlice.actions;
export default authSlice.reducer;