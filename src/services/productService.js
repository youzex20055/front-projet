import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:1337/api/' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => 'products?populate=*',
      transformResponse: (response) => {
        console.log('Products Response:', response);
        return response;
      },
    }),
    getProshirts: builder.query({
      query: () => 'proshirts?populate=*',
      transformResponse: (response) => {
        console.log('Shirts Response:', response);
        return response;
      },
    }),
    getProacc: builder.query({
      query: () => 'proaccs?populate=*',
      transformResponse: (response) => {
        console.log('Accessories Response:', response);
        return response;
      },
    }),
  }),
});

export const { 
  useGetProductsQuery, 
  useGetProshirtsQuery,
  useGetProaccQuery 
} = productApi;