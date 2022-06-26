import React from 'react';
import PropTypes from 'prop-types';
import s from './ContactsListItem.module.css';

export default function ContactListItem({ name, number, onClick }) {
  return (
    <li className={s.listItem} onClick={onClick}>
      {name}: {number}
    </li>
  );
}

ContactListItem.propType = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
