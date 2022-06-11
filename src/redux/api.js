import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './axiosQuery';

const contactsApi = createApi({
  reducerPath: 'contacts',
  tagTypes: ['Contacts'],
  baseQuery: axiosBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com',
  }),
  endpoints: builder => ({
    getContacts: builder.query({
      query: getState => ({
        url: '/contacts',
        method: 'GET',
        prepareHeaders: (headers, { getState }) => {
          const token = getState().user.token;
          if (token) {
            headers.set('Authorization', `Bearer ${token}`);
          }
          return headers;
        },
      }),
      invalidatesTags: ['Contacts'],
    }),
    addContact: builder.mutation({
      query: data => ({
        url: '/contacts',
        method: 'POST',
        data,
        prepareHeaders: (headers, { getState }) => {
          const token = getState().user.token;
          if (token) {
            headers.set('Authorization', `Bearer ${token}`);
          }
          return headers;
        },
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
    changeContact: builder.mutation({
      query: (id, body) => ({
        url: `/contacts/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Contacts'],
    }),
  }),
});

const userApi = createApi({
  reducerPath: 'user',
  tagTypes: ['User'],
  baseQuery: axiosBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com',
  }),
  endpoints: builder => ({
    currentUser: builder.query({
      query: () => ({
        url: '/users/current',
        method: 'GET',
      }),
      invalidatesTags: ['User'],
    }),
    userSignup: builder.mutation({
      query: data => ({
        url: '/users/signup',
        method: 'POST',
        data,
      }),
      providesTags: ['User'],
    }),
    userLogin: builder.mutation({
      query: data => ({
        url: '/users/login',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['User'],
    }),
    userLogout: builder.mutation({
      query: () => ({
        url: '/users/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useUserSignupMutation,
  useCurrentUserQuery,
  useUserLoginMutation,
  useUserLogoutMutation,
} = userApi;

export const {
  useGetContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
  useChangeContactMutation,
} = contactsApi;

export { contactsApi, userApi };

// export const contactsApi = createApi({
//   reducerPath: 'contactsApi',
//   tagTypes: ['Contacts'],
//   baseQuery: axiosBaseQuery({
//     baseUrl: 'https://629d9611c6ef9335c0a06ff9.mockapi.io',
//   }),
//   endpoints: builder => ({
//     getContacts: builder.query({
//       query: () => ({
//         url: '/contacts',
//         method: 'GET',
//       }),
//       providesTags: ['Contacts'],
//     }),

//     addContact: builder.mutation({
//       query: bodyData => ({
//         url: '/contacts',
//         method: 'POST',
//         data: bodyData,
//       }),
//       invalidatesTags: ['Contacts'],
//     }),

//     deleteContact: builder.mutation({
//       query: id => ({
//         url: `/contacts/${id}`,
//         method: 'DELETE',
//       }),
//       invalidatesTags: ['Contacts'],
//     }),
//   }),
// });

// export const {
//   useGetContactsQuery,
//   useAddContactMutation,
//   useDeleteContactMutation,
// } = contactsApi;
