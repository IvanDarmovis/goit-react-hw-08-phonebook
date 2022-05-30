import React from 'react';
import PropTypes from 'prop-types';
import s from './ContactsList.module.css';
import ContactListItem from './ContactsListItem/ContactsListItem';

function ContactList({ options, onDeleteClick }) {
  if (options.length === 0)
    return <p className={s.emptyList}>No numbers to show</p>;
  return (
    <ul className={s.list}>
      {options.map(({ id, name, number }) => (
        <ContactListItem
          key={id}
          id={id}
          name={name}
          number={number}
          onClick={onDeleteClick}
        />
      ))}
    </ul>
  );
}

export default ContactList;

ContactList.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};
