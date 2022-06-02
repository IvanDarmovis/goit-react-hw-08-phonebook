import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filter } from 'redux/actions';
import s from './Filter.module.css';

function Filter() {
  const value = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();

  return (
    <label>
      Find contacts by name
      <input
        className={s.labelInput}
        onChange={ev => dispatch(filter(ev.target.value))}
        type="text"
        name="filter"
        value={value}
      />
    </label>
  );
}

export default Filter;
