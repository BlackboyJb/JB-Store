import { PRODUCT_URL } from "../constant";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ keywords, pageNo }) => ({
        url: PRODUCT_URL,
        params: {
          keywords,
          pageNo,
        },
      }),
      providesTags: ["Products"],
      keepUnusedDataFor: 5,
    }),
    getProductsbyId: builder.query({
      query: (productID) => ({
        url: `${PRODUCT_URL}/${productID}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createProducts: builder.mutation({
      query: () => ({
        url: PRODUCT_URL,
        method: "POST",
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/${data.productId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `/api/upload`,
        method: "POST",
        body: data,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`,
        method: "DELETE",
      }),
    }),
    createReviews: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/${data.productId}/reviews`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    getTopProduct:builder.query({
      query:() => ({
        url:`${PRODUCT_URL}/top`
      }),
      keepUnusedDataFor:5
    })
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsbyIdQuery,
  useCreateProductsMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useCreateReviewsMutation,
  useGetTopProductQuery
} = productApiSlice;
