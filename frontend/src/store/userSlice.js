import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    _id:"",
    email:"",
    name:"",
    avatar:"",
    mobile:"",
    verifyEmail:"",
    lastLoginDate:"",
    status:"",
    addressDetail:"",
    shoppingCart:"",
    orderHistory:"",
    role:"",

}
const userSlice = createSlice({
    name :"user",
    initialState : initialValue,
    reducers:{
        setUserDetails : (state,action)=>{
            state.name= action.payload?.name
            state._id= action.payload?._id
            state.email= action.payload?.email
            state.mobile= action.payload?.mobile
            state.avatar= action.payload?.avatar
            state.verifyEmail= action.payload?.verifyEmail
            state.lastLoginDate= action.payload?.lastLoginDate
            state.status= action.payload?.status
            state.role= action.payload?.role
            state.addressDetail= action.payload?.addressDetail
            state.shoppingCart= action.payload?.shoppingCart
            state.orderHistory= action.payload?.orderHistory
        },
        updatedAvatar : (state,action)=>{
            state.avatar = action.payload
        },
        logout : (state)=>{
            state.name= ""
            state._id=""
            state.email= ""
            state.mobile= ""
            state.avatar= ""
            state.verifyEmail= ""
            state.lastLoginDate=""
            state.status=""
            state.role= ""
            state.addressDetail= []
            state.shoppingCart= []
            state.orderHistory= []
        }
    }
}) 
export const {setUserDetails,logout,updatedAvatar} = userSlice.actions
export default userSlice.reducer 