// import { createApi } from '@reduxjs/toolkit/query/react';
// import { axiosBaseQuery } from './axiosQuery';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// const token = {
//   set(token) {
//     axios.defaults.headers.common.Authorization = `Bearer ${token}`;
//   },
//   unset() {
//     axios.defaults.headers.common.Authorization = '';
//   },
// };

const getContacts = createAsyncThunk(
  'contact/getAll',
  async (_, { getState }) => {
    console.log(getState().user.token);
    try {
      const { data } = await axios.get(
        'https://connections-api.herokuapp.com/contacts',
        {
          headers: {
            token: getState().user.token,
          },
        }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const addContact = createAsyncThunk(
  'contact/add',
  async (data, { getState }) => {
    try {
      const response = axios.post(
        'https://connections-api.herokuapp.com/contacts',
        data,
        {
          headers: {
            token: getState().user.token,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const deleteContact = createAsyncThunk(
  'contact/delete',
  async (id, { getState }) => {
    try {
      const { data } = axios.delete(
        `https://connections-api.herokuapp.com/contacts/${id}`,
        {
          headers: {
            token: getState().user.token,
          },
        }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const changeContact = createAsyncThunk(
  'contact/changeContact',
  async (data, id, { getState }) => {
    try {
      const response = axios.patch(
        `https://connections-api.herokuapp.com/contacts/${id}`,
        data,
        {
          headers: {
            token: getState().user.token,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const getCurrentUser = createAsyncThunk(
  'user/getCurrentUser',
  async ({ getState }) => {
    try {
      const response = await axios.get(
        'https://connections-api.herokuapp.com/users/current',
        {
          headers: {
            token: getState().user.token,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const signupUser = createAsyncThunk('user/signup', async data => {
  try {
    const response = await axios.post(
      'https://connections-api.herokuapp.com/users/signup',

      data
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

const loginUser = createAsyncThunk('user/login', async (data, { getState }) => {
  try {
    const response = await axios.post(
      'https://connections-api.herokuapp.com/users/login',
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

const logoutUser = createAsyncThunk('user/logout', async ({ getState }) => {
  try {
    const response = await axios.post(
      'https://connections-api.herokuapp.com/users/logout',
      {
        headers: {
          token: getState().user.token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export {
  getContacts,
  addContact,
  deleteContact,
  changeContact,
  getCurrentUser,
  signupUser,
  loginUser,
  logoutUser,
};

// const contactsApi = createApi({
//   reducerPath: 'contacts',
//   tagTypes: ['Contacts'],
//   baseQuery: axiosBaseQuery({
//     baseUrl: 'https://connections-api.herokuapp.com',
//   }),
//   endpoints: builder => ({
//     getContacts: builder.query({
//       query: getState => ({
//         url: '/contacts',
//         method: 'GET',
//         prepareHeaders: (headers, { getState }) => {
//           const token = getState().user.token;
//           if (token) {
//             headers.set('Authorization', `Bearer ${token}`);
//           }
//           return headers;
//         },
//       }),
//       invalidatesTags: ['Contacts'],
//     }),
//     addContact: builder.mutation({
//       query: data => ({
//         url: '/contacts',
//         method: 'POST',
//         data,
//         prepareHeaders: (headers, { getState }) => {
//           const token = getState().user.token;
//           if (token) {
//             headers.set('Authorization', `Bearer ${token}`);
//           }
//           return headers;
//         },
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
//     changeContact: builder.mutation({
//       query: (id, body) => ({
//         url: `/contacts/${id}`,
//         method: 'PATCH',
//         body,
//       }),
//       invalidatesTags: ['Contacts'],
//     }),
//   }),
// });

// const userApi = createApi({
//   reducerPath: 'user',
//   tagTypes: ['User'],
//   baseQuery: axiosBaseQuery({
//     baseUrl: 'https://connections-api.herokuapp.com',
//   }),
//   endpoints: builder => ({
//     currentUser: builder.query({
//       query: () => ({
//         url: '/users/current',
//         method: 'GET',
//       }),
//       invalidatesTags: ['User'],
//     }),
//     userSignup: builder.mutation({
//       query: data => ({
//         url: '/users/signup',
//         method: 'POST',
//         data,
//       }),
//       providesTags: ['User'],
//     }),
//     userLogin: builder.mutation({
//       query: data => ({
//         url: '/users/login',
//         method: 'POST',
//         data,
//       }),
//       invalidatesTags: ['User'],
//     }),
//     userLogout: builder.mutation({
//       query: () => ({
//         url: '/users/logout',
//         method: 'POST',
//       }),
//       invalidatesTags: ['User'],
//     }),
//   }),
// });

// export const {
//   useUserSignupMutation,
//   useCurrentUserQuery,
//   useUserLoginMutation,
//   useUserLogoutMutation,
// } = userApi;

// export const {
//   useGetContactsQuery,
//   useAddContactMutation,
//   useDeleteContactMutation,
//   useChangeContactMutation,
// } = contactsApi;

// export { contactsApi, userApi };
