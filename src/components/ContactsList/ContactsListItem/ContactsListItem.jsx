import React from 'react';
import PropTypes from 'prop-types';
import s from './ContactsListItem.module.css';

export default function ContactListItem({ id, name, number, onClick }) {
  return (
    <li className={s.listItem}>
      {name}: {number}
      <button className={s.deleteBtn} onClick={onClick} name={id} type="button">
        Delete
      </button>
    </li>
  );
}

ContactListItem.propType = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
