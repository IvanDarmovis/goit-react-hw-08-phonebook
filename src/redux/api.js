import { createApi } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({ url: baseUrl + url, method, data, params });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const contactsApi = createApi({
  reducerPath: 'contacts',
  baseQuery: axiosBaseQuery({
    baseUrl: 'https://629d9611c6ef9335c0a06ff9.mockapi.io',
  }),
  endpoints: builder => ({
    getContacts: builder.query({
      query: () => ({
        url: '/contacts',
        method: 'GET',
      }),
    }),

    addContact: builder.query({
      query: body => ({
        url: `/contacts/:${body.name}`,
        method: 'POST',
        body,
      }),
    }),

    deleteContact: builder.query({
      query: name => ({
        url: `/contacts/:${name}`,
        method: 'POST',
      }),
    }),
  }),
});

export const { useGetContactsQuery, useAddContactQuery } = contactsApi;
