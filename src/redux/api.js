import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getContacts = createAsyncThunk(
  'contact/getAll',
  async (_, { getState }) => {
    try {
      const { data } = await axios.get(
        'https://connections-api.herokuapp.com/contacts',
        {
          headers: {
            authorization: `Bearer ${getState().root.user.token}`,
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
      await axios.post('https://connections-api.herokuapp.com/contacts', data, {
        headers: {
          Authorization: `Bearer ${getState().root.user.token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
);

const deleteContact = createAsyncThunk(
  'contact/delete',
  async (id, { getState }) => {
    try {
      await axios.delete(
        `https://connections-api.herokuapp.com/contacts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${getState().root.user.token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
);

const changeContact = createAsyncThunk(
  'contact/changeContact',
  async (data, { getState }) => {
    try {
      await axios.patch(
        `https://connections-api.herokuapp.com/contacts/${data.id}`,
        {
          name: data.name,
          number: data.number,
        },
        {
          headers: {
            Authorization: `Bearer ${getState().root.user.token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
);

const getCurrentUser = createAsyncThunk(
  'user/getCurrentUser',
  async (_, { getState }) => {
    try {
      const response = await axios.get(
        'https://connections-api.herokuapp.com/users/current',
        {
          headers: {
            Authorization: `Bearer ${getState().root.user.token}`,
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

const loginUser = createAsyncThunk('user/login', async data => {
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

const logoutUser = createAsyncThunk('user/logout', async (_, { getState }) => {
  try {
    await axios.post('https://connections-api.herokuapp.com/users/logout', {
      headers: {
        Authorization: `Bearer ${getState().root.user.token}`,
      },
    });
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
