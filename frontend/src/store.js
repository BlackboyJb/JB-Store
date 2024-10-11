import { configureStore } from "@reduxjs/toolkit"
import {apiSlice} from './slices/apiSlice.js'
import cartSlice from './slices/cartSlice.js'
import authSlice from "./slices/authSlice.js"



const store = configureStore({
    reducer:{
    [apiSlice.reducerPath] : apiSlice.reducer,
    cart:cartSlice,
    auth:authSlice
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
})


export default store