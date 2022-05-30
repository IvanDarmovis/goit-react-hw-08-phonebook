import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { contactDelete } from 'redux/actions';
import s from './ContactsList.module.css';
import ContactListItem from './ContactsListItem/ContactsListItem';

function ContactList() {
  const items = useSelector(state => state.default.contacts.items);
  const filter = useSelector(state => state.default.contacts.filter);
  const dispatch = useDispatch();

  const options = items.filter(el => el.name.toLowerCase().includes(filter));

  if (options.length === 0)
    return <p className={s.emptyList}>No numbers to show</p>;
  return (
    <ul className={s.list}>
      {options.map(({ id, name, number }) => (
        <ContactListItem
          key={id}
          name={name}
          number={number}
          onClick={() => dispatch(contactDelete(id))}
        />
      ))}
    </ul>
  );
}

export default ContactList;
