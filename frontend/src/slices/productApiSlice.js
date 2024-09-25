import { PRODUCT_URL } from "../constant";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCT_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getProductsbyId:builder.query({
       query:(productID) => ({
        url:`${PRODUCT_URL}/${productID}`
       }),
       keepUnusedDataFor:5
    })
  }),
});

export const { useGetProductsQuery, useGetProductsbyIdQuery } = productApiSlice;

