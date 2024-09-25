/* eslint-disable no-unused-vars */
import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../constant'

const baseQuery = fetchBaseQuery({baseUrl:BASE_URL})


export const apiSlice = createApi({
    baseQuery,
    tagTypes:['Products', 'User', 'Order'],
    endpoints:(builder) => ({})
})