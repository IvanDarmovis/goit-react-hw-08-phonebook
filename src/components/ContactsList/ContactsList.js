import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts, deleteContact } from '../../redux/api';
import s from './ContactsList.module.css';
import ContactListItem from './ContactsListItem/ContactsListItem';

function ContactList() {
  const filter = useSelector(state => state.filter);
  const data = useSelector(state => state.contacts.list);
  const isFetching = useSelector(state => state.user.isFetching);
  const [options, setOption] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContacts());
    if (!isFetching)
      setOption(
        data?.filter(el => el.name.toLowerCase().includes(filter)) ?? []
      );
  }, [data, dispatch, filter, isFetching]);

  if (options.length === 0)
    return <p className={s.emptyList}>No numbers to show</p>;
  return (
    <ul className={s.list}>
      {options?.map(({ id, name, phone }) => (
        <ContactListItem
          key={id}
          name={name}
          number={phone}
          onClick={() => dispatch(deleteContact(id))}
        />
      ))}
    </ul>
  );
}

export default ContactList;
