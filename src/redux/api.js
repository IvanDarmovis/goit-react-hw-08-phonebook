import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './axiosQuery';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  tagTypes: ['Contacts'],
  baseQuery: axiosBaseQuery({
    baseUrl: 'https://629d9611c6ef9335c0a06ff9.mockapi.io',
  }),
  endpoints: builder => ({
    getContacts: builder.query({
      query: () => ({
        url: '/contacts',
        method: 'GET',
      }),
      providesTags: ['Contacts'],
    }),

    addContact: builder.mutation({
      query: bodyData => ({
        url: '/contacts',
        method: 'POST',
        data: bodyData,
      }),
      invalidatesTags: ['Contacts'],
    }),

    deleteContact: builder.mutation({
      query: id => ({
        url: `/contacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contacts'],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
} = contactsApi;
