import { configureStore } from "@reduxjs/toolkit"
import {apiSlice} from './slices/apiSlice.js'
import cartSlice from './slices/cartSlice.js'



const store = configureStore({
    reducer:{
    [apiSlice.reducerPath] : apiSlice.reducer,
    cart:cartSlice
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
})


export default store