import React from 'react';
import PropTypes from 'prop-types';
import s from './Filter.module.css';

function Filter({ onInput, filter }) {
  return (
    <label>
      Find contacts by name
      <input
        className={s.labelInput}
        onChange={onInput}
        type="text"
        name="filter"
        value={filter}
      />
    </label>
  );
}

export default Filter;

Filter.propTypes = {
  onInput: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};
