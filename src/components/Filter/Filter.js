import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filter } from 'redux/reducer';
import { TextField } from '@mui/material';

function Filter() {
  const value = useSelector(state => state.filter);
  const dispatch = useDispatch();

  return (
    <TextField
      placeholder="Find"
      onChange={ev => dispatch(filter(ev.target.value))}
      type="text"
      name="filter"
      value={value}
    />
  );
}

export default Filter;
